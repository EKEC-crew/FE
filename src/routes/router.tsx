// src/router/router.tsx
import { createBrowserRouter } from "react-router-dom";

import AuthRouter from "./authRouter";

import RootLayout from "../layout/rootLayout";
import NotFoundPage from "../pages/404";
import Main from "../pages/homePage";

import MyPage from "../pages/myPage";
import SchedulePage from "../pages/myPage/SchedulePage";
import EditProfilePage from "../pages/myPage/EditProfilePage";
import AppliedCrewPage from "../pages/myPage/AppliedCrewPage";
import CreatedCrewPage from "../pages/myPage/CreatedCrewPage";
import AlarmPage from "../pages/myPage/AlarmPage";

import CrewCreatePage from "../pages/crewCreatePage";
import CrewFilterPage from "../pages/crewFilterPage";
import CrewListPage from "../pages/crewListPage";

import SearchPage from "../pages/searchPage";

import Detail from "../pages/detail";
import Schedule from "../pages/detail/schedule";
import ScheduleDetail from "../pages/detail/schedule/ScheduleDetail";
import PostScheduleForm from "../components/detail/Schedule/PostForm/PostScheduleForm";

import NoticeList from "../pages/detail/tabs/noticeList";
import PostNoticeForm from "../components/detail/notice/PostForm/PostNoticeForm";
import NoticeDetail from "../components/detail/notice/detail/NoticeDetail";
import EditNoticeForm from "../components/detail/notice/detail/edit/EditNoticeForm";

import ReviewPage from "../pages/detail/review";
import CrewMemberListPage from "../pages/detail/crewMemberList";
import ApplicantsListPage from "../pages/detail/applicants";

import Bulletin from "../pages/detail/bulletin";
import BulletinDetail from "../components/detail/bulletin/detail/BulletinDetail";
import PostBulletinForm from "../components/detail/bulletin/PostForm/PostBulletinForm";

import ApplyPage from "../pages/apply";
import ApplicationDetailPage from "../pages/apply/ApplicationDetailPage";
import ProtectedRoute from "./protectedRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Main /> },

      /* ---------- 공개 라우트 ---------- */
      { path: "searchPage", element: <SearchPage /> },
      { path: "crewFilterPage", element: <CrewFilterPage /> },
      { path: "crewListPage", element: <CrewListPage /> },

      /* ---------- 로그인 필수 라우트 ---------- */
      {
        element: <ProtectedRoute />, // 로그인 검증 필수!!
        children: [
          {
            path: "myPage",
            element: <MyPage />,
            children: [
              { index: true, element: <SchedulePage /> },
              { path: "edit-profile", element: <EditProfilePage /> },
              { path: "applied-crews", element: <AppliedCrewPage /> },
              { path: "created-crews", element: <CreatedCrewPage /> },
              { path: "my-alarm", element: <AlarmPage /> },
            ],
          },
          { path: "crewCreatePage", element: <CrewCreatePage /> },

          // 로그인 검증 필요한 주소는 이쪽에 넣어줍쇼 -동열-
        ],
      },

      /* ---------- 크루 상세 (대부분 공개) ---------- */
      {
        path: "crew/:crewId",
        children: [
          { index: true, element: <Detail /> },
          { path: "edit-intro", element: <Detail /> },
          { path: "schedule", element: <Schedule /> },
          { path: "schedule/:id", element: <ScheduleDetail /> },
          { path: "schedule/post", element: <PostScheduleForm /> },
          { path: "schedule/:id/edit", element: <PostScheduleForm /> },

          {
            path: "notice",
            children: [
              { index: true, element: <NoticeList /> },
              { path: "post", element: <PostNoticeForm /> }, // 보호 필요 시 이동
              { path: ":noticeId", element: <NoticeDetail /> },
              { path: ":noticeId/edit", element: <EditNoticeForm /> },
            ],
          },

          { path: "review", element: <ReviewPage /> },
          { path: "crewmemberlist", element: <CrewMemberListPage /> },
          { path: "applicants", element: <ApplicantsListPage /> },

          { path: "bulletin", element: <Bulletin /> },
          { path: "bulletin/:id", element: <BulletinDetail /> },
          { path: "bulletin/post", element: <PostBulletinForm /> },
          { path: "bulletin/:id/edit", element: <PostBulletinForm /> },

          { path: "apply", element: <ApplyPage /> },
          { path: "apply/:applyId", element: <ApplicationDetailPage /> },
        ],
      },
    ],
  },

  /* ---------- 인증 전용(공개) 라우트 ---------- */
  ...AuthRouter,
]);

export default router;
