import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
    return (
        <React.Fragment>

            <Navbar />
            <div className="">
                <Outlet />
            </div>

            <Footer />
        </React.Fragment>
    )
}
