/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthContext from '@/context/AuthProvider';
import { SERVER_URL } from '@/helper/const';
import useFetchDataHook from '@/hooks/useFetchDataHook';
import { IUserDataType } from '@/type/dataType/user.data';
import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ChatContext } from '@/context/ChatContext';
import ChatSection from '@/components/dashboard/chat/ChatMainSection';
import ChatHeaderSection from '@/components/dashboard/chat/ChatHeaderSection';



export default function ChatPage() {

    const { user } = useContext(AuthContext)
    const { io, newMessage, userAllData } = useContext(ChatContext)

    const { id } = useParams()
    // console.log("🚀 ~ id:", id)

    const receiverId = id === '1' ? userAllData[0]?.id : id

    const { data: userData, } = useFetchDataHook<{ data: IUserDataType }>(`${SERVER_URL}/user/${receiverId}`)

    return (
        <div className="flex-1">
            {/* Chat Header */}
            <ChatHeaderSection user={user} receiverId={receiverId} />

            {/* {incomingCall && (
       

                <div className="mx-auto w-fit">
                    <div className={`fixed z-[100] ${incomingCall ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
                        <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-w-xl rounded-lg  drop-shadow-lg dark:bg-zinc-900 dark:text-white ${incomingCall ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'} rounded border border-[#7808B1] max-w-6xl mx-auto bg-[#393B4C] text-white `}>
                            <div className='flex  justify-between py-9 px-7 text-xl'>
                             
                                <h2>Incoming call from {incomingCall?.senderName}</h2>

                             
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
            )} */}



            <ChatSection newMessage={newMessage} io={io} receiverId={receiverId} user={user} />
          
        </div>
    )
}
