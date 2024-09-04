/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useState } from "react";

import { RoomContext } from "@/context/VideoProvider";

function Test() {

    const { call, currentUserVideoRef, peerId, remoteVideoRef, incomingCall, rejectCall, answerCall, } = useContext(RoomContext);
    const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>("");
    //@ts-ignore


    return (

        <div className="fixed z-[100] inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
                {/* <p className="mb-4">started call...</p> */}
                <div className="flex space-x-4">

                    <div className="h-scr z-40 bg-blur bg-gray-100 relative">

                        <div className="relative border border-red-400 mt-4 ">
                            <video
                                ref={remoteVideoRef}
                                className="w-full h-full  lg:w-[900px] lg:h-[500px] mx-auto border border-spacing-2 rounded "
                            />
                            <video
                                ref={currentUserVideoRef}
                                className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] absolute bottom-4 right-4 z-10 border border-gray-300 rounded shadow-lg"
                            />
                        </div>


                    </div>
                </div>
            </div>
        </div>

    );
}

export default Test;
