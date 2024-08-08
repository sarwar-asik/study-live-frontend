import { RoomContext } from '@/context/VideoProvider'

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ModalCommon({ type, points, openModal, setOpenModal }: { type: "video" | "audio" | null, points: number, openModal: boolean, setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) {


    const { roomId, } = useContext(RoomContext)

    // console.log(enterRoom())
    // console.log(roomId)

    const navigate = useNavigate()


    const callHandler = () => {

        if (type === "video") {
            if (roomId !== "") {
                navigate(`/dashboard/video/${roomId}`)
                setOpenModal(false)
            }
        }
        else {
            navigate(`/dashboard/audio/${roomId}`)
            setOpenModal(false)
        }
    }
    return (
        <React.Fragment>

            <div className="mx-auto w-fit">

                <div onClick={() => setOpenModal(false)} className={`fixed z-[100] ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
                    <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-w-xl rounded-lg  drop-shadow-lg dark:bg-zinc-900 dark:text-white ${openModal ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'} rounded border border-[#7808B1] max-w-6xl mx-auto bg-[#393B4C] text-white my-2 font-semibold`}>
                        <div className='flex justify-between py-9 px-7 text-xl'>
                            <h1>Request For {type} Call</h1>
                            <button onClick={() => setOpenModal(false)} className='rounded-full py-[2px] text-sm px-1 border border-red-500 '>&#x274c;</button>
                        </div>
                        <section className='border-t-2 border-white text-center py-7 px-5'>
                            <h1 className='text-2xl '>Per-minute {type} call deducts {points} points</h1>
                            <button onClick={() => callHandler()} className='text-lg font-serif py-2 px-5 text-nowrap rounded bg-[#7808B1] my-7'>Call Now </button>
                        </section>

                    </div>
                </div>
            </div></React.Fragment>
    )
}

