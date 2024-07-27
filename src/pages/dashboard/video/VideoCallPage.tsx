import VideoCall from '@/components/dashboard/videoCall/VideoCall';
import React, { useEffect, useState } from 'react'

export default function VideoCallPage() {
    const [points, setPoints] = useState<number>(10);

    useEffect(() => {
        if (points <= 0) {
            // Handle disconnection logic here
            alert("Your points are exhausted. Please add more points to continue.");
        }
    }, [points]);

    const handlePointDeduction = (amount: number) => {
        setPoints(prevPoints => Math.max(prevPoints - amount, 0));
    };

    const handleAddPoints = () => {
        setPoints(10);
    };
    return (
        <React.Fragment>   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="flex items-center mb-4">
                <div className="text-lg font-semibold">Points: {points}</div>
                <button
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    onClick={handleAddPoints}
                >
                    Add Points
                </button>
            </div>
            {points > 0 && (
                <VideoCall onPointDeduction={handlePointDeduction} />
            )}
        </div></React.Fragment>
    )
}
