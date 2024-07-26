import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import Home from "@/pages/home/Home";
import PricingPage from "@/pages/pricing/PricingPage";

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
]