/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import AuthContext from "./AuthProvider";

export const ChatContext = createContext<null | any>(null);

export const ChatProvider = ({ children }: { children: any }) => {
    const { user } = useContext(AuthContext)
    const io = socketIOClient(`http://localhost:5001?id=${user?.id}`);
    const [newMessage, setNewMessage] = useState({})
    // console.log(user)
    // const [newMessage, setNewMessage] = useState({})

    useEffect(() => {
        io.on('new-message', data => {
            // console.log(data)
            setNewMessage(data)
        })
    }, [io])
    return (
        <ChatContext.Provider value={{ io, newMessage }}>
            {children}
        </ChatContext.Provider>
    );

}