/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMessageDataType } from '@/type/dataType/message.data'
import { IUserDataType } from '@/type/dataType/user.data'
import React from 'react'

export default function Chat({ data, user, io, receiverId }: { data: IMessageDataType[], user: IUserDataType, io: any, receiverId: string }) {
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
        <React.Fragment>
            <div className="mb-9 overflow-y-auto">

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
            </div>

            <form onSubmit={handleSubmit} className="bg-white border-t border-gray-300 px-4 pt-3 mb-0 absolute bottom-0 w-full lg:w-3/4">
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
        </React.Fragment>
    )
}
