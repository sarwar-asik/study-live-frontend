/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import AuthContext from "@/context/AuthProvider";

function Test() {
    const [peerId, setPeerId] = useState<string>("");
    const { user } = useContext(AuthContext);
    const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>("");
    //@ts-ignore
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
        <div className="h-screen bg-gray-100 relative">
            <h1 className="text-4xl mb-4">Current user id is </h1>
            <p className="my-2">{peerId}</p>
            <input
                type="text"
                value={remotePeerIdValue}
                onChange={(e) => setRemotePeerIdValue(e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4"
                placeholder="Enter remote peer ID"
            />
            <button
                onClick={() => call(remotePeerIdValue)}
                className="bg-blue-500 text-white p-2 rounded cursor-pointer border-none hover:bg-blue-700"
            >
                Call
            </button>
            <div className="relative border border-red-400 mt-4 ">
                <video
                    ref={remoteVideoRef}
                    className="w-full h-full  lg:w-[900px] lg:h-[500px] mx-auto border border-spacing-2 rounded "
                />
                <video
                    ref={currentUserVideoRef}
                    className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] absolute bottom-4 right-4 z-10 border border-gray-300 rounded shadow-lg"
                />
            </div>

            {incomingCall && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
                        <p className="mb-4">Incoming call...</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={answerCall}
                                className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-700"
                            >
                                Answer
                            </button>
                            <button
                                onClick={rejectCall}
                                className="bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-700"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Test;
