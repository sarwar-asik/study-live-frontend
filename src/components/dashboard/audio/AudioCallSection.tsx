// import { RoomContext } from '@/context/VideoProvider'
import { useContext } from 'react'
import VideoInputSection from '../videoCall/VideoInputSection'
import { AudioContext } from '@/context/AudioProvider'
import { useNavigate } from 'react-router-dom'


export default function AudioCallSection({ senderId, receiverId }: { senderId: string, receiverId: string }) {
  const { localStream, endCall } = useContext(AudioContext)
  // console.log(senderId, receiverId)

  const navigate = useNavigate()
  // console.log(localStream, 'localStream')

  const handleEndCall = () => {
    console.log(senderId)
    navigate(-1)
    endCall(receiverId)
  }

  return (
    <div className='h-full w-full'>


      {/* local video call section */}
      {localStream && <VideoInputSection stream={localStream ? localStream : null} handleEndCall={handleEndCall} />}


    </div>
  )
}



