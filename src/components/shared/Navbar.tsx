/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthContext from '@/context/AuthProvider';
// import { ChatContext } from '@/context/ChatContext';
import { logoutHandler } from '@/helper/authHelper';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BoxDropDownUI from '../UI/DrpDownMeet';
import { FaDollarSign } from 'react-icons/fa';
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { HiMenuAlt2, HiSearch, HiOutlineUser } from "react-icons/hi";
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { user, refreshUser } = useContext(AuthContext)
  // const { userAllData } = useContext(ChatContext)

  // console.log(data)
  // console.log(userAllData)

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
      { name: 'Users', link: '/users', active: pathname === '/users' },
    ];

  if (!user?.email) {
    navItems.push({ name: 'Login', link: '/login', active: pathname === '/login' }, {
      name: 'Signup', link: '/sign-up', active: pathname === '/sign-up'
    })
  }

  return (
    <header className="shadow-md font-sans tracking-wide relative z-50">
      <section className="py-2 bg-[#1E1B22] text-white text-right px-10 flex justify-between items-center flex-wrap">
        <Logo />
        <div className="relative w-1/3">
          <input
            id="pass"
            className="h-10 w-full rounded bg-transparent pl-10 outline-none ring-1 ring-zinc-400 dark:ring-gray-500  bg-white placeholder:text-slate-600 placeholder:font-serif"
            placeholder="Search by category or celebrity name"
            name="password"
            type="password"
          />
          <span className="absolute left-2 top-2">
            <HiSearch className='text-2xl text-black' />
          </span>
        </div>
        <div className="hidden lg:flex">
          {user.email && <BoxDropDownUI items={['Profile', 'Logout']} buttonMenu={<div className='flex items-center gap-2 font-bold' ><HiOutlineUser className='text-2xl' /> <span className='text-3xl'>{user?.name}</span></div>}
          />

          }
        </div>
      </section>
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 lg:px-5 py-4 bg-[#1E1B22] min-h-[70px]">
        <BoxDropDownUI items={['Profile', 'Logout']} buttonMenu={<div className='flex gap-2 font-bold' ><HiMenuAlt2 className='text-2xl' /> <span>Menu</span></div>} elementItem={<button
          onClick={() => { logoutHandle() }}
          className='text-red-500 hover:text-red-400 block font-bold text-[15px] lg:hidden '>

          logout
        </button>} />

        <div
          id="collapseMenu"
          className={`${isMenuOpen ? 'block' : 'hidden'
            } lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-slate-400  text-black max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50  `}
        >
          <button
            id="toggleClose"
            onClick={handleClick}
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
          >
            <IoClose className='text-2xl' />
          </button>
          <ul className="lg:flex lg:gap-x-5 max-lg:space-y-3 justify-between z-50">
            <li className="mb-6 hidden max-lg:block">
              <Link to="/">
                <Logo />
              </Link>
            </li>

            {navItems.map((item) => (
              <li key={item?.name} className="max-lg:border-b max-lg:py-3 px-3">
                <Link
                  to={item?.link}
                  className={`hover:text-primary block font-bold text-[15px] ${item?.active ? 'text-primary' : 'text-black lg:text-white'}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}


          </ul>

        </div>

        <div className="flex items-center justify-center gap-3 font-bold text-white text-2xl">
          <h2><FaDollarSign className='text-2xl text-white font-bold' /></h2>
          <h1> Total Points :</h1>
          <h2> {user?.points ?? 0}</h2>
        </div>
        <div className="flex max-lg:ml-auto">
          <button id="toggleOpen" onClick={handleClick} className="lg:hidden">
            <IoMenuSharp className='text-2xl text-white font-bold' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
