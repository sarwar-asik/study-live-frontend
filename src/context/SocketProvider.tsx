/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    // const socket = useMemo(() => io("http://localhost:5000"), []);




    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    );
};