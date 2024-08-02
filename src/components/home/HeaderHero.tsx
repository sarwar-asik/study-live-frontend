import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderHero() {
    return (
        <React.Fragment>
            <div className="bg-white">

                <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                            <div>
                                <p className="text-base font-semibold tracking-wider text-primary uppercase">
                                    Study Live Streaming
                                </p>
                                <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                                    Video calls with anyone, anywhere
                                </h1>
                                <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                                    Stay connected and collaborate with friends, family, and colleagues no matter where you are.

                                </p>
                                <Link
                                    to="/dashboard/chat"
                                    title=""
                                    className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-primary rounded-full lg:mt-16 hover:bg-primary focus:bg-primary"
                                    role="button"
                                >
                                    Join Now
                                    <svg
                                        className="w-6 h-6 ml-8 -mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </Link>
                                <p className="mt-5 text-gray-600">
                                    Already created account?
                                    <Link
                                        to="/login"
                                        title=""
                                        className="text-black transition-all duration-200 hover:underline ms-2"
                                    >
                                        Log in
                                    </Link>
                                </p>
                            </div>
                            <div>
                                <img
                                    className="w-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </React.Fragment>
    )
}
