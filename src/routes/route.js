import { createBrowserRouter } from "react-router-dom";
import Beranda from "../scenes/Beranda";
import Detail from "../scenes/Detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Beranda />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
]);
