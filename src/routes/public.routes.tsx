import { RouteObject } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddBookPage from "../pages/AddBookPage";
import EditBookPage from "../pages/EditBookPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/add",
    element: <AddBookPage />,
  },
  {
    path: "/edit/:id",
    element: <EditBookPage />,
  },
];

export default routes;
