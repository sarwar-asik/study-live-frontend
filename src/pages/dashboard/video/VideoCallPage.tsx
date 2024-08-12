/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideoPlayer } from "./VideoPlayer";
import { RoomContext } from "@/context/VideoProvider";
import VideoInputSection from "@/components/dashboard/videoCall/VideoInputSection";
import usePointDeduction from "@/hooks/usePointsDeduction";
import AuthContext from "@/context/AuthProvider";



export const VideoCallPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext)
    const { ws, me, peers, stream, setStream } = useContext(RoomContext);

    const navigate = useNavigate()

    usePointDeduction(user.id, 5)
    useEffect(() => {
        try {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setStream(stream);
                });
        } catch (err) {
            console.error({ err });
        }

        me?.on("open", () => {
            ws.emit("join-room", { roomId: id, peerId: me._id });
        });
        // Cleanup function to stop tracks and clear the stream when the component unmounts
        return () => {
            if (stream) {
                stream.getTracks().forEach((track: any) => track.stop());
            }
            setStream(null);
        };
    }, [id, me, setStream, ws]);

    const handleEndCall = () => {
        if (stream) {
            stream.getTracks().forEach((track: any) => track.stop());
        }
        setStream(null);
        navigate(-1);
    };


    return (
        <div>

            <VideoInputSection handleEndCall={handleEndCall} key={"me"} stream={stream} />
            <div className="grid grid-cols-4 gap-4">


                {Object?.values(peers)?.map((peer: any, index: number) => (
                    <VideoPlayer key={index} stream={peer.stream} />
                ))}
            </div>
        </div>
    );
};
