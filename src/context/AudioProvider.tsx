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
            'iceServers': [{
                urls: [
                    'stun:stun.l.google.com:19302',
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                    'stun:stun3.l.google.com:19302',
                ]
            }]
        }
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
            console.log('local stream and peer connection available added getTracks()')
            localStream.getTracks().forEach((track) => {
                console.log(track, 'trackData')
                peerConnection.addTrack(track, localStream);
            });
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