/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomContext } from "@/context/VideoProvider";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import {  Outlet } from "react-router-dom";
import AuthContext from "@/context/AuthProvider";



export default function MainLayout() {
    const { ws } = useContext(RoomContext);
    const { user } = useContext(AuthContext)

    const [incomingCall, setIncomingCall] = useState<{ type: "video" | "audio", senderName: string, roomId?: string } | null>(null)
    // const navigate = useNavigate();

    // console.log('user // data', user)
    useEffect(() => {
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
                    setIncomingCall({ type: "video", senderName: data?.senderName })
                    // window.location.href = `/video/${data.roomId}`
                }
            }, 1000)

        });
    }, [ws])

    const handleAnswerCall = () => {
        if (incomingCall?.type === 'video') {
            window.location.href = `/video/${incomingCall?.roomId}`
        }
    }
    return (
        <React.Fragment>

            <Navbar />
            <div className="min-h-screen bg-secondary">


                <Outlet />
                {incomingCall && (
                    <div className="mx-auto w-fit">
                        <div className={`fixed z-[100] ${incomingCall ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
                            <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-w-xl rounded-lg  drop-shadow-lg dark:bg-zinc-900 dark:text-white ${incomingCall ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'} rounded border border-[#7808B1] max-w-6xl mx-auto bg-[#393B4C] text-white `}>
                                <div className='flex  justify-between py-9 px-7 text-xl'>
                                    {/* <h1>Request For {type} Call</h1> */}
                                    <h2>Incoming call from {incomingCall?.senderName}</h2>

                                    {/* <button onClick={() => setIncomingCall(null)} className='rounded-full py-[2px] text-sm px-1 border border-red-500 '>&#x274c;</button> */}
                                </div>
                                <section className=''>
                                    <div className="bg-white p-7 flex justify-between items-center  rounded-lg shadow-lg">

                                        <button
                                            onClick={handleAnswerCall}
                                            // onClick={async () => await answerCall()}
                                            className="p-2 bg-green-600 px-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white my-5 z-50"
                                        >
                                            Answer Call
                                        </button>

                                        {/* <button onClick={() => setIncomingCall(null)} className='h-9 px-3 rounded-full p-2 bg-red-600'>Reject  </button> */}

                                    </div>
                                </section>

                            </div>
                        </div>
                    </div >
                )}
            </div>

            <Footer />
        </React.Fragment>
    )
}
