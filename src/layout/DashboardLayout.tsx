import SidebarDash from '@/components/dashboard/SidebarDash'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
    return (
        <React.Fragment>


            <>
                {/* component */}
                <div className="flex h-screen overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4 hidden lg:flex">
                        <SidebarDash />
                    </div>
                    {/* Main Chat Area */}
                    <Outlet />
                </div>
            </>

        </React.Fragment>
    )
}
