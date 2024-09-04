/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useState } from "react";

import { RoomContext } from "@/context/VideoProvider";

function Test() {
  
    const { call,  currentUserVideoRef, peerId, remoteVideoRef, incomingCall,rejectCall, answerCall, } = useContext(RoomContext);
    const [remotePeerIdValue, setRemotePeerIdValue] = useState<string>("");
    //@ts-ignore
   

    return (
        <div className="h-screen bg-gray-100 relative">
            <h1 className="text-4xl mb-4">Current user id is </h1>
            <p className="my-2">{peerId}</p>
            <input
                type="text"
                value={remotePeerIdValue}
                onChange={(e) => setRemotePeerIdValue(e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4"
                placeholder="Enter remote peer ID"
            />
            <button
                onClick={() => call(remotePeerIdValue)}
                className="bg-blue-500 text-white p-2 rounded cursor-pointer border-none hover:bg-blue-700"
            >
                Call
            </button>
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
    );
}

export default Test;
