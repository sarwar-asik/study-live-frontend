import AuthContext from '@/context/AuthProvider'
import useFetchDataHook from '@/hooks/useFetchDataHook'
import LoaderData from '@/pages/shared/LoaderData'
import { IUserDataType } from '@/type/dataType/user.data'
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SidebarDash() {

    // const {user}= useContext(AuthContext)
    const location = useLocation()
    console.log(location)
    const chatStart = location.pathname?.indexOf('/chat') + 6; // +6 to move past '/chat/'
    const uuid = location.pathname?.slice(chatStart);


    console.log(uuid); // Output: baffe21f-1341-4738-9f30-8d8f3f3bec6d
    const { user } = useContext(AuthContext)
    const { data, error, loading } = useFetchDataHook<{ data: IUserDataType[] }>(`http://localhost:5001/api/v1/user`)
    // console.log(data)


    if (error) {
        console.log(error)
    }

    const userData = data?.data
    console.log(userData)

    return (
        <div className="bg-white border-r border-gray-300 min-w-[20rem]">
            {/* Sidebar Header */}
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                <Link to={`/`}>Home</Link>
                <h1 className="text-2xl font-semibold">{user?.name}</h1>

            </header>
            {/* Contact List */}
            <div className="overflow-y-auto h-screen p-3 mb-9 pb-20  ">

                {
                    loading && <LoaderData />
                }

                {
                    userData?.map((signleUser: IUserDataType) => {
                        if (signleUser.id !== user?.id) {
                            return <Link to={`/dashboard/chat/${signleUser?.id}`} key={signleUser.id} className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md ${signleUser.id === uuid ? "bg-gray-200 hover:bg-gray-400" : ""}`}>

                                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 ">
                                    <img
                                        src={
                                            signleUser?.img ? signleUser?.img : "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                        }
                                        alt="User Avatar"
                                        className="w-12 h-12 rounded-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold">{signleUser?.name ?? "User"}</h2>
                                    <p className="text-gray-600">
                                        That pizza place was amazing! We should go again sometime. 🍕
                                    </p>
                                </div>
                            </Link>
                        }
                    })
                }


            </div>
        </div>
    )
}
