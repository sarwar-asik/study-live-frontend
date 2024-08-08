import LoaderData from '@/components/shared/LoaderData';
import UserCard from '@/components/user/UserCard';
import { RoomContext } from '@/context/VideoProvider';
import { SERVER_URL } from '@/helper/const';
import useFetchDataHook from '@/hooks/useFetchDataHook';
import { IUserDataType } from '@/type/dataType/user.data';
import { useState } from 'react';

import { useContext } from 'react';

import { useParams, Link } from 'react-router-dom';

const SingleUser = () => {
    const { id } = useParams()
    const { data, loading } = useFetchDataHook<{ data: IUserDataType }>(`${SERVER_URL}/user/${id}`)
    const { data: allUserData } = useFetchDataHook<{ data: IUserDataType[] }>(`${SERVER_URL}/user`)
    const userData = data?.data
    const { ws, me } = useContext(RoomContext);

    // console.log(data?.data)
    const startVideoCallWithRoom = () => {
        ws.emit("create-room", { peerId: me._id, receiverId: data?.data });
    };
    const [userRating, setUserRating] = useState(1);

    // console.log(userData)

    return (
        <div className="pt-10 container mx-auto">

            {
                loading && <LoaderData />
            }
            <section className='block lg:flex  justify-between  items-center  w-full'>

                <div className="block lg:flex items-center gap-[5rem] text-white w-[55%] mx-auto">
                    <img className='rounded-full h-[10rem] w-[10rem]' src={userData?.img ?? "https://img.freepik.com/free-photo/smart-casual-asian-happiness-male-wear-glasses-smile-cheerful-hand-use-smartphone-ready-press-buy-button-with-shopping-mall-abstract-blur-background-technology-communication-ideas-concept_609648-525.jpg?t=st=1723063301~exp=1723066901~hmac=820448065fc7fe4795f3e9853063096c4b06f8c6fabf3993b06751c90081c681&w=1380"} alt="" />
                    <div className="space-y-5 mt-7 lg:mt-0">
                        <h2 className='text-4xl font-serif font-extrabold'>{userData?.name}</h2>
                        <p className='text-xl text-slate-200'>{userData?.email}</p>
                        <div className='flex gap-3'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} onMouseMove={() => setUserRating(star)} className="w-4 cursor-pointer" viewBox="0 0 24 24" fill="#94a3b8" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                        fill={star <= userRating ? '#f2b00a' : '#94a3b8'}
                                    />
                                </svg>
                            ))}
                            <h2 className='text-md text-yellow-500'>4.5/5</h2>
                        </div>

                    </div>
                </div>
                <div className='mt-7 lg:mt-0 flex flex-col gap-5 w-[45%] font-bold text-xl mx-auto text-center'>
                    <Link to={`/dashboard/chat/${id}`} className="bg-primary w-full p-3 text-white rounded">
                        Message Now
                    </Link>
                    <button className="bg-primary w-full p-3 text-white rounded">
                        Audio call
                    </button>
                    <button onClick={startVideoCallWithRoom} className="bg-primary w-full p-3 text-white rounded">
                        Video call
                    </button>
                </div>
            </section>

            <section className='text-white'>

                <h1 className='bg-white h-[0.5px] w-full my-[5rem]' />

                <h1 className='text-3xl font-xl mt-3 font-bold'>About {userData?.name}</h1>
                <p className='text-lg  mt-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h1 className='bg-white h-[0.5px] w-full my-[5rem]' />
            </section>
            <div className='bg-secondary  py-[2rem] container mx-auto'>
                <h2 className='text-3xl font-bold text-white my-2'>You Might Also Like </h2>
                {loading && <LoaderData />}
                <div className=" container grid grid-cols-2 md:gird-cols-3 lg:grid-cols-5  gap-7" >

                    {
                        allUserData?.data?.filter(userN => userN?.id !== id)
                            .map(user => <UserCard key={user.id} user={user} />)
                    }

                </div>
            </div>

        </div>
    );
};

export default SingleUser;