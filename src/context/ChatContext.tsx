/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import AuthContext from "./AuthProvider";
import useFetchDataHook from "@/hooks/useFetchDataHook";
import { IUserDataType } from "@/type/dataType/user.data";

export const ChatContext = createContext<null | any>(null);

export const ChatProvider = ({ children }: { children: any }) => {
    const { user } = useContext(AuthContext)
    const io = socketIOClient(`http://localhost:5001?id=${user?.id}`);
    const [newMessage, setNewMessage] = useState({})

    const { data } = useFetchDataHook<{ data: IUserDataType[] }>(`http://localhost:5001/api/v1/user`)

    const userAllData =data?.data
    // console.log(user)
    // const [newMessage, setNewMessage] = useState({})

    useEffect(() => {
        io.on('new-message', data => {
            // console.log(data)
            setNewMessage(data)
        })
    }, [io])
    return (
        <ChatContext.Provider value={{ io, newMessage, userAllData }}>
            {children}
        </ChatContext.Provider>
    );

}