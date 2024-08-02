import VideoCall from '@/components/dashboard/videoCall/VideoCall';
import AuthContext from '@/context/AuthProvider';
import { RoomContext } from '@/context/RoomProvider';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function VideoCallPage() {
    const paramsData = useParams();
    const { user } = useContext(AuthContext);
    const { ws, stream, peers } = useContext(RoomContext);

    const [points, setPoints] = useState<number>(10);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    useEffect(() => {
        if (user.id) {
            ws.emit("join-room", { roomId: paramsData?.id, userId: user?.id, name: user?.name });
            console.log('user id', user?.id);
        }
    }, [paramsData?.id, user?.id, ws, user.name]);

    const handleAddPoints = () => {
        setPoints(10);
    };

    const handleMuteToggle = () => {
        if (stream) {
            stream.getAudioTracks().forEach((track: any) => track.enabled = !isMuted);
            setIsMuted(!isMuted);
        }
    };

    const handleEndCall = () => {
        console.log('end call');
        ws.emit('end-call', { roomId: paramsData?.id, userId: user?.id });
        // Perform additional cleanup here if needed
    };

    console.log(peers)
    const otherUsers = Object.keys(peers).filter(ids => ids === user?.id);
    console.log(otherUsers, 'others');

    return (
        <React.Fragment>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <div className="flex items-center flex-wrap gap-1 mb-4">
                    <div className="text-lg font-semibold">Points: {points}</div>
                    <button
                        className="ml-4 px-4 py-2 text-nowrap bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        onClick={handleAddPoints}
                    >
                        Add Points
                    </button>

                    <button
                        className="ml-4 px-4 py-2 text-nowrap bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                        onClick={handleEndCall}
                    >
                        End Call
                    </button>
                    <button
                        className="ml-4 px-4 py-2 text-nowrap bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
                        onClick={handleMuteToggle}
                    >
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                    {/* share the link */}
                    <button onClick={() => navigator.clipboard.writeText(paramsData?.id ?? "")} className='ml-4 px-4 py-2 text-nowrap bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none mt-1'>Invite people</button>



                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-start gap-5'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-1 '>
                        {peers ? otherUsers.map((userId, index) => (
                            <VideoCall stream={peers[userId].stream} key={index} />
                        )) : null}
                    </div>
                    {points > 0 && stream && (
                        <VideoCall stream={stream} />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}
