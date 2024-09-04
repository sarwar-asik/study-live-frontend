/* eslint-disable @typescript-eslint/no-explicit-any */
// CallHandler.tsx
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomContext } from "@/context/VideoProvider";
import AuthContext from "@/context/AuthProvider";
import { AudioContext } from "@/context/AudioProvider";
import Test from './Test';

export default function MainCallHandler() {
    const { ws, user, incomingCall, rejectCall, answerCall, } = useContext(RoomContext);
    // const { user } = useContext(AuthContext);
    const { setIncomingAudioCall, answerCall: answerAudioCall, } = useContext(AudioContext);

    const [incomingCalling, setIncomingCalling] = useState<{ type: "video" | "audio", senderName: string, roomId?: string; senderId?: string } | null>(null);

    const navigate = useNavigate();

    console.log(user?.id)

    // useEffect hook to handle incoming events from the WebSocket
    useEffect(() => {

        ws.on("room-created", (data: { roomId: any; }) => {
            console.log(data, 'room-created');
            window.location.href = `/video/${data.roomId}`
        });

        // after a delay if the user is the receiver
        ws.on("room-created-b", (data: { roomId: string; receiverId: string, senderName: string }) => {
            console.log(data, 'room-created-b');

            setTimeout(() => {
                if (user?.id === data?.receiverId) {
                    setIncomingCalling({ type: "video", senderName: data?.senderName, roomId: data?.roomId, senderId: data?.receiverId });
                }
            }, 1000)

        });


        // Listen for the "incoming-call" event and update the incoming call data
        ws.on('incoming-call', (data: { senderId: string, receiverId: string, senderName: string, from: string }) => {
            setIncomingAudioCall(data);
            setIncomingCalling({ type: "audio", senderName: data?.senderName, roomId: data?.receiverId, senderId: data?.from });
        });
        // Cleanup function to remove the event listeners when the component unmounts
    }, [ws, user]);

    // Function to handle answering the incoming audio call

    const handleAnswerCall = () => {
        console.log(incomingCalling)
        if (incomingCalling?.type === 'video') {
            // If the call is a video call, navigate to the corresponding video call page
            if (incomingCalling?.roomId) {

                window.location.href = `/video/${incomingCalling?.roomId}`;
            }
        } else {
            // If the call is an audio call, navigate to the corresponding audio call page and answer the call
            navigate(`/audio/${incomingCalling?.senderId}`);
            answerAudioCall();
            setIncomingCalling(null);
        }
    };

    // Function to handle rejecting the incoming call
    const handleRejectCall = () => {
        setIncomingCalling(null);
    };

    console.log(incomingCalling)
    const [isStartCall, setIsStartCall] = useState(false)
    const handleAnswer2 =()=>{
         setIsStartCall(true)

        answerCall()
    }
    // Render the incoming call modal if there is an incoming call
    return (
        <React.Fragment>
            {incomingCall && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
                        <p className="mb-4">Incoming call...</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAnswer2}
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

            {
                isStartCall && <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
                        <p className="mb-4">started call...</p>
                        <div className="flex space-x-4">
                            <Test/>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}
