import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/rootLayout";
import MyPage from "../pages/myPage";
import NotFoundPage from "../pages/404";
import Main from "../pages/homePage";
import AuthRouter from "./authRouter";
import SearchPage from "../pages/searchPage";
import Detail from "../pages/detail";
import Schedule from "../pages/detail/schedule";
import NoticeList from "../pages/detail/tabs/noticeList";
import PostNoticeForm from "../components/detail/notice/PostForm/PostNoticeForm";
import ScheduleDetail from "../pages/detail/schedule/ScheduleDetail";
import ReviewPage from "../pages/detail/review/index";
import CrewListPage from "../pages/crewListPage";
import CrewFilterPage from "../pages/crewFilterPage";
import PostScheduleForm from "../components/detail/Schedule/PostForm/PostScheduleForm";
import CrewCreatePage from "../pages/crewCreatePage";
import SchedulePage from "../pages/myPage/SchedulePage";
import EditProfilePage from "../pages/myPage/EditProfilePage";
import AppliedCrewPage from "../pages/myPage/AppliedCrewPage";
import CreatedCrewPage from "../pages/myPage/CreatedCrewPage";
import AlarmPage from "../pages/myPage/AlarmPage";
import CrewMemberListPage from "../pages/detail/crewMemberList";
import ApplicantsListPage from "../pages/detail/applicants";
import NoticeDetail from "../components/detail/notice/detail/NoticeDetail";
import Bulletin from "../pages/detail/bulletin";
import BulletinDetail from "../components/detail/bulletin/detail/BulletinDetail";
import PostBulletinForm from "../components/detail/bulletin/PostForm/PostBulletinForm";
import ApplyPage from "../pages/apply";
import ApplicationDetailPage from "../pages/apply/ApplicationDetailPage";
import EditNoticeForm from "../components/detail/notice/detail/edit/EditNoticeForm";

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
        path: "crew/:crewId",
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
            path: "schedule/:id/edit",
            element: <PostScheduleForm />,
          },
          {
            path: "notice",
            children: [
              {
                index: true,
                element: <NoticeList />,
              },
              {
                path: "post",
                element: <PostNoticeForm />,
              },
              {
                path: ":noticeId",
                element: <NoticeDetail />,
              },
              {
                path: ":noticeId/edit",
                element: <EditNoticeForm />,
              },
            ],
          },
          {
            path: "review",
            element: <ReviewPage />,
          },
          {
            path: "crewmemberlist",
            element: <CrewMemberListPage />,
          },
          {
            path: "applicants",
            element: <ApplicantsListPage />,
          },
          {
            path: "bulletin",
            element: <Bulletin />,
          },
          {
            path: "bulletin/:id",
            element: <BulletinDetail />,
          },
          {
            path: "bulletin/post",
            element: <PostBulletinForm />,
          },
          {
            path: "apply",
            element: <ApplyPage />,
          },
          {
            path: "apply/:applyId",
            element: <ApplicationDetailPage />,
          },
        ],
      },
    ],
  },
  ...AuthRouter,
]);
export default router;
