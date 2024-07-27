import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/error/NotFound.tsx";
import MainLayout from "@/layout/MainLayout.tsx";
import { MainRouterPath } from "./MainRouterPath";
import DashboardLayout from "@/layout/DashboardLayout";
import { DashboardRouterPath } from "./DashboardRouterPath";

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
    element: <DashboardLayout />,
    children: DashboardRouterPath
  }
]);

export default router;
