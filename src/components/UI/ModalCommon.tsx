/* eslint-disable @typescript-eslint/no-explicit-any */


import React from 'react'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ModalCommon({ children }: { children: React.ReactElement<any> }) {


    return (
        <React.Fragment>
            <div className="mx-auto w-fit">
                <div className={`fixed z-[100] visible opacity-100 inset-0 grid place-items-center bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent min-w`}>
                    <div onClick={(e_) => e_.stopPropagation()} className={`absolute max-w-x rounded-lg  drop-shadow-lg dark:bg-zinc-900 dark:text-white opacity-1 duration-300  border border-[#7808B1]  mx-auto bg-[#393B4C] text-white my-2 font-semibold`}>

                        <section className='border-t-2 border-white text-center py-7 px-5'>

                            {children}
                        </section>

                    </div>
                </div>
            </div></React.Fragment>
    )
}

