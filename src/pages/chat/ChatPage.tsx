/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthContext from '@/context/AuthProvider';
import { SERVER_URL } from '@/helper/const';
import useFetchDataHook from '@/hooks/useFetchDataHook';
import { IUserDataType } from '@/type/dataType/user.data';
import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ChatContext } from '@/context/ChatContext';
import ChatSection from '@/components/dashboard/chat/ChatMainSection';
import ChatHeaderSection from '@/components/dashboard/chat/ChatHeaderSection';
import usePointDeduction from '@/hooks/usePointsDeduction';



export default function ChatPage() {

    const { user } = useContext(AuthContext)
    const { io, newMessage, userAllData } = useContext(ChatContext)

    const { id } = useParams()

    usePointDeduction(user.id,1)

    // console.log("🚀 ~ id:", id)

    const receiverId = id === '1' ? userAllData[0]?.id : id

    const { data: userData, } = useFetchDataHook<{ data: IUserDataType }>(`${SERVER_URL}/user/${receiverId}`)

    return (
        <div className="flex-1">
            {/* Chat Header */}
            <ChatHeaderSection user={userData?.data} receiverId={receiverId} />

      


            <ChatSection newMessage={newMessage} io={io} receiverId={receiverId} user={user} />

        </div>
    )
}
