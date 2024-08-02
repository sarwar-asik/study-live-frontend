/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";

interface VideoProps {
    peer: Peer.Instance;
}

const Video: React.FC<VideoProps> = ({ peer }) => {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        peer.on("stream", (stream) => {
            if (ref.current) {
                ref.current.srcObject = stream;
            }
        });
    }, [peer]);

    return <video className="h-1/2 w-1/2" playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
};



const RoomTest = () => {


    const paramsData = useParams();
    const [peers, setPeers] = useState<Peer.Instance[]>([]);
    const socketRef = useRef<any | null>(null);
    const userVideo = useRef<HTMLVideoElement>(null);
    const peersRef = useRef<{ peerID: string; peer: Peer.Instance }[]>([]);
    const roomID = paramsData?.id

    useEffect(() => {
        socketRef.current = socketIOClient('http://localhost:5001');

        navigator.mediaDevices
            .getUserMedia({ video: videoConstraints, audio: true })
            .then((stream) => {
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }

                socketRef.current?.emit("join room", roomID);

                socketRef.current?.on("all users", (users: string[]) => {
                    const peers: Peer.Instance[] = [];
                    users.forEach((userID) => {
                        const peer = createPeer(userID, socketRef.current?.id!, stream);
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        });
                        peers.push(peer);
                    });
                    setPeers(peers);
                });

                socketRef.current?.on("user joined", (payload: { signal: any; callerID: string }) => {
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    });

                    setPeers((users) => [...users, peer]);
                });

                socketRef.current?.on("receiving returned signal", (payload: { id: string; signal: any }) => {
                    const item = peersRef.current.find((p) => p.peerID === payload.id);
                    if (item) {
                        item.peer.signal(payload.signal);
                    }
                });
            });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [roomID]);

    function createPeer(userToSignal: string, callerID: string, stream: MediaStream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socketRef.current?.emit("sending signal", { userToSignal, callerID, signal });
        });

        return peer;
    }

    function addPeer(incomingSignal: any, callerID: string, stream: MediaStream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socketRef.current?.emit("returning signal", { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <div className="p-5 flex h-screen w-11/12 mx-auto flex-wrap">
            <video muted ref={userVideo} autoPlay playsInline className="h-1/2 w-1/2" />
            {peers.map((peer, index) => (
                <Video key={index} peer={peer} />
            ))}
        </div>
    );
};

export default RoomTest;
