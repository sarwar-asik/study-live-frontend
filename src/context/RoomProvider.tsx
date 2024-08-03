import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ChatContext } from './ChatContext';

export const RoomContext = createContext<any>(null);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
    const { io: ws } = useContext(ChatContext);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
    const [incomingCall, setIncomingCall] = useState<any>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const pc = new RTCPeerConnection();

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                ws.emit('ice-candidate', event.candidate);
            }
        };

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        pc.onconnectionstatechange = (event) => {
            switch (pc.connectionState) {
                case 'connected':
                    console.log('The connection has become fully connected');
                    break;
                case 'disconnected':
                case 'failed':
                    console.error('The connection has been disconnected or failed');

                    break;
                case 'closed':
                    console.log('The connection has been closed');
                    break;
                default:
                    break;
            }
        };

        pc.oniceconnectionstatechange = (event) => {
            switch (pc.iceConnectionState) {
                case 'disconnected':
                case 'failed':
                    console.error('ICE connection state is disconnected or failed');

                    break;
                case 'closed':
                    console.log('ICE connection state is closed');
                    break;
                default:
                    break;
            }
        };

        pc.onicegatheringstatechange = (event) => {
            if (pc.iceGatheringState === 'complete') {
                console.log('ICE gathering is complete');
            }
        };

        pc.onsignalingstatechange = (event) => {
            if (pc.signalingState === 'stable') {
                console.log('Signaling state is stable');
            }
        };
        setPeerConnection(pc);

        ws.on('ice-candidate', (candidate) => {
            if (candidate) {
                pc.addIceCandidate(new RTCIceCandidate(candidate));
            }
        });

        ws.on('incoming-call', async ({ offer, from, senderName }) => {
            console.log(offer, from, senderName, 'incoming-call')
            setIncomingCall({ offer, from, senderName });
        });

        console.log(peerConnection)
        ws.on('answer', async (answer) => {
            console.log(answer)
            if (peerConnection) {
                try {
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
                } catch (error) {
                    console.error('Error setting remote description:', error);
                }
            }
        });

        return () => {
            pc.close();
        };
    }, [ws]);

    useEffect(() => {
        if (localStream && peerConnection) {
            localStream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, localStream);
            });
        }
    }, [localStream, peerConnection]);

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const startCall = async (receiverId: string, senderName: string) => {
        if (peerConnection) {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            ws.emit('offer', { offer, targetId: receiverId, senderName });
        }
    };

    console.log(peerConnection)
    const answerCall = async () => {
        if (!peerConnection) {
            console.error('Peer connection is not initialized');
            return;
        }

        if (!incomingCall || !incomingCall.offer) {
            console.error('Incoming call offer is not available');
            return;
        }



        try {
            const { offer } = incomingCall;

            // Validate the offer object
            if (!offer || !offer.sdp || !offer.type) {
                throw new Error('Invalid offer format');
            }

            // Set remote description
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

            // Create and set local description
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            // Emit the answer
            ws.emit('answer', { answer, targetId: incomingCall.from });

            // Clear the incoming call state
            setIncomingCall(null);
        } catch (error) {
            console.error('Error answering the call:', error);
        }
    };


    const getMedia = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
    };

    const endCall = (receiverId: string) => {
        if (peerConnection) {
            // Close the peer connection
            peerConnection.close();
            setPeerConnection(null);

            // Stop all tracks in the local stream
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            setLocalStream(null);
            setRemoteStream(null);

            // Clear video elements
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = null;
            }
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = null;
            }

            // Notify the server that the call has ended
            ws.emit('end-call', receiverId);
        }
    };

    return (
        <RoomContext.Provider value={{ localStream, remoteStream, startCall, getMedia, localVideoRef, remoteVideoRef, endCall, incomingCall, answerCall, setIncomingCall }}>
            {children}
        </RoomContext.Provider>
    );
};
