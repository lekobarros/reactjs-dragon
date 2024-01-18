import { createBrowserRouter } from "react-router-dom";

// Layout
import Layout from '@/components/Layout';

// Routes
import Home from "@/pages";
import Login from "@/pages/login";
// Register

import Dragons from "@/pages/dragons";
import DragonsView from "@/pages/dragons/view";
import DragonsManager from "@/pages/dragons/manager";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dragons",
        element: <Dragons />,
      },
      {
        path: "/dragons/view/:id",
        element: <DragonsView />,
      },
      {
        path: "/dragons/manager/:id",
        element: <DragonsManager />,
      },
    ]
  },
]);

export default router;
