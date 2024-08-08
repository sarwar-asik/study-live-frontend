import { ReactElement, useEffect, useRef, useState } from 'react';

// import { RoomContext } from '@/context/VideoProvider';

export default function BoxDropDownUI({ items, buttonMenu, elementItem }: { items: string[], buttonMenu: ReactElement, elementItem?: ReactElement }) {
    const [open, setOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);


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





    return (
        <div ref={dropDownRef} className="relative  w-fit text-white  flex items-center justify-center">
            <button onClick={() => setOpen((prev) => !prev)} className="">{buttonMenu}</button>
            <ul className={`${open ? 'visible' : 'invisible'} absolute top-12 z-50 w-full space-y-1 mt-1 cursor-pointer text-center capitalize min-w-fit bg-white `}>
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        onClick={() => setOpen(false)}
                        className={`rounded-sm bg-primary p-2 ${open ? 'opacity-100 duration-500' : 'opacity-0 duration-150'} hover:bg-primary/80 text-nowrap px-3`}
                        style={{ transform: `translateY(${open ? 0 : (idx + 1) * 10}px)cursor-pointer mx-auto` }}
                    >
                        {item}
                    </li>
                ))}
                {
                    elementItem
                }
            </ul>
        </div>
    );
}
