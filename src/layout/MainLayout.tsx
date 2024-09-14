/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { useContext } from "react";
import { Outlet, } from "react-router-dom";
import AuthContext from "@/context/AuthProvider";
import AddPointsComponent from "@/components/shared/AddPointsComponent";
import MainCallHandler from "@/components/shared/MainCallHandler";



export default function MainLayout() {

    const { user } = useContext(AuthContext);
    // console.log(user)

    return (
        <React.Fragment>

            <Navbar />
            <div className="min-h-screen bg-secondary">


                {
                    user?.id && <AddPointsComponent user={user} />
                }
                {
                    user?.id && <MainCallHandler />
                }

                
                <Outlet />


            </div>

            <Footer />
        </React.Fragment>
    )
}
