/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Room, RemoteParticipant, LocalParticipant } from 'livekit-client';

interface CallContextProps {
    room: Room | null;
    participants: RemoteParticipant[];
    localParticipant: LocalParticipant | null;
    callUser: (userId: string, signal: any) => void;
    answerCall: (userId: string, signal: any) => void;
    socket: Socket | null;
}

const CallContext = createContext<CallContextProps | undefined>(undefined);

export const CallProvider = ({ children }: { children: any }) => {
    const [room, setRoom] = useState<Room | null>(null);

    const [participants, setParticipants] = useState<RemoteParticipant[]>([]);
    const [localParticipant, setLocalParticipant] = useState<LocalParticipant | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:4000');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const connectToRoom = async (_token: string) => {
    //     // const newRoom = await connect(token, { videoCaptureDefaults: { resolution: { width: 640, height: 480 } } });
    //     // setRoom(newRoom);
    //     // setLocalParticipant(newRoom.localParticipant);

    //     // newRoom.on('participantConnected', (participant: RemoteParticipant) => {
    //     //     setParticipants((prev) => [...prev, participant]);
    //     // });

    //     // newRoom.on('participantDisconnected', (participant: RemoteParticipant) => {
    //     //     setParticipants((prev) => prev.filter((p) => p !== participant));
    //     // });
    // };

    const callUser = (userId: string, signal: any) => {
        if (socket) {
            socket.emit('call-user', { to: userId, signal });
        }
    };

    const answerCall = (userId: string, signal: any) => {
        if (socket) {
            socket.emit('answer-call', { to: userId, signal });
        }
    };

    return (
        <CallContext.Provider value={{ room, participants, localParticipant, callUser, answerCall, socket }}>
            {children}
        </CallContext.Provider>
    );
};

export const useCall = () => {
    const context = useContext(CallContext);
    if (context === undefined) {
        throw new Error('useCall must be used within a CallProvider');
    }
    return context;
};
