import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import Home from "@/pages/home/Home";
import LandingPage from "@/pages/landing/LandingPage";
import PricingPage from "@/pages/pricing/PricingPage";
import PrivateRoute from "./PrivateRouter";
import TestWeb from "@/components/dashboard/Test";
import UsersPage from "@/pages/Users/UsersPage";
import SingleUser from "@/pages/Users/SingleUser";
import { VideoCallPage } from "@/pages/dashboard/video/VideoCallPage";
import AudioCallPage from "@/pages/dashboard/audio/AudioCallPage";


export const MainRouterPath = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/pricing",
        element: <PricingPage />
    },
    {
        path: "/test",
        element: <TestWeb />
    }, {
        path: "/users",
        element: <UsersPage />
    }, {
        path: "/user/:id",
        element: <SingleUser />
    },
    {
        path: "/video/:id",
        element: <PrivateRoute><VideoCallPage /></PrivateRoute>
    },
    {
        path: "/audio/:id",
        element: <PrivateRoute><AudioCallPage /></PrivateRoute>
    },
    {
        path: "/landing",
        element: <PrivateRoute><LandingPage /></PrivateRoute>
    },
]