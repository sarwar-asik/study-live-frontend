import SidebarDash from '@/components/dashboard/SidebarDash';
import  { useState } from 'react'
// import { Link } from 'react-router-dom';

export default function ChatPage() {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    // console.log(data)
    const handleClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex-1">
            {/* Chat Header */}
            <header className="bg-white p-4 text-gray-700 flex justify-between">
                <h1 className="text-2xl font-semibold">Alice</h1>

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
            </header>

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

            {/* Chat Messages */}
            <div className="h-screen overflow-y-auto p-4 pb-36">
                {/* Incoming Message */}
                <div className="flex mb-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                        <img
                            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                    <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                        <p className="text-gray-700">Hey Bob, how's it going?</p>
                    </div>
                </div>
                {/* Outgoing Message */}
                <div className="flex justify-end mb-4 cursor-pointer">
                    <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                        <p>
                            Hi Alice! I'm good, just finished a great book. How about you?
                        </p>
                    </div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                        <img
                            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                            alt="My Avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    </div>
                </div>
            </div>
            {/* Chat Input */}
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full lg:w-3/4">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                        Send
                    </button>
                </div>
            </footer>
        </div>
    )
}
