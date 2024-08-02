/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import generateUUID from "@/helper/generateUUID";
import { createContext, useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import AuthContext from "./AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addUserPeer, removeUserPeer } from "@/redux/features/video/videoSlice";

export const RoomContext = createContext<null | any>(null);
const ws = socketIOClient('http://localhost:5001');

export const RoomProvider = ({ children }: { children: any }) => {
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const peers = useSelector((state: RootState) => state.video);

    // Room state
    const [roomId, setRoomId] = useState("");
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [localPeer, setLocalPeer] = useState<RTCPeerConnection | null>(null);

    // Create a new RTCPeerConnection
    const createPeerConnection = () => {
        const peer = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });

        console.log(peer)

        peer.onicecandidate = (event) => {
            console.log(event)
            if (event.candidate) {
                ws.emit("candidate", { candidate: event.candidate, userId: user?.id, roomId });
            }
        };

        peer.ontrack = (event) => {
            console.log(event)
            const stream = event.streams[0];
            if (stream) {
                console.log({ userId: peer.remoteDescription?.type || '', stream })
                dispatch(addUserPeer({ userId: peer.remoteDescription?.type || '', stream }));
            }
        };

        return peer;
    };

    // Join room
    const enterRoom = () => {
        ws.emit("create-room");
    };

    // Handle incoming list of participants
    const getUsers = ({ participants }: { participants: string[] }) => {
        console.log(participants, 'participants');
    };

    useEffect(() => {
        ws.on("room-created", (room) => {
            setRoomId(room?.roomId ?? generateUUID());
            console.log(room)
            ws.emit("join-room", { roomId: room.roomId, userId: user?.id, name: user?.name });
        });
        ws.on("get-users", getUsers);

        console.log(localPeer)
        ws.on("offer", async ({ offer, userId }: { offer: RTCSessionDescriptionInit; userId: string }) => {
            console.log(offer, 'offer')

            if (!localPeer) return;

            try {
                await localPeer.setRemoteDescription(new RTCSessionDescription(offer));
                const answer = await localPeer.createAnswer();
                await localPeer.setLocalDescription(answer);
                ws.emit("answer", { answer, userId, roomId });
            } catch (error) {
                console.error("Error handling offer:", error);
            }
        });

        ws.on("answer", async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
            if (!localPeer) return;
            console.log(answer, 'answer')
            try {
                await localPeer.setRemoteDescription(new RTCSessionDescription(answer));
            } catch (error) {
                console.error("Error setting remote description:", error);
            }
        });

        ws.on("candidate", async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
            if (localPeer) {
                try {
                    await localPeer.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (error) {
                    console.error("Error adding ICE candidate:", error);
                }
            }
        });

        ws.on('user-joined', async ({ userId }: { userId: string }) => {

            console.log(userId)
            const peer = createPeerConnection();
            console.log(peer)
            setLocalPeer(peer);

            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(localStream);

            localStream.getTracks().forEach(track => peer.addTrack(track, localStream));

            try {
                const offer = await peer.createOffer();
                console.log("🚀 ~ file: RoomProvider.tsx:115 ~ ws.on ~ offer:", offer)
                await peer.setLocalDescription(offer);
                ws.emit("offer", { offer, userId, roomId });
            } catch (error) {
                console.error('Error creating offer:', error);
            }
        });

        ws.on('user-disconnected', (userId: string) => {
            dispatch(removeUserPeer({ userId }));
        });

        return () => {
            ws.off("room-created");
            ws.off("get-users");
            ws.off("offer");
            ws.off("answer");
            ws.off("candidate");
            ws.off('user-joined');
            ws.off('user-disconnected');
            localPeer?.close();
        };
    }, [user?.id, roomId, localPeer]);

    console.log(stream)
    console.log(peers, 'peers');

    return (
        <RoomContext.Provider value={{ ws, enterRoom, roomId, stream, peers }}>
            {children}
        </RoomContext.Provider>
    );
};
