import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/error/NotFound.tsx";
import MainLayout from "@/layout/MainLayout.tsx";
import { MainRouterPath } from "./MainRouterPath";
import DashboardLayout from "@/layout/DashboardLayout";
import { DashboardRouterPath } from "./DashboardRouterPath";
import PrivateRoute from "./PrivateRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: MainRouterPath
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: DashboardRouterPath
  }
]);

export default router;
