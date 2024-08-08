/* eslint-disable @typescript-eslint/no-explicit-any */
// CallHandler.tsx
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomContext } from "@/context/VideoProvider";
import AuthContext from "@/context/AuthProvider";
import { AudioContext } from "@/context/AudioProvider";
// import IncomingCallModal from './IncomingCallModal';


export default function MainCallHandler() {
    const { ws } = useContext(RoomContext);
    const { user } = useContext(AuthContext);
    const { setIncomingAudioCall, answerCall } = useContext(AudioContext);
    const [incomingCalling, setIncomingCalling] = useState<{ type: "video" | "audio", senderName: string, roomId?: string; senderId?: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // ws.on("room-created-b", (data: { roomId: string; receiverId: string, senderName: string }) => {
        //     if (user?.id === data?.receiverId) {
        //         setIncomingCalling({ type: "video", senderName: data?.senderName, roomId: data.roomId });
        //     }
        // });
        ws.on("room-created", (data: { roomId: any; }) => {
            console.log(data, 'room-created');
            // navigate(`/video/${data.roomId}`)
            window.location.href = `/video/${data.roomId}`
        });
        ws.on("room-created-b", (data: { roomId: string; receiverId: string, senderName: string }) => {
            // console.log(data);
            console.log(data, 'room-created-b');

            setTimeout(() => {
                // navigate(`/video/${data.roomId}`)
                if (user?.id === data?.receiverId) {
                    setIncomingCalling({ type: "video", senderName: data?.senderName })
                    // window.location.href = `/video/${data.roomId}`
                }
            }, 1000)

        });
        

        ws.on('incoming-call', (data: { senderId: string, receiverId: string, senderName: string, from: string }) => {
            setIncomingAudioCall(data);
            setIncomingCalling({ type: "audio", senderName: data?.senderName, roomId: data?.receiverId, senderId: data?.from });
        });
    }, [ws, user, setIncomingAudioCall]);

    const handleAnswerCall = () => {
        if (incomingCalling?.type === 'video') {
            window.location.href = `/video/${incomingCalling?.roomId}`;
        } else {
            navigate(`/audio/${incomingCalling?.senderId}`);
            answerCall();
            setIncomingCalling(null);
        }
    };

    const handleRejectCall = () => {
        setIncomingCalling(null);
    };

    return (
        <React.Fragment>
            {incomingCalling && (
                <div className="fixed z-[100] inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent">
                    <div className="absolute rounded-lg drop-shadow-lg dark:bg-zinc-900 dark:text-white rounded border border-[#7808B1] max-w-4xl mx-auto bg-[#393B4C] text-white">
                        <div className='flex justify-between py-9 px-7 text-xl'>
                            <h2>Incoming {incomingCalling?.type} call from {incomingCalling?.senderName}</h2>
                        </div>
                        <section>
                            <div className="bg-white p-7 flex justify-between items-center rounded-lg shadow-lg">
                                <button
                                    onClick={handleAnswerCall}
                                    className="p-2 bg-green-600 px-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white my-5 z-50"
                                >
                                    Answer Call
                                </button>
                                <button onClick={handleRejectCall} className='h-9 px-3 rounded-full p-2 bg-red-600'>Reject</button>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}
