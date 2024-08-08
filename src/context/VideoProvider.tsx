/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import Peer from "peerjs";
// import { v4 as uuidV4 } from "uuid";

// import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";
import { peersReducer } from "./pearsReducer";
import { addPeerAction, removePeerAction } from "./pearsAction";
// import { SERVER_URL_ONLY } from "@/helper/const";
import AuthContext from "./AuthProvider";
import { ChatContext } from "./ChatContext";
// const WS = `${SERVER_URL_ONLY}?id=${localStorage.getItem("userId")}`;

export const RoomContext = createContext<null | any>(null);

// const ws = io(WS);

export const VideoProvider = ({ children }: { children: any }) => {
    // const navigate = useNavigate();
    const { io:ws } = useContext(ChatContext);
    const { user } = useContext(AuthContext)

    const [me, setMe] = useState<Peer>();
    const [peers, dispatch] = useReducer(peersReducer, {});
    const [stream, setStream] = useState<MediaStream>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        // const meId = uuidV4();
        const peer = new Peer(user.id);
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
