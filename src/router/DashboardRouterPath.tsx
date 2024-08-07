// import StartLive from "@/pages/dashboard/start/StartLive";

import ChatPage from "@/pages/chat/ChatPage";
import AudioCallPage from "@/pages/dashboard/audio/AudioCallPage";
import { Room } from "@/pages/dashboard/video/VideoCallPage";

export const DashboardRouterPath = [

    // {
    //     path: "video/:id",
    //     element: <Room />
    // },
    {
        path: "audio/:id",
        element: <AudioCallPage />
    },
    {
        path: "chat/:id",
        element: <ChatPage />
    },
]