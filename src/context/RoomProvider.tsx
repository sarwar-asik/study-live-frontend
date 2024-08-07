import { createContext, useEffect, useReducer, useState } from "react";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";
import { peersReducer } from "./pearsReducer";
import { addPeerAction, removePeerAction } from "./pearsAction";

const WS = `http://localhost:5001?id=${localStorage.getItem("userId")}`;

export const RoomContext = createContext<null | any>(null);

const ws = io(WS);

export const RoomProvider: React.FunctionComponent = ({ children }) => {
    // const navigate = useNavigate();

    const [me, setMe] = useState<Peer>();
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [stream, setStream] = useState<MediaStream>();

    const enterRoom = ({ roomId }: { roomId: "string" }) => {
        // navigate(`/room/${roomId}`);
        console.log(roomId);
    };

    const handleUserList = ({ participants }: { participants: string[] }) => {

        stream && participants?.map((peerId) => {
            const call = stream && me?.call(peerId, stream);
            console.log(stream, "steam");
            console.log("call", call);
            call?.on("stream", (userVideoStream: MediaStream) => {
                console.log({ addPeerAction });
                dispatch(addPeerAction(peerId, userVideoStream));
            });
        });
    };

    const removePeer = (peerId: string) => {
        dispatch(removePeerAction(peerId));
    };

    useEffect(() => {
        const meId = uuidV4();
        const peer = new Peer(meId);
        setMe(peer);
        // try {
        //     navigator.mediaDevices
        //         .getUserMedia({ video: true, audio: true })
        //         .then((stream) => {
        //             setStream(stream);
        //         });
        // } catch (err) {
        //     console.error({ err });
        // }
        // ws.on("room-created", enterRoom);
        ws.on("get-users", handleUserList);
        ws.on("user-disconnected", removePeer);
    }, [ws]);

    useEffect(() => {
        if (!stream) return;
        if (!me) return;

        ws.on(
            "user-joined",
            ({ peerId }: { roomId: string; peerId: string }) => {
                const call = stream && me.call(peerId, stream); 
                call.on("stream", (userVideoStream: MediaStream) => {
                    dispatch(addPeerAction(peerId, userVideoStream));
                });
            }
        );

        me.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
                dispatch(addPeerAction(call.peer, userVideoStream));
            });
        });
    }, [stream, me, ws,]);

    return (
        <RoomContext.Provider value={{ ws, me, peers, stream, setStream }}>
            {children}
        </RoomContext.Provider>
    );
};
