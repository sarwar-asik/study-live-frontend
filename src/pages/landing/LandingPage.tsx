import BoxDropDownUI from '@/components/UI/DrpDownMeet'
import React from 'react'


export default function LandingPage() {

    return (
        <React.Fragment><section className="py-12 bg-white sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:items-center gap-y-8 md:grid-cols-2 md:gap-x-16">
                    <div className="text-center md:text-left lg:pr-16">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                            Video calls and meetings for everyone
                        </h2>
                        <p className="mt-4 text-base text-gray-700 sm:mt-8 font-pj">
                            Connect, collaborate, and celebrate from anywhere with Study Live video , live message streamming
                        </p>
                        <div className="relative inline-flex gap-5 mt-10 group">
                            <BoxDropDownUI />

                            <div className=" bg-white">
                                <input
                                    type="url"
                                    name=""
                                    id=""
                                    placeholder="Insert a Link"
                                    // defaultValue="Insert a Link"
                                    className="block w-full px-4 py-3 placeholder-gray-500 border-gray-300 border rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600 outline-none"
                                />
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
        </React.Fragment>
    )
}
