import { RoomContext } from "@/context/RoomProvider";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";



export default function MainLayout() {
    const { ws } = useContext(RoomContext);
    const navigate = useNavigate();
    useEffect(() => {
        ws.on("room-created", (data) => {
            console.log(data);
            navigate(`/video/${data.roomId}`)
            // window.location.href = `/video/${data.roomId}`
        });
        ws.on("room-created-b", (data) => {
            console.log(data);

            setTimeout(() => {
                // navigate(`/video/${data.roomId}`)
                window.location.href = `/video/${data.roomId}`
            }, 5000)

        });
    }, [ws])
    return (
        <React.Fragment>

            <Navbar />
            <div className="min-h-screen">
                <Outlet />
            </div>

            <Footer />
        </React.Fragment>
    )
}
