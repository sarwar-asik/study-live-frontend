import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import Home from "@/pages/home/HomePage";
import PricingPage from "@/pages/pricing/PricingPage";
import PrivateRoute from "./PrivateRouter";
import UsersPage from "@/pages/Users/UsersPage";
import SingleUser from "@/pages/Users/SingleUser";
import { VideoCallPage } from "@/pages/dashboard/video/VideoCallPage";
import AudioCallPage from "@/pages/dashboard/audio/AudioCallPage";
import VideoLivePage from "@/pages/liveKit/VideoLivePage";
import VideoModal from "@/components/shared/VideoModal";


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
        path: "/video-live",
        element: <PrivateRoute><VideoLivePage /></PrivateRoute>
    },
    {
        path: "/test",
        element: <VideoModal />
    },

]