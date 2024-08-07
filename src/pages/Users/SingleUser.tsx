import { RoomContext } from '@/context/RoomProvider';
import { SERVER_URL } from '@/helper/const';
import useFetchDataHook from '@/hooks/useFetchDataHook';
import { IUserDataType } from '@/type/dataType/user.data';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';

const SingleUser = () => {
    const { id } = useParams()
    const { data: userData, } = useFetchDataHook<{ data: IUserDataType }>(`${SERVER_URL}/user/${id}`)
    const { ws, me } = useContext(RoomContext);
    const createRoom = () => {
        ws.emit("create-room", { peerId: me._id });
    };
    
    return (
        <div className="p-10">
            <div>
                <Link to={`/dashboard/chat/${id}`} className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded-full">
                    Message Now
                </Link>
                <button className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded-full">
                    Audio call
                </button>
                <button onClick={createRoom} className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded-full">
                    Video call
                </button>
            </div>
        </div>
    );
};

export default SingleUser;