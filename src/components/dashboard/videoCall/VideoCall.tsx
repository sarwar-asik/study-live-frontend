
import { useEffect, useRef } from 'react';


const VideoCall = ({ stream }: { stream?: MediaStream }) => {

    const videoRef = useRef<HTMLVideoElement>(null)

    // console.log(stream)


    useEffect(() => {
        if (videoRef.current && stream) videoRef.current.srcObject = stream;
    }, [stream]);

    // // close button
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         onPointDeduction(1); // Deduct 1 point per minute
    //     }, 60000);

    //     return () => clearInterval(interval);
    // }, [onPointDeduction]);



    return (
        <video style={{ width: "400px" }} ref={videoRef} autoPlay muted={true} />
    );
};

export default VideoCall;
