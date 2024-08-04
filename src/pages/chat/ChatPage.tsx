/* eslint-disable @typescript-eslint/no-explicit-any */
import SidebarDash from '@/components/dashboard/SidebarDash';
import AuthContext from '@/context/AuthProvider';
import { SERVER_URL } from '@/helper/const';
import useFetchDataHook from '@/hooks/useFetchDataHook';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, Fa } from 'react-icons/fa';
import { IoCallOutline } from "react-icons/io5";
// import { IMessageDataType } from '@/type/dataType/message.data';
import { IUserDataType } from '@/type/dataType/user.data';
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import LoaderData from '../shared/LoaderData';
import { ChatContext } from '@/context/ChatContext';
import { IMessageDataType } from '@/type/dataType/message.data';
import { RoomContext } from '@/context/RoomProvider';
import toast from 'react-hot-toast';
import ModalCommon from '@/components/UI/ModalCommon';
import ChatSection from '@/components/dashboard/chat/ChatMainSection';
import ChatHeaderSection from '@/components/dashboard/chat/ChatHeaderSection';
// import { Link } from 'react-router-dom';

export default function ChatPage() {



    const { user } = useContext(AuthContext)
    const { io, newMessage, userAllData } = useContext(ChatContext)
    const { localStream, startCall, getMedia, localVideoRef, remoteVideoRef, endCall, incomingCall, answerCall, setIncomingCall, remoteStream } = useContext(RoomContext);



    const { id } = useParams()
    // console.log("🚀 ~ id:", id)

    const receiverId = id === '1' ? userAllData[0]?.id : id
    // console.log(user)
    // console.log(receiverId)

    // console.log(`${SERVER_URL}/user/${id}`)

    const { data: userData, } = useFetchDataHook<{ data: IUserDataType }>(`${SERVER_URL}/user/${receiverId}`)

    // console.log(userData)
    // const { data, loading, refetch } = useFetchDataHook<{ data: IMessageDataType[] }>(`${SERVER_URL}/message/user?senderId=${user.id}&receiverId=${id}`)





    //!  video /audio
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    // const [incomingCalling, setIncomingCall] = useState<{ offer: any; from: string; senderName?: string } | null>(null);

    const senderId = user?.id
    // const receiverId = receiverId
    const toggleAudio = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
        }
        setIsAudioOn(!isAudioOn);
    };

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
        }
        setIsVideoOn(!isVideoOn);
    };
    const handleStartCall = () => {
        getMedia().then(() => {
            startCall(receiverId, user.name);
        });
    };

    const handleEndCall = () => {
        endCall(receiverId);
    };
    const handleAnswerCall = async () => {
        console.log('yes handle call')
        // toast("answering")
        getMedia().then(async () => {
            await answerCall()
        });

    }


    // const chatData = [...data.data]


    // console.log(senderId, receiverId);

    // console.log(localVideoRef)
    // console.log(userAllData.data[0].id)

    return (
        <div className="flex-1">
            {/* Chat Header */}
            <ChatHeaderSection user={userData?.data} handleStartCall={handleStartCall} />

            {incomingCall && (
                // <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                //     <div className="bg-white p-7 rounded-lg shadow-lg">
                //         <p>Incoming call from{incomingCall.senderName}</p>
                //         <button
                //             onClick={handleAnswerCall}
                //             className="p-2 bg-green-600 px-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white my-5 z-50"
                //         >
                //             Answer Call
                //         </button>
                //     </div>
                // </div>

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
                                        className="p-2 bg-green-600 px-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white my-5 z-50"
                                    >
                                        Answer Call
                                    </button>

                                    <button onClick={() => setIncomingCall(null)} className='h-9 px-3 rounded-full p-2 bg-red-600'>Reject  </button>

                                </div>
                            </section>

                        </div>
                    </div>
                </div >
            )}



            <ChatSection newMessage={newMessage} io={io} receiverId={receiverId} user={user} />
        </div>
    )
}
