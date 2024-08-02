import React from 'react'

export default function SidebarDash() {
    return (
        <div className="bg-white border-r border-gray-300">
            {/* Sidebar Header */}
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                <h1 className="text-2xl font-semibold">Chat Web</h1>
            </header>
            {/* Contact List */}
            <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                        <img
                            src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                            alt="User Avatar"
                            className="w-12 h-12 rounded-full"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold">Martin</h2>
                        <p className="text-gray-600">
                            That pizza place was amazing! We should go again sometime. 🍕
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
