import { RoomContext } from '@/context/VideoProvider'
import React, { useContext } from 'react'
import VideoInputSection from './VideoInputSection'


export default function VideoCallSection({ senderId, receiverId }: { senderId: string, receiverId: string }) {
  const { localStream, incomingCall, endCall, answerCall } = useContext(RoomContext)
  // console.log(senderId, receiverId)

  // console.log(localStream, 'localStream')

  const handleEndCall = () => {

    console.log(senderId)
    endCall(receiverId)

  }
  return (
    <div className='h-full w-full'>

      {/* incoming call section */}
      {incomingCall && (
        <div className="mx-auto w-fit">
          <div className={`fixed z-[100] ${incomingCall ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
            <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-w-xl rounded-lg  drop-shadow-lg dark:bg-zinc-900 dark:text-white ${incomingCall ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'} rounded border border-[#7808B1] max-w-6xl mx-auto bg-[#393B4C] text-white `}>
              <div className='flex  justify-between py-9 px-7 text-xl'>
                {/* <h1>Request For {type} Call</h1> */}
                <h2>Incoming call from {incomingCall?.senderName}</h2>

                {/* <button onClick={() => setIncomingCall(null)} className='rounded-full py-[2px] text-sm px-1 border border-red-500 '>&#x274c;</button> */}
              </div>
              <section className=''>
                <div className="bg-white p-7 flex justify-between items-center  rounded-lg shadow-lg">

                  <button
                    // onClick={handleAnswerCall}
                    onClick={async () => await answerCall()}
                    className="p-2 bg-green-600 px-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white my-5 z-50"
                  >
                    Answer Call
                  </button>

                  {/* <button onClick={() => setIncomingCall(null)} className='h-9 px-3 rounded-full p-2 bg-red-600'>Reject  </button> */}

                </div>
              </section>

            </div>
          </div>
        </div >
      )}
      {/* local video call section */}
      {localStream && <VideoInputSection stream={localStream ? localStream : null} handleEndCall={handleEndCall} />}


    </div>
  )
}



