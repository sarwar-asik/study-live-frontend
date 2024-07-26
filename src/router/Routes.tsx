import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/error/NotFound.tsx";
import MainLayout from "@/layout/MainLayout.tsx";
import { MainRouterPath } from "./MainRouterPath";

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
]);

export default router;
