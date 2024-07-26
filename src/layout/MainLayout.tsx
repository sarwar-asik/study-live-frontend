import React from "react";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
    return (
        <React.Fragment>

            <div>Navbar</div>
            <div className="">
                <Outlet />
            </div>

            <div>Footer</div>
        </React.Fragment>
    )
}
