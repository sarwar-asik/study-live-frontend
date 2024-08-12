/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Room, RemoteParticipant, LocalParticipant, connect } from 'livekit-client';

interface CallContextProps {
    room: Room | null;
    participants: RemoteParticipant[];
    localParticipant: LocalParticipant | null;
    callUser: (userId: string, signal: any) => void;
    answerCall: (userId: string, signal: any) => void;
    socket: Socket | null;
}

const CallContext = createContext<CallContextProps | undefined>(undefined);

export const CallProvider: React.FC = ({ children }) => {
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

    const connectToRoom = async (token: string) => {
        const newRoom = await connect(token, { videoCaptureDefaults: { resolution: { width: 640, height: 480 } } });
        setRoom(newRoom);
        setLocalParticipant(newRoom.localParticipant);

        newRoom.on('participantConnected', (participant) => {
            setParticipants((prev) => [...prev, participant]);
        });

        newRoom.on('participantDisconnected', (participant) => {
            setParticipants((prev) => prev.filter((p) => p !== participant));
        });
    };

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
