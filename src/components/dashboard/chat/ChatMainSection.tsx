/* eslint-disable @typescript-eslint/no-explicit-any */
import { SERVER_URL } from '@/helper/const'
import LoaderData from '@/pages/shared/LoaderData'
import { IMessageDataType } from '@/type/dataType/message.data'
import { IUserDataType } from '@/type/dataType/user.data'
import React, { useEffect, useRef, useState } from 'react'
import VideoCallSection from '../videoCall/VideoCallSection'

export default function ChatSection({ user, io, receiverId, newMessage }: { user: IUserDataType, io: any, receiverId: string, newMessage: any }) {
    const [data, setData] = useState<IMessageDataType[] | any[]>([])
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await fetch(`${SERVER_URL}/message/user?senderId=${user.id}&receiverId=${receiverId}`)
            const data = await res.json()
            // console.log(data)
            setLoading(false)
            setData(data.data)
            if (data.data && messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth',block: 'end' });
            }
        })()


    }, [receiverId, user.id, newMessage])

    // console.log(data?.data.length)
    // console.log(data?.data)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formElement = e.currentTarget;
        const message: string = (formElement.elements.namedItem("message") as HTMLInputElement).value;
        console.log(message)
        io.emit("send-message", { message, senderId: user.id, receiverId: receiverId })
        // setMessage(!message)
        // e.target.reset()
        formElement.reset();
    }
    return (
        <div className=''>
            <div  className="h-screen  overflow-y-auto p-4   pb-[10rem]  ">
                {
                    loading && <LoaderData />
                }
                <VideoCallSection receiverId={receiverId} senderId={user?.id} /> 
                {
                    data?.map((message: IMessageDataType) => {

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
          
            <form  onSubmit={handleSubmit} className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full lg:w-3/4">
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
