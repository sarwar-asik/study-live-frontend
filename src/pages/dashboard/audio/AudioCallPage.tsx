import AudioCallSection from '@/components/dashboard/audio/AudioCallSection'
import AuthContext from '@/context/AuthProvider'
import  { useContext } from 'react'
import { useParams } from 'react-router-dom'

export default function AudioCallPage() {
    const { id } = useParams()
    const { user } = useContext(AuthContext)


    return (
        <div>
            <AudioCallSection senderId={user.id} receiverId={id ?? "demoid"} />
        </div>
    )
}
