import React, { useState } from 'react'
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';


export default function VideoAudioButton({ senderId, receiverId }: { senderId: string, receiverId: string }) {
    // video 
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);

    const toggleAudio = () => {
        setIsAudioOn(!isAudioOn);
    };

    const toggleVideo = () => {
        setIsVideoOn(!isVideoOn);
    };

    console.log(senderId, receiverId)

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}
