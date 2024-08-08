import React, {

    useState
} from 'react'
import SidebarDash from '../SidebarDash'
import { IoMenuSharp, IoCloseCircleOutline } from 'react-icons/io5'
// import { FaVideo } from 'react-icons/fa'
import { IUserDataType } from '@/type/dataType/user.data';


export default function ChatHeaderSection({ user, receiverId }: {
    user: IUserDataType | undefined, receiverId: string
}) {
    // const { startVideoCallNow } = useContext(RoomContext)

    // const { } = useContext(RoomContext)

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);


    // console.log(data)
    const handleClick = () => {
        console.log(receiverId)
        setIsMenuOpen(!isMenuOpen);
    };
    // const handleVideoCall =async () => {
    //     if(!user?.id || !receiverId ) {
    //         console.log("user id or receiver id not found")
    //         return
    //     }
    // //    await startVideoCallNow(user?.id, receiverId, user?.name)
    // }

    return (
        <React.Fragment>
            <header className="bg-primary p-4 text-white flex justify-between">
                <h1 className="text-2xl font-semibold">{user?.name ?? "UserName"}</h1>
                {/* audio and video button by react-icons */}
                <div className="flex space-x-4">

                    <button onClick={handleClick} className={`text-4xl ms-2 text-black rounded-full flex lg:hidden  focus:outline-none`}>

                        <IoMenuSharp className='text-white' />
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
                    className="lg:hidden fixed top-3 right-4 z-[100] rounded-full bg-white text-5xl"
                >
                    <IoCloseCircleOutline />
                </button>
                <div className="flex lg:hidden">
                    <SidebarDash />
                </div>
            </div>
        </React.Fragment>
    )
}
