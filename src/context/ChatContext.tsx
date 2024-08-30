/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import AuthContext from "./AuthProvider";
import useFetchDataHook from "@/hooks/useFetchDataHook";
import { IUserDataType } from "@/type/dataType/user.data";
import { SERVER_URL, SERVER_URL_ONLY } from "@/helper/const";

export const ChatContext = createContext<null | any>(null);

export const ChatProvider = ({ children }: { children: any }) => {
    const { user } = useContext(AuthContext)
    const io = socketIOClient(`${SERVER_URL_ONLY}?id=${user?.id}`);
    const [newMessage, setNewMessage] = useState({})

    const { data } = useFetchDataHook<{ data: IUserDataType[] }>(`${SERVER_URL}/user`)

    const userAllData = data?.data
    // console.log(user)
    // const [newMessage, setNewMessage] = useState({})

    useEffect(() => {
        io.on('new-message', data => {
            // console.log(data)
            setNewMessage(data)
        })
    }, [io])
    return (
        <ChatContext.Provider value={{ io, newMessage, userAllData, user }}>
            {children}
        </ChatContext.Provider>
    );

}