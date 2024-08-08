// import StartLive from "@/pages/dashboard/start/StartLive";

import ChatPage from "@/pages/chat/ChatPage";
import AudioCallPage from "@/pages/dashboard/audio/AudioCallPage";


export const DashboardRouterPath = [
    {
        path: "audio/:id",
        element: <AudioCallPage />
    },
    {
        path: "chat/:id",
        element: <ChatPage />
    },
]