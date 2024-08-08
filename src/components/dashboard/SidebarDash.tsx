import AuthContext from '@/context/AuthProvider'
import LoaderData from '@/components/shared/LoaderData'
import { IUserDataType } from '@/type/dataType/user.data'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CiHome } from "react-icons/ci";
import { useGetAllUserQuery } from '@/redux/api/userApi.ts'

export default function SidebarDash() {

    const location = useLocation()

    const chatStart = location.pathname?.indexOf('/chat') + 6;
    const uuid = location.pathname?.slice(chatStart);


    const { user } = useContext(AuthContext)

    // console.log(data)
    const { data, isLoading } = useGetAllUserQuery(undefined)




    const userData = data?.data
    // console.log(userData)

    return (
        <div className="border-r border-gray-300 min-w-full">
            {/* Sidebar Header */}
            <header className="p-4 border-b bg-[#1E1B22] border-gray-300 flex justify-between items-center  text-white">
                <Link to={`/`}><CiHome className='text-2xl font-bold' /></Link>
                <h1 className="text-2xl font-semibold">{user?.name}</h1>

            </header>
            {/* Contact List */}
            <div className="overflow-y-auto bg-secondary h-screen p-3 mb-9 pb-20  ">

                {
                    isLoading && <LoaderData />
                }

                {
                    userData?.map((signleUser: IUserDataType) => {
                        if (signleUser.id !== user?.id) {
                            return <Link to={`/dashboard/chat/${signleUser?.id}`} key={signleUser.id} className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 border rounded-md ${signleUser.id === uuid ? "bg-gray-200 hover:bg-gray-300 text-primary " : "text-white hover:text-slate-700"} `}>

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
                                    <h2 className="text-lg font-semibold uppercase">{signleUser?.name ?? "User"}</h2>
                                    <p className={`${signleUser.id === uuid ? "text-slate-700 " : "text-slate-200 hover:text-slate-500"}`}>
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
