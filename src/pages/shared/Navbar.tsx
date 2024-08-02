/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthContext from '@/context/AuthProvider';
import { logoutHandler } from '@/helper/authHelper';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { user, refreshUser } = useContext(AuthContext)

  // console.log(data)

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutHandle = () => {
    logoutHandler()
    refreshUser()
  }

  const { pathname } = useLocation()


  // console.log(user)


  // console.log(pathname)
  const navItems: {
    name: string;
    link: string;
    active: boolean;
  }[] = [
      { name: 'Home', link: '/', active: pathname === '/' },
      { name: 'Pricing', link: '/pricing', active: pathname === '/pricing' },
      { name: 'About', link: '/', active: pathname === '/about' },

    ];

  if (user?.email) {
    navItems.push({ name: 'Start', link: '/dashboard/chat/1', active: pathname === '/landing' },)
  }

  return (
    <header className="shadow-md font-sans tracking-wide relative z-50">
      {/* <section className="py-2 bg-primary text-white text-right px-10">
        <p className="text-sm">
          <strong className="mx-3">Address:</strong> SWF New York 185669
          <strong className="mx-3">Contact No:</strong> 1800333665
        </p>
      </section> */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-10 py-4 bg-white min-h-[70px]">
        <Link to="/">
          <img
            src="logo.png"
            alt="logo"
            className="w-[4rem] h-[3rem]"
          />
        </Link>
        <div
          id="collapseMenu"
          className={`${isMenuOpen ? 'block' : 'hidden'
            } lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 `}
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
          <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 z-50">
            <li className="mb-6 hidden max-lg:block">
              <Link to="/">
                <img
                  src="logo.png"
                  alt="logo"
                  className="w-[6rem] h-[4rem]"
                />
              </Link>
            </li>

            {navItems.map((item) => (
              <li key={item?.name} className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to={item?.link}
                  className={`hover:text-[#007bff] block font-bold text-[15px] ${item?.active ? 'text-[#007bff]' : 'text-[#333]'}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {
              user?.email ? <button
                onClick={() => { logoutHandle() }}
                className='text-red-500 hover:text-red-400 block font-bold text-[15px] lg:hidden '>

                logout
              </button> :

                <div className='lg:hidden'>
                  <li className="max-lg:border-b max-lg:py-3 px-3 ">
                    <Link
                      to={'/sign-up'}
                      className={`hover:text-[#007bff] block font-bold text-[15px] text-[#333]`}
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="max-lg:border-b max-lg:py-3 px-3 lg:hidden">
                    <Link
                      to={'/login'}
                      className={`hover:text-[#007bff] block font-bold text-[15px] text-[#333]`}
                    >
                      Login
                    </Link>
                  </li></div>
            }
          </ul>

        </div>

        <div className="flex max-lg:ml-auto">
          <button id="toggleOpen" onClick={handleClick} className="lg:hidden">
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

        {
          user?.email ? <button onClick={() => {
            logoutHandle();

          }} className='text-red-500 hover:text-red-400  font-bold text-[15px] hidden lg:flex'>

            logout
          </button> :

            <div className='lg:gap-x-5 max-lg:space-y-3 z-50  hidden lg:flex'>
              <Link className="hover:text-[#007bff] text-[#333] font-bold text-[15px] max-lg:border-b max-lg:py-3 px-3" to="/sign-up">Sign up</Link>
              <Link className="hover:text-[#007bff] text-[#333] font-bold text-[15px] max-lg:border-b max-lg:py-3 px-3" to="/login">Login</Link>
            </div>
        }

      </div>
    </header>
  );
};

export default Navbar;
