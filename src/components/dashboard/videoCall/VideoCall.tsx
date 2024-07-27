import React, { useEffect } from 'react';

interface VideoCallProps {
    onPointDeduction: (amount: number) => void;
}

const VideoCall: React.FC<VideoCallProps> = ({ onPointDeduction }) => {
    useEffect(() => {
        const interval = setInterval(() => {
            onPointDeduction(1); // Deduct 1 point per minute
        }, 60000);

        return () => clearInterval(interval);
    }, [onPointDeduction]);

    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-md">
                {/* Replace this div with the actual video call component */}
                <p className="text-white text-center">Video Call Area</p>
            </div>
        </div>
    );
};

export default VideoCall;
