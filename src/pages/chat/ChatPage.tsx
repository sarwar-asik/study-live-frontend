/* eslint-disable @typescript-eslint/no-explicit-any */
import SidebarDash from '@/components/dashboard/SidebarDash';
import AuthContext from '@/context/AuthProvider';
import { SERVER_URL } from '@/helper/const';
import useFetchDataHook from '@/hooks/useFetchDataHook';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
// import { IMessageDataType } from '@/type/dataType/message.data';
import { IUserDataType } from '@/type/dataType/user.data';
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import LoaderData from '../shared/LoaderData';
import { ChatContext } from '@/context/ChatContext';
import { IMessageDataType } from '@/type/dataType/message.data';
import { RoomContext } from '@/context/RoomProvider';
import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';

export default function ChatPage() {

    const { user } = useContext(AuthContext)
    const { io, newMessage } = useContext(ChatContext)
    const { localStream, startCall, getMedia, localVideoRef, remoteVideoRef, endCall, incomingCall, answerCall, setIncomingCall, remoteStream } = useContext(RoomContext);

    const { id } = useParams()


    // console.log(user)

    // console.log(`${SERVER_URL}/user/${id}`)

    const { data: userData, } = useFetchDataHook<{ data: IUserDataType }>(`${SERVER_URL}/user/${id}`)

    console.log(userData)
    // const { data, loading, refetch } = useFetchDataHook<{ data: IMessageDataType[] }>(`${SERVER_URL}/message/user?senderId=${user.id}&receiverId=${id}`)
    const [data, setData] = useState<{ data: IMessageDataType[] | [] }>({ data: [] })
    const [loading, setLoading] = useState(false)
    // const [newMessage, setNewMessage] = useState({})


    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await fetch(`${SERVER_URL}/message/user?senderId=${user.id}&receiverId=${id}`)
            const data = await res.json()
            console.log(data)
            setLoading(false)
            setData(data)
        })()


    }, [id, newMessage, user.id])

    // console.log(data?.data.length)
    // console.log(data?.data)
    // console.log(id)
    // console.log(data)

    // const userData = 

    // useEffect(() => {
    //     io.on('new-message', (data: any) => {
    //         console.log(data)
    //         // console.log(d)
    //         setNewMessage(data)
    //         // refetch()
    //     })
    // }, [io])

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);


    // console.log(data)
    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formElement = e.currentTarget;
        const message: string = (formElement.elements.namedItem("message") as HTMLInputElement).value;
        console.log(message)
        io.emit("send-message", { message, senderId: user.id, receiverId: id })
        // setMessage(!message)
        // e.target.reset()
        formElement.reset();
    }

    //!  video /audio
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    // const [incomingCalling, setIncomingCall] = useState<{ offer: any; from: string; senderName?: string } | null>(null);

    const senderId = user?.id
    const receiverId = id
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
        await answerCall()
    }



    console.log(senderId, receiverId);

    console.log(userData?.data)

    return (
        <div className="flex-1">
            {/* Chat Header */}
            <header className="bg-white p-4 text-gray-700 flex justify-between">
                <h1 className="text-2xl font-semibold">{userData?.data?.name ?? "UserName"}</h1>
                {/* audio and video button by react-icons */}
                <div className="flex space-x-4">
                    <button
                        onClick={handleStartCall}
                        className="p-2 bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Start Call
                    </button>
                    <button
                        onClick={handleEndCall}
                        className="p-2 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        End Call
                    </button>
                    <button
                        onClick={toggleAudio}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        {isAudioOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
                    </button>
                    <button
                        onClick={toggleVideo}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        {isVideoOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
                    </button>

                    <button onClick={handleClick} id="toggleOpen" className="lg:hidden">
                        <svg
                            className="w-7 h-7"
                            fill="#000"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>



            </header>

            <div
                id="collapseMenu"
                className={`${isMenuOpen ? 'block lg:hidden' : 'hidden'
                    } lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-[80%] max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0  max-lg:h-full max-lg:shadow-md overflow-hidden z-50 `}
            >
                <button
                    id="toggleClose"
                    onClick={handleClick}
                    className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 fill-black"
                        viewBox="0 0 320.591 320.591"
                    >
                        <path
                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            data-original="#000000"
                        />
                        <path
                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            data-original="#000000"
                        />
                    </svg>
                </button>
                <div className="flex lg:hidden">
                    <SidebarDash />
                </div>
            </div>

            {/* Chat Messages */}
            <div className="h-screen  overflow-y-auto p-4 pb-36">

                {/* Incoming Call Notification */}
                {incomingCall && (
                    // <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    //     <div className="bg-white p-7 rounded-lg shadow-lg">
                    //         <p>Incoming call from {incomingCall.senderName}</p>
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
                                    <h2>Incoming call from {incomingCall.senderName}</h2>

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

                <div className="flex flex-col items-center justify-center h-full">
                    <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-1/2" />
                    <video ref={remoteStream} autoPlay playsInline className="w-full h-1/2" />
                </div>

                {/* Incoming Message */}

                {
                    loading && <LoaderData />
                }
                {
                    !loading && data?.data?.map((message: IMessageDataType) => {

                        if (message.senderId === user?.id) {
                            return <div key={message.id} className="flex justify-end mb-4 cursor-pointer">
                                <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                                <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                    <img
                                        src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                        alt="My Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </div>
                            </div>
                        }
                        else {
                            return <div key={message.id} className="flex mb-4 cursor-pointer">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                    <img
                                        src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </div>
                                <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                    <p className="text-gray-700">
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        }
                    })
                }


                {/* Outgoing Message */}

            </div>
            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full lg:w-3/4">
                <div className="flex items-center">
                    <input
                        type="text"
                        name="message"
                        // onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <button type='submit' className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}
