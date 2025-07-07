import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import MyPage from "../pages/myPage";
import NotFoundPage from "../pages/404";
import Main from "../pages/homPage";
import AuthRouter from "./authRouter";
import CrewPage from "../pages/crewPage";
import SearchPage from "../pages/searchPage";
import CrewListPage from "../pages/crewListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        path: "home",
        element: <Main />,
      },
      {
        path: "crewPage",
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <CrewPage />,
          },
        ],
      },
      {
        path: "searchPage",
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <SearchPage />,
          },
        ],
      },
      {
        path: "myPage",
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <MyPage />,
          },
        ],
      },
      {
        path: "crewListPage",
        errorElement: <NotFoundPage />,
        children: [
          {
            index: true,
            element: <CrewListPage />,
          },
        ],
      },
    ],
  },

  ...AuthRouter,
]);
export default router;
