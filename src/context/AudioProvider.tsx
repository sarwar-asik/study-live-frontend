/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChatContext } from './ChatContext';

export const AudioContext = createContext<any>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
    const { io } = useContext(ChatContext);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
    const [incomingAudioCall, setIncomingAudioCall] = useState<any>(null);


    useEffect(() => {
        const configuration = {
            iceServers: [
                {
                    urls: [
                        'stun:global.stun.twilio.com:3478', // Replace with your TURN server address and port

                    ],
                    // username: 'efAIRLOZ179F998GBE', // Replace with the username for your TURN server
                    // credential: '4XuMIdIr41W7MGxw' // Replace with the password for your TURN server
                },
                {
                    "username": "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
                    "credential": "tE2DajzSJwnsSbc123",
                    "urls": "turn:global.turn.twilio.com:3478?transport=udp"
                },
                {
                    urls: 'stun:stun.l.google.com:19302' // You can include a STUN server as a fallback
                }
            ]
        }
        // LLGS34MU38MET2TKJX9QWYZW for verify twillo
        const pc = new RTCPeerConnection(configuration);
        setPeerConnection(pc)


        // io.on('incoming-call', async (data: { senderId: string, receiverId: string, senderName: string }) => {
        //     console.log(data, 'incoming call data')
        //     setIncomingAudioCall(data)

        // })

        io.on('answer', (answerData: any) => {
            console.log(answerData, 'from caller')
            if (peerConnection) {
                console.log('peerConnection ache', peerConnection,)

                peerConnection.setRemoteDescription(new RTCSessionDescription(answerData))
            }
            // setPeerConnection(pc)
        })

        io.on('end-call', (data: any) => {
            // Close the peer connection
            console.log(data, 'data')

            if (peerConnection) {
                peerConnection.close();
                setPeerConnection(null);

                // Stop all tracks in the local stream
                if (localStream) {
                    localStream.getTracks().forEach(track => track.stop());
                }


                // Clear video elements

            }
            setLocalStream(null);
            // setRemoteStream(null);
        })


    }, [io])

    useEffect(() => {
        if (localStream && peerConnection) {
            // console.log('local stream and peer connection available added getTracks()')
            localStream.getTracks().forEach((track) => {
                console.log(track, 'trackData')
                peerConnection.addTrack(track, localStream);
            });
            // io.on('ice-candidate', async (data: any) => {
            //     console.log(data, 'trackData')
            //     if (peerConnection && data?.candidate) {
            //         await peerConnection.addIceCandidate(new RTCIceCandidate(data?.candidate));
            //     }
            // });
        }
    }, [localStream, peerConnection]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const getMedia = async () => {
    //     try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    //         setLocalStream(stream);
    //     } catch (err) {
    //         console.error('Error accessing media devices.', err);
    //     }
    // };

    const startAudioCallNow = async (senderId: string, receiverId: string, senderName: string) => {

        try {
            // const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
            // setLocalStream(stream);

            if (peerConnection) {
                const offer = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offer);
                io.emit("offer", { offer, targetId: receiverId, senderId, receiverId, senderName });
                // navigate(`/audio/${receiverId}`);  // Redirect after sending the offer
            }
        } catch (err) {
            console.error('Error accessing media devices.', err);
        }
    };


    const answerCall = async () => {
        if (!peerConnection) {
            console.error('Peer connection is not initialized');
            return;
        }

        if (!incomingAudioCall || !incomingAudioCall.offer) {
            console.error('Incoming call offer is not available');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
            setLocalStream(stream);

            const { offer } = incomingAudioCall;
            console.log(offer, "offer when answer")
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            io.emit('answer', { answer, targetId: incomingAudioCall.senderId });
        } catch (error) {
            console.error('Error answering the call:', error);
        }
    };


    const endCall = (receiverId: string) => {
        // console.log("end call")
        if (peerConnection) {
            peerConnection.close();
            setPeerConnection(null);

            // Stop all tracks in the local stream
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }

            // Clear video elements
        }
        setLocalStream(null);
        console.log('null')
        // setRemoteStream(null);
        io.emit('end-call', receiverId);
    }
    // console.log(localStream)

    return (
        <AudioContext.Provider value={{ startAudioCallNow, localStream, incomingCall: incomingAudioCall, answerCall, endCall, setIncomingAudioCall, setLocalStream }}>
            {children}
        </AudioContext.Provider>
    );
};