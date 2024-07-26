import React from 'react'

export default function StateSection() {
    return (
        <React.Fragment><div className="bg-gray-50 p-8 min-h-[350px] flex items-center justify-center font-[sans-serif] text-[#333]">
            <div className="bg-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)] grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-24 gap-12 rounded-3xl px-20 py-10">
                <div className="text-center">
                    <h3 className="text-4xl font-extrabold">
                        5.4<span className="text-primary">M+</span>
                    </h3>
                    <p className="text-gray-500 font-semibold mt-3">Total Users</p>
                </div>
                <div className="text-center">
                    <h3 className="text-4xl font-extrabold">
                        $80<span className="text-primary">K</span>
                    </h3>
                    <p className="text-gray-500 font-semibold mt-3">Revenue</p>
                </div>
                <div className="text-center">
                    <h3 className="text-4xl font-extrabold">
                        100<span className="text-primary">K</span>
                    </h3>
                    <p className="text-gray-500 font-semibold mt-3">Engagement</p>
                </div>
                <div className="text-center">
                    <h3 className="text-4xl font-extrabold">
                        99.9<span className="text-primary">%</span>
                    </h3>
                    <p className="text-gray-500 font-semibold mt-3">Server Uptime</p>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}
