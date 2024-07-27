import React from 'react'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
    return (
        <React.Fragment>


            <div className="min-h-screen">
                <Outlet />
            </div>

        </React.Fragment>
    )
}
