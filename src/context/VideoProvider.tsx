/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
// import Peer from "peerjs";
// import { v4 as uuidV4 } from "uuid";

// import { io } from "socket.io-client";
// import { useNavigate } from "react-router-dom";
// import { peersReducer } from "./pearsReducer";
// import { addPeerAction, removePeerAction } from "./pearsAction";
// import { SERVER_URL_ONLY } from "@/helper/const";
import AuthContext from "./AuthProvider";
import { ChatContext } from "./ChatContext";
import Peer from "peerjs";
// const WS = `${SERVER_URL_ONLY}?id=${localStorage.getItem("userId")}`;

export const RoomContext = createContext<null | any>(null);

// const ws = io(WS);

export const VideoProvider = ({ children }: { children: any }) => {
    // const navigate = useNavigate();
    const { io: ws } = useContext(ChatContext);
    const { user } = useContext(AuthContext)

    // const [me, setMe] = useState<Peer>();
    // const [peers, dispatch] = useReducer(peersReducer, {});
    // const [stream, setStream] = useState<MediaStream>();

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // // const enterRoom = ({ roomId }: { roomId: "string" }) => {
    // //     // navigate(`/room/${roomId}`);
    // //     console.log(roomId);
    // // };

    // const handleUserList = ({ participants }: { participants: string[] }) => {

    //     stream && participants?.map((peerId) => {
    //         const call = stream && me?.call(peerId, stream);
    //         console.log(stream, "steam");
    //         console.log("call", call);
    //         call?.on("stream", (userVideoStream: MediaStream) => {
    //             console.log({ addPeerAction });
    //             dispatch(addPeerAction(peerId, userVideoStream));
    //         });
    //     });
    // };

    // const removePeer = (peerId: string) => {
    //     dispatch(removePeerAction(peerId));
    // };

    // useEffect(() => {
    //     // const meId = uuidV4();
    //     const peer = new Peer(user.id);
    //     setMe(peer);
    //     // try {
    //     //     navigator.mediaDevices
    //     //         .getUserMedia({ video: true, audio: true })
    //     //         .then((stream) => {
    //     //             setStream(stream);
    //     //         });
    //     // } catch (err) {
    //     //     console.error({ err });
    //     // }
    //     // ws.on("room-created", enterRoom);
    //     ws.on("get-users", handleUserList);
    //     ws.on("user-disconnected", removePeer);
    // }, [ws]);

    // useEffect(() => {
    //     if (!stream) return;
    //     if (!me) return;

    //     ws.on(
    //         "user-joined",
    //         ({ peerId }: { roomId: string; peerId: string }) => {
    //             console.log(peerId,'user joinded')
    //             const call = stream && me.call(peerId, stream);
    //             call.on("stream", (userVideoStream: MediaStream) => {
    //                 dispatch(addPeerAction(peerId, userVideoStream));
    //             });
    //         }
    //     );

    //     me.on("call", (call) => {
    //         call.answer(stream);
    //         call.on("stream", (userVideoStream) => {
    //             dispatch(addPeerAction(call.peer, userVideoStream));
    //         });
    //     });
    // }, [stream, me, ws,]);
    const [peerId, setPeerId] = useState<string>("");
    const [incomingCall, setIncomingCall] = useState<Peer.MediaConnection | null>(
        null
    );
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const currentUserVideoRef = useRef<HTMLVideoElement | null>(null);
    const peerInstance = useRef<Peer | null>(null);

    useEffect(() => {
        if (!user?.id) return; // Ensure user ID is available before initializing Peer instance

        console.log("Initializing Peer instance with user ID...");
        const peer = new Peer(user.id); // Initialize Peer with user ID
        peer.on("open", (id) => {
            console.log("Peer connection established with ID:", id);
            setPeerId(id);
        });

        peer.on("call", (call) => {
            console.log("Incoming call received:", call);
            setIncomingCall(call);
        });

        peer.on("error", (err) => {
            console.error("Peer error:", err);
        });

        peerInstance.current = peer;

        return () => {
            if (peerInstance.current) {
                peerInstance.current.destroy();
            }
        };
    }, [user?.id]);

    const answerCall = () => {
        if (incomingCall) {
            console.log("Answering call...");
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((mediaStream) => {
                    console.log("User media obtained:", mediaStream);
                    if (currentUserVideoRef.current) {
                        currentUserVideoRef.current.srcObject = mediaStream;
                        currentUserVideoRef.current.play();
                    }
                    incomingCall.answer(mediaStream);
                    incomingCall.on("stream", (remoteStream: MediaStream | null) => {
                        console.log("Remote stream received:", remoteStream);
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = remoteStream;
                            remoteVideoRef.current.play();
                        }
                    });
                    setIncomingCall(null); // Reset the incoming call state after answering
                })
                .catch((error) => {
                    console.error("Error accessing media devices:", error);
                });
        } else {
            console.log("No incoming call to answer.");
        }
    };

    const rejectCall = () => {
        if (incomingCall) {
            console.log("Rejecting call...");
            incomingCall.close(); // Close the connection
            setIncomingCall(null); // Reset the incoming call state
        } else {
            console.log("No incoming call to reject.");
        }
    };

    const call = (remotePeerId: string) => {
        console.log("Placing call to remote peer ID:", remotePeerId);
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((mediaStream) => {
                console.log("User media obtained for outgoing call:", mediaStream);
                if (currentUserVideoRef.current) {
                    currentUserVideoRef.current.srcObject = mediaStream;
                    currentUserVideoRef.current.play();
                }
                const call = peerInstance.current?.call(remotePeerId, mediaStream);
                if (call) {
                    console.log("Call initiated successfully:", call);
                    call.on("stream", (remoteStream) => {
                        console.log(
                            "Remote stream received during outgoing call:",
                            remoteStream
                        );
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = remoteStream;
                            remoteVideoRef.current.play();
                        }
                    });
                } else {
                    console.log("Failed to initiate call.");
                }
            })
            .catch((error) => {
                console.error("Error accessing media devices:", error);
            });
    };

    return (
        <RoomContext.Provider value={{ ws, call, rejectCall, answerCall, currentUserVideoRef, peerId, user, remoteVideoRef ,incomingCall}}>
            {children}
        </RoomContext.Provider>
    );
};
