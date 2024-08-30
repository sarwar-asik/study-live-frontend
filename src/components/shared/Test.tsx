
import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
export default function Test() {
    const [peerId, setPeerId] = useState<string>("");
    const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>("");
    const [incomingCall, setIncomingCall] = useState<Peer.MediaConnection | null>(
        null
    );
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const currentUserVideoRef = useRef<HTMLVideoElement | null>(null);
    const peerInstance = useRef<Peer | null>(null);

    useEffect(() => {
        const peer = new Peer();
        peer.on("open", (id) => {
            setPeerId(id);
        });

        peer.on("call", (call) => {
            setIncomingCall(call); // Set the incoming call
        });

        peerInstance.current = peer;
    }, []);

    const answerCall = () => {
        if (incomingCall) {
            navigator.mediaDevices
                .getUserMedia({ video: false, audio: true })
                .then((mediaStream) => {
                    if (currentUserVideoRef.current) {
                        currentUserVideoRef.current.srcObject = mediaStream;
                        currentUserVideoRef.current.play();
                    }
                    incomingCall.answer(mediaStream);
                    incomingCall.on("stream", (remoteStream: MediaProvider | null) => {
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = remoteStream;
                            remoteVideoRef.current.play();
                        }
                    });
                    setIncomingCall(null); // Reset the incoming call state after answering--> this call
                })
                .catch((error) => {
                    console.error("Error accessing media devices.", error);
                });
        }
    };

    const rejectCall = () => {
        if (incomingCall) {
            incomingCall.close(); // when reject call then close the connection --> this connection
            setIncomingCall(null);
        }
    };

    const call = (remotePeerId: string) => {
        navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then((mediaStream) => {
                if (currentUserVideoRef.current) {
                    currentUserVideoRef.current.srcObject = mediaStream;
                    currentUserVideoRef.current.play();
                }
                const call = peerInstance.current?.call(remotePeerId, mediaStream);
                call?.on("stream", (remoteStream) => {
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = remoteStream;
                        remoteVideoRef.current.play();
                    }
                });
            })
            .catch((error) => {
                console.error("Error accessing media devices.", error);
            });
    };

    return (
        <div className="container">
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
                <h1 className="text-4xl mb-4">Current user id is {peerId}</h1>
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
                <div className="relative w-full h-full mt-4">
                    <video
                        ref={remoteVideoRef}
                        className="w-[900px] h-[500px] mx-auto border border-gray-300 rounded"
                    />
                    <video
                        ref={currentUserVideoRef}
                        className="w-[150px] h-[150px] absolute bottom-4 right-4 z-10 border border-gray-300 rounded shadow-lg"
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
        </div>
    );
}
