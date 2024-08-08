import SidebarDash from '@/components/dashboard/SidebarDash'
import AddPointsComponent from '@/components/shared/AddPointsComponent'
import AuthContext from '@/context/AuthProvider'
import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
    const {user} = useContext(AuthContext)
    return (
        <React.Fragment>


            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4 hidden lg:flex ">
                    <SidebarDash />
                </div>
                {/* Main Chat Area */}
                <div className="w-full lg:w-3/4">
                    {
                        user?.id && <AddPointsComponent user={user} />
                    }
                    <Outlet />
                </div>
               

            </div>
        </React.Fragment>
    )
}
