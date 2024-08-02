// import Test from '@/components/dashboard/Test'
import BoxDropDownUI from '@/components/UI/DrpDownMeet'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export default function LandingPage() {

    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState("")

    // console.log(inputValue)

    const inputLength = 7

    const joinHandler = () => {
        console.log(inputValue)
        // console.log(inputValue.length)
        if (inputValue?.length > inputLength) {
            console.log(inputValue)
            navigate(`/dashboard/video/${inputValue}`)
        }
    }

    return (
        <React.Fragment>
            <section className="py-12 bg-white sm:py-16 lg:py-20">



                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:items-center gap-y-8 md:grid-cols-2 md:gap-x-16">
                        <div className="text-center md:text-left lg:pr-16">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                                Video calls and meetings for everyone
                            </h2>
                            <p className="mt-4 text-base text-gray-700 sm:mt-8 font-pj">
                                Connect, collaborate, and celebrate from anywhere with Study Live video , live message streamming
                            </p>
                            <div className="relative inline-flex flex-wrap gap-5 mt-10 group">
                                <BoxDropDownUI />

                                <div className=" bg-white flex gap-3">
                                    <input
                                        type="url"
                                        name=""
                                        id=""
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Insert a Link"
                                        // defaultValue="Insert a Link"
                                        className="block w-full px-4 py-3 placeholder-gray-500 border-gray-300 border rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600 outline-none"
                                    />
                                    <button onClick={joinHandler} disabled={inputValue?.length < inputLength ? true : false} className={`text-xl  font-semibold ${inputValue?.length > inputLength ? "text-black" : "text-slate-400"}`}>Join</button>
                                </div>


                            </div>
                        </div>
                        <div className='sm:mt-1 mt-[7rem]'>
                            <img
                                className="w-full mx-auto"
                                src="https://cdn.rareblocks.xyz/collection/clarity/images/features/2/illustration.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment >
    )
}
