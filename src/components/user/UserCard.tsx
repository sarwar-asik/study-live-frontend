/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa';
export default function UserCard({ user }: any) {
    const [userRating, setUserRating] = useState(1);
    return (
        <Link to={`/user/${user?.id}`} className="max-w-[350px]  rounded  bg-slate-100/70  shadow-md dark:bg-[#18181B]">
            {/* Card Image */}
            <div className='relative'>
                <img width={350} height={300} className="h-[300px] w-[350px]l bg-gray-400 rounded-t-lg"
                    src={user?.img ?? "https://img.freepik.com/free-photo/smart-casual-asian-happiness-male-wear-glasses-smile-cheerful-hand-use-smartphone-ready-press-buy-button-with-shopping-mall-abstract-blur-background-technology-communication-ideas-concept_609648-525.jpg?t=st=1723063301~exp=1723066901~hmac=820448065fc7fe4795f3e9853063096c4b06f8c6fabf3993b06751c90081c681&w=1380"} />
                <h1 className='flex items-center bg-primary hover:bg-purple-600 text-white absolute bottom-5 left-3 rounded px-3 py-1'>
                    <FaDollarSign />
                    <span>{user?.points ?? 10}</span>
                </h1>
            </div>
            {/* Card Heading */}


            <section className='px-5 py-9 bg-[#52545B] text-white flex flex-col gap-5 '>
                <div className="space-y-2 flex justify-between items-center">
                    <h2 className=" sm:text-lg md:text-xl dark:text-white/90 font-bold">{user?.name}</h2>
                    {/* rating  */}
                    <div className="flex space-x-1">
                        {[1, 2, 3,].map((star) => (
                            <svg key={star} onMouseMove={() => setUserRating(star)} className="w-4 cursor-pointer" viewBox="0 0 24 24" fill="#94a3b8" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                    fill={star <= userRating ? '#f2b00a' : '#94a3b8'}
                                />
                            </svg>
                        ))}
                        <span>8.3 k</span>
                    </div>
                </div>
                <p>{user?.email} is an actor</p>

            </section>
        </Link>
    );
}
