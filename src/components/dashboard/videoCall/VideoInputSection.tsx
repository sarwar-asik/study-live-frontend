/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { IoCallOutline } from 'react-icons/io5';

export default function VideoInputSection({ stream, handleEndCall }: { stream: MediaStream | null, handleEndCall: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current && stream) videoRef.current.srcObject = stream;
    }, [stream]);

    //!  video /audio
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    // const [incomingCalling, setIncomingCall] = useState<{ offer: any; from: string; senderName?: string } | null>(null);


    // const receiverId = receiverId
    const toggleAudio = () => {
        if (stream) {
            stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
        }
        setIsAudioOn(!isAudioOn);
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
        }
        setIsVideoOn(!isVideoOn);
    };

    const endCallHandler = () => {
        handleEndCall();
        if (videoRef.current) {
            videoRef.current.srcObject = null
        }
    }
    // console.log(stream)

    return (
        <div className='max-h-[10rem] '>
            <video style={{ width: "100%" ,zIndex:200,height:"50%"}} ref={videoRef} autoPlay muted={true} />
            {
                videoRef?.current?.srcObject !== null && < div className='w-full bg-slate-700 flex items-center justify-center  gap-5 py-4'>
                    <button
                        onClick={toggleAudio}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        {isAudioOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
                    </button>
                    <button

                        onClick={toggleVideo}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >

                        {isVideoOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
                    </button>
                    <button onClick={endCallHandler} className="rounded-full text-2xl bg-red-600 w-[3rem] text-white p-3 "><IoCallOutline />
                    </button>
                </div>
            }

        </div >
    );
}
