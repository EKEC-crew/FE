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
import ScheduleDetail from "../pages/detail/schedule/ScheduleDetail";
import ReviewPage from "../pages/detail/review/index";
import CrewListPage from "../pages/crewListPage";
import CrewFilterPage from "../pages/crewFilterPage";
import PostScheduleForm from "./../components/detail/Schedule/PostForm/PostScheduleForm";
import CrewCreatePage from "../pages/crewCreatePage";
import SchedulePage from "../pages/myPage/SchedulePage";
import EditProfilePage from "../pages/myPage/EditProfilePage";
import AppliedCrewPage from "../pages/myPage/AppliedCrewPage";
import CreatedCrewPage from "../pages/myPage/CreatedCrewPage";
import AlarmPage from "../pages/myPage/AlarmPage";
import PostNoticeForm from "../components/detail/notice/PostForm/PostNoticeForm";
import NoticeDetail from "../components/detail/notice/detail/NoticeDetail";

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
        element: <MyPage />,
        children: [
          {
            index: true,
            element: <SchedulePage />,
          },
          { path: "edit-profile", element: <EditProfilePage /> },
          { path: "applied-crews", element: <AppliedCrewPage /> },
          { path: "created-crews", element: <CreatedCrewPage /> },
          { path: "my-alarm", element: <AlarmPage /> },
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
        path: "crewCreatePage",
        children: [
          {
            index: true,
            element: <CrewCreatePage />,
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
            path: "schedule/post",
            element: <PostScheduleForm />,
          },
          {
            path: "notice/:id",
            element: <NoticeList />,
          },
          {
            path: "notice/:id/detail",
            element: <NoticeDetail />,
          },
          {
            path: "review",
            element: <ReviewPage />,
          },
          {
            path: "notice/post",
            element: <PostNoticeForm />,
          },
        ],
      },
    ],
  },
  ...AuthRouter,
]);
export default router;
