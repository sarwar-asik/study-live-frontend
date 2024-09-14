/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useEffect, useRef, useState } from "react";
import { RoomContext } from "@/context/VideoProvider";
// import VideoInputSection from "../dashboard/videoCall/VideoInputSection";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import usePointDeduction from "@/hooks/usePointsDeduction";

function VideoModal() {

    const { remoteVideoRef, localStream, setLocalStream, setIsStartCall, incomingCallData, user } = useContext(RoomContext);

    usePointDeduction(user?.id, incomingCallData?.callType === "audio" ? 3 : 5);
    //@ts-ignore
    const handleEndCall = () => {
        if (localStream) {
            localStream.getTracks().forEach((track: any) => track.stop());
        }
        setLocalStream(null);
        setIsStartCall(false)

    };
    // console.log(remoteVideoRef)
    const videoRef = useRef<HTMLVideoElement>(null)

    // const localStream = null
    // console.log(incomingCallData, 'incomingCallData')



    useEffect(() => {
        if (videoRef.current && localStream) videoRef.current.srcObject = localStream;
    }, [localStream]);
    //!  video /audio
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [isVideoOn, setIsVideoOn] = useState(true);
    // const [incomingCalling, setIncomingCall] = useState<{ offer: any; from: string; senderName?: string } | null>(null);


    // const receiverId = receiverId
    const toggleAudio = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach((track: MediaStreamTrack) => (track.enabled = !track.enabled));
        }
        setIsAudioOn(!isAudioOn);
    };

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach((track: MediaStreamTrack) => (track.enabled = !track.enabled));
        }
        setIsVideoOn(!isVideoOn);
    };

    const endCallHandler = () => {
        handleEndCall();
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
    }

    return (

        <div className="fixed z-[100] inset-0 bg-gray-800  bg-opacity-[0.4] flex items-center justify-center ">
            <div className="bg-white rounded shadow-lg ">
                {/* <p className="mb-4">started call...</p> */}
                <div className="">

                    <div className=" bg-blur h-[80vh min-w- relative">

                        <div className="relative border border-primary p-1">

                            {/* <VideoInputSection handleEndCall={handleEndCall} key={"me"} stream={localStream} /> */}
                            <div className="max-w-3x w-full mx-auto ">
                                <div className="relative w-full">
                                    <video
                                        className="w-full h-auto max-h-96 md:max-h-[47rem] z-20 bg-[#3B334F] max-w-[100vw] mx-auto"
                                        ref={videoRef}
                                        autoPlay
                                        muted={true}
                                        style={{
                                            width: "100% !important",
                                            minWidth: "100% !important",
                                        }}
                                    />
                                </div>
                                {videoRef && (
                                    <div className="w-full max-w-[100vw] mx-auto bg-slate-700 flex items-center justify-center gap-5 py-4">
                                        <button
                                            onClick={toggleAudio}
                                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        >
                                            {isAudioOn ? <FaMicrophone size={24} /> : <FaMicrophoneSlash size={24} />}
                                        </button>
                                        {
                                            incomingCallData?.callType !== "audio" &&
                                            <button
                                                onClick={toggleVideo}
                                                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            >
                                                {isVideoOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
                                            </button>
                                        }
                                        
                                        <button
                                            onClick={endCallHandler}
                                            className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                                        >
                                            <IoCallOutline size={24} />
                                        </button>
                                    </div>
                                )}
                            </div>


                            {/* {
                                remoteVideoRef?.current?.srcObject !== null &&
                                < video
                                    ref={remoteVideoRef}
                                    className="h-[40%] w-[40%] mx-auto borde border-spacing-2 rounded absolute bottom-[4rem] right-2"
                                />

                            } */}
                            < video
                                ref={remoteVideoRef}
                                poster="https://cdn-icons-png.freepik.com/512/9368/9368199.png"
                                className="h-[40%] w-[40%] mx-auto border border-spacing-2 rounded absolute bottom-[4rem] right-2"
                            />

                            {/* <video
                                ref={currentUserVideoRef}
                                className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] absolute bottom-4 right-4 z-10 border border-gray-300 rounded shadow-lg"
                            /> */}
                        </div>


                    </div>
                </div>
            </div>
        </div>

    );
}

export default VideoModal;
