import { useEffect, useRef } from "react";

export const VideoPlayer: React.FC<{
    stream: MediaStream;
    className?: string;
}> = ({ stream, className }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;

            // Ensure the video element dimensions are set
            videoRef.current.style.width = "100%";
            videoRef.current.style.height = "100%";
        }
    }, [stream]);

    console.log(videoRef)
    console.log(stream)
    return (
        <div className={`${className}`} >
            <video
                playsInline
                ref={videoRef}
                autoPlay
                muted={true}
                style={{ width: '100%', height: '100%' }} // Ensure video element fills the container
            />
        </div>
    );
};
