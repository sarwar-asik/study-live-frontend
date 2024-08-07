import SidebarDash from '@/components/dashboard/SidebarDash'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
    return (
        <React.Fragment>


            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4 hidden lg:flex ">
                    <SidebarDash />
                </div>
                <div className="w-full lg:w-3/4">

                    <Outlet />
                </div>
                {/* Main Chat Area */}

            </div>
        </React.Fragment>
    )
}
