// import StartLive from "@/pages/dashboard/start/StartLive";
import AudioCallPage from "@/pages/dashboard/audio/AudioCallPage";
import VideoCallPage from "@/pages/dashboard/video/VideoCallPage";

export const DashboardRouterPath = [

    {
        path: "video/:id",
        element: <VideoCallPage />
    },
    {
        path: "audio/:id",
        element: <AudioCallPage />
    },
]