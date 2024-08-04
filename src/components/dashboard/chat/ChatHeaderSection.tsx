import React, { useState } from 'react'
import SidebarDash from '../SidebarDash'
import { IoCallOutline } from 'react-icons/io5'
import { FaVideo } from 'react-icons/fa'
import { IUserDataType } from '@/type/dataType/user.data';

export default function ChatHeaderSection({ user, handleStartCall }: {
    user: IUserDataType | undefined, handleStartCall: () => void
}) {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);


    // console.log(data)
    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <React.Fragment>
            <header className="bg-slate-100 p-4 text-gray-700 flex justify-between">
                <h1 className="text-2xl font-semibold">{user?.name ?? "UserName"}</h1>
                {/* audio and video button by react-icons */}
                <div className="flex space-x-4">

                    <button className="rounded-full text-2xl bg-primary hover:bg-primary/80 w-[3rem] text-white p-3 "><IoCallOutline />
                    </button>
                    <button onClick={handleStartCall} className="p-3 bg-primary 
                        hover:bg-primary/80  text-white rounded-full  focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <FaVideo size={25} />
                    </button>




                    <button onClick={handleClick} id="toggleOpen" className="lg:hidden">
                        <svg
                            className="w-7 h-7"
                            fill="#000"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>



            </header>

            {/* modal menu section */}
            <div
                id="collapseMenu"
                className={`${isMenuOpen ? 'block lg:hidden' : 'hidden'
                    } lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-[80%] max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0  max-lg:h-full max-lg:shadow-md overflow-hidden z-50 `}
            >
                <button
                    id="toggleClose"
                    onClick={handleClick}
                    className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 fill-black"
                        viewBox="0 0 320.591 320.591"
                    >
                        <path
                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            data-original="#000000"
                        />
                        <path
                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            data-original="#000000"
                        />
                    </svg>
                </button>
                <div className="flex lg:hidden">
                    <SidebarDash />
                </div>
            </div>
        </React.Fragment>
    )
}
