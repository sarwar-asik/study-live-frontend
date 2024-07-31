/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import generateUUID from "@/helper/generateUUID";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";

export const RoomCOntext = createContext<null | any>(null);


const ws = socketIOClient('http://localhost:5001')

export const RoomProvider = ({ children }: { children: any }) => {
    // const navigate = useNavigate();
    // const socket = useMemo(() => io("http://localhost:5000"), []);

    const [roomId, setRoomId] = useState("")
    const enterRoom = () => {
        ws.emit("create-room")
    };
    useEffect(() => {
        ws.on("room-created", (room) => {
            setRoomId(room.roomId)
        });
    }, [enterRoom])


    return (
        <RoomCOntext.Provider value={{ ws, enterRoom, roomId }}>
            {children}
        </RoomCOntext.Provider>
    );
};