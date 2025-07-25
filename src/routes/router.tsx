import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import MyPage from "../pages/myPage";
import NotFoundPage from "../pages/404";
import Main from "../pages/homePage";
import AuthRouter from "./authRouter";
import CrewPage from "../pages/crewPage";
import SearchPage from "../pages/searchPage";
import Detail from "../pages/detail";
import Schedule from "../pages/detail/schedule";
import NoticeList from "../pages/detail/tabs/noticeList";
import ScheduleDetail from "../pages/detail/schedule/scheduleDetail";
import ReviewPage from "../pages/detail/review/index";
import CrewListPage from "../pages/crewListPage";
import CrewFilterPage from "../pages/crewFilterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "crewPage",
        children: [
          {
            index: true,
            element: <CrewPage />,
          },
        ],
      },
      {
        path: "searchPage",
        children: [
          {
            index: true,
            element: <SearchPage />,
          },
        ],
      },
      {
        path: "myPage",
        children: [
          {
            index: true,
            element: <MyPage />,
          },
        ],
      },
      {
        path: "crewFilterPage",
        children: [
          {
            index: true,
            element: <CrewFilterPage />,
          },
        ],
      },
      {
        path: "crewListPage",
        children: [
          {
            index: true,
            element: <CrewListPage />,
          },
        ],
      },
      {
        path: "detail",
        children: [
          {
            index: true,
            element: <Detail />,
          },
          {
            path: "schedule",
            element: <Schedule />,
          },
          {
            path: "schedule/:id",
            element: <ScheduleDetail />,
          },
          {
            path: "notice/:id",
            element: <NoticeList />,
          },
          {
            path: "review",
            element: <ReviewPage />,
          },
        ],
      },
    ],
  },

  ...AuthRouter,
]);
export default router;
