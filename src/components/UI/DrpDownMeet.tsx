import { useEffect, useRef, useState } from 'react';
import ModalCommon from './ModalCommon';
// import { RoomContext } from '@/context/RoomProvider';


export type IItem = "video" | "audio"
export default function BoxDropDownUI() {
    const [open, setOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);
    const items: IItem[] = ["audio", "video"];

    // const { enterRoom } = useContext(RoomContext)
    useEffect(() => {
        const close = (e: MouseEvent): void => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close)
    }, []);

    const [item, setItem] = useState<"video" | "audio" | null>(null)

    const [openModal, setOpenModal] = useState(false)

    // console.log(item)
    const points = item === "audio" ? 3 : 5

    return (
        <div ref={dropDownRef} className="relative mx-auto w-fit text-white">
            <button onClick={() => { setOpen((prev) => !prev) }} className='p-5 bg-primary text-white font-semibold rounded border border-primary h-[3rem] py-2 text-nowrap'>New Meeting +</button>
            <ul className={`${open ? 'visible' : 'invisible'} absolute top-12 z-50 w-full space-y-1 mt-3 cursor-pointer text-center capitalize `}>
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        onClick={() => {
                            setOpen(false)
                            setOpenModal(true)
                            setItem(item)
                        }}
                        className={`rounded-sm bg-sky-400 p-2 ${open ? 'opacity-100 duration-500' : 'opacity-0 duration-150'} hover:bg-sky-500`}
                        style={{ transform: `translateY(${open ? 0 : (idx + 1) * 10}px)cursor-pointer mx-auto` }}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            {
                item && <ModalCommon openModal={openModal} setOpenModal={setOpenModal} type={item} points={points} onClick={() => setOpenModal(false)} />
            }
        </div>
    );
}
