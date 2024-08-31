/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoPlayer } from "./VideoPlayer";
import { RoomContext } from "@/context/VideoProvider";
import VideoInputSection from "@/components/dashboard/videoCall/VideoInputSection";
import usePointDeduction from "@/hooks/usePointsDeduction";
import AuthContext from "@/context/AuthProvider";
import { addPeerAction, removePeerAction } from "@/context/pearsAction";
import { peersReducer } from "@/context/pearsReducer";
import Peer from "peerjs";

export const VideoCallPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { ws } = useContext(RoomContext);
    const [me, setMe] = useState<Peer>();
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [stream, setStream] = useState<MediaStream | null>(null);
    const navigate = useNavigate();

    usePointDeduction(user.id, 5);
    console.log(user)

    // Initialize the PeerJS connection
    useEffect(() => {
        const peer = new Peer(user?.id);
        setMe(peer);

        peer.on("open", () => {
            ws.emit("join-room", { roomId: id, peerId: peer.id });
        });

        return () => {
            peer.disconnect();
            peer.destroy();
        };
    }, [id, user.id, ws]);

    // Get user media (video and audio)
    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(stream);
            } catch (err) {
                console.error("Error getting user media:", err);
            }
        };

        getUserMedia();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Handle peer connections
    useEffect(() => {
        if (!me || !stream) return;

        // Handle incoming calls
        me.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (userVideoStream: MediaStream) => {
                dispatch(addPeerAction(call.peer, userVideoStream));
            });

            call.on("close", () => {
                removePeer(call.peer);
            });
        });

        ws.on("user-joined", ({ peerId }: { roomId: string; peerId: string }) => {
            const call = me.call(peerId, stream);
            call.on("stream", (userVideoStream: MediaStream) => {
                dispatch(addPeerAction(peerId, userVideoStream));
            });

            call.on("close", () => {
                removePeer(call.peer);
            });
        });

        ws.on("get-users", handleUserList);
        ws.on("user-disconnected", removePeer);

        return () => {
            ws.off("user-joined");
            ws.off("get-users");
            ws.off("user-disconnected");
        };
    }, [me, stream, ws]);

    const handleUserList = ({ participants }: { participants: string[] }) => {
        console.log(participants,'participants')
        participants?.forEach((peerId) => {
            const call = me?.call(peerId, stream!);
            call?.on("stream", (userVideoStream: MediaStream) => {
                dispatch(addPeerAction(peerId, userVideoStream));
            });
        });
    };

    const removePeer = (peerId: string) => {
        dispatch(removePeerAction(peerId));
    };

    const handleEndCall = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setStream(null);
        navigate(-1);
    };

    console.log(peers,'peers')
    return (
        <div>
            <VideoInputSection handleEndCall={handleEndCall} key={"me"} stream={stream} />
            <div className="grid grid-cols-4 gap-4 bg-red-400 min-h-[20rem]">
                {Object.values(peers).map((peer: any, index: number) => (
                    <VideoPlayer key={index} stream={peer.stream} />
                ))}
            </div>
        </div>
    );
};
