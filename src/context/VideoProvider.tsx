/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import CircularJSON from 'circular-json';
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


    const [peerId, setPeerId] = useState<string>("");
    const [incomingCall, setIncomingCall] = useState<any | null>(
        null
    );
    const [incomingCallData, setIncomingCallData] = useState<{ email: string, callType: "video" | "audio" } | null>(
        null
    );
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [isStartCall, setIsStartCall] = useState(false)
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

            setIncomingCall(call);
            console.log("Incoming call received:", call);
            console.log(typeof call, 'c type');
            // console.log(JSON.stringify(call),'incomingCall.metadata');
            const parsedCall = JSON.parse(CircularJSON.stringify(call));
            const metadata = parsedCall?.metadata || parsedCall?.options?._payload?.metadata || parsedCall?.options?.metadata

            if (metadata) {
                console.log(metadata)
                setIncomingCallData(parsedCall?.options?._payload?.metadata)
                console.log(parsedCall?.options?._payload?.metadata, 'parsedCall?.options?._payload?.metadata;')
                // Access the callType and email from metadata
                // const callType = metadata.callType;
                // const email = metadata.email;

                // console.log("Call Type:", callType);
                // console.log("Email:", email);
            } else {
                console.log("Metadata not found");
            }


        });

        peer.on("error", (err) => {
            console.error("Peer error:>>>", err);
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
                .getUserMedia({ video: incomingCallData?.callType === "audio" ? false : true, audio: true })
                .then((mediaStream) => {
                    console.log("User media obtained:", mediaStream);
                    setLocalStream(mediaStream)
                    if (currentUserVideoRef.current) {
                        currentUserVideoRef.current.srcObject = mediaStream;
                        currentUserVideoRef.current.play();
                    }
                    incomingCall.answer(mediaStream);
                    incomingCall.on("stream", (remoteStream: MediaStream | null) => {
                        console.log("Remote stream received:", remoteStream);
                        setRemoteStream(remoteStream);
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

    const callFunc = (remotePeerId: string, callType: "video" | "audio") => {

        console.log("Placing call to remote peer ID:", remotePeerId);
        navigator.mediaDevices
            .getUserMedia({ video: callType === "audio" ? false : true, audio: true })
            .then((mediaStream) => {
                console.log("User media obtained for outgoing call:", mediaStream);
                setLocalStream(mediaStream)
                if (currentUserVideoRef.current) {
                    currentUserVideoRef.current.srcObject = mediaStream;
                    currentUserVideoRef.current.play();
                }
                setIncomingCallData({
                    email: user.email,
                    callType: callType
                })
                const call = peerInstance.current?.call(remotePeerId, mediaStream, {
                    metadata: {
                        email: user.email,    // Send user's email
                        callType: callType    // Send the call type (video/audio)
                    }
                });
                if (call) {
                    console.log("Call initiated successfully:", call);
                    call.on("stream", (remoteStream) => {
                        console.log(
                            "Remote stream received during outgoing call:",
                            remoteStream
                        );
                        setRemoteStream(remoteStream);
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
        <RoomContext.Provider value={{ ws, callFunc, rejectCall, answerCall, currentUserVideoRef, peerId, user, remoteVideoRef, incomingCall, localStream, remoteStream, setLocalStream, setRemoteStream, isStartCall, setIsStartCall, incomingCallData }}>
            {children}
        </RoomContext.Provider>
    );
};
