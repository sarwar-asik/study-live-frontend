/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext } from "react";

import { RoomContext } from "@/context/VideoProvider";
import VideoInputSection from "../dashboard/videoCall/VideoInputSection";

function Test() {

    const { currentUserVideoRef, remoteVideoRef, localStream, remoteStream, setLocalStream, setRemoteStream } = useContext(RoomContext);
    //@ts-ignore
    const handleEndCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        setLocalStream(null);

    };

    return (

        <div className="fixed z-[100] inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center min-h-[80vh] min-w-[80vw]">
            <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
                {/* <p className="mb-4">started call...</p> */}
                <div className="flex space-x-4">

                    <div className="h-scr z-40 bg-blur h-[80vh] w-[80vw] relative">

                        <div className="relative border border-red-400 mt-2">

                            <VideoInputSection handleEndCall={handleEndCall} key={"me"} stream={localStream} />


                            <video
                                ref={remoteVideoRef}
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

export default Test;
