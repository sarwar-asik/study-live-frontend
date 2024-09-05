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
            videoRef.current.srcObject = null;
        }
    }
    // console.log(stream)

    return (
        <div className="max-w-3x mx-auto ">
            <div className="relative w-full">
                <video
                    className="w-full h-auto max-h-96 md:max-h-[40rem] z-20 bg-[#3B334F] max-w-[100vw] mx-auto"
                    ref={videoRef}
                    autoPlay
                    muted={true}
                    style={{
                        width: "100% !important",
                        minWidth: "100% !important",
                    }}
                />
            </div>
            {videoRef?.current?.srcObject !== null && (
                <div className="w-full max-w-[100vw] mx-auto bg-slate-700 flex items-center justify-center gap-5 py-4">
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
                    <button
                        onClick={endCallHandler}
                        className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        <IoCallOutline size={24} />
                    </button>
                </div>
            )}
        </div>
    );
}
