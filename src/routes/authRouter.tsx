import AuthLayout from "../layout/authLayout";
import SignInPage from "../pages/auth/signInPage/";
import EmailSignIn from "../pages/auth/signInPage/emailSignIn";
import GoogleSignIn from "../pages/auth/signInPage/googleSignIn";
import KakaoSignIn from "../pages/auth/signInPage/kakaoSignIn";
import NaverSignIn from "../pages/auth/signInPage/naverSignIn";
import SignUpPage from "../pages/auth/signUpPage";
import Complete from "../pages/auth/signUpPage/complete";
import Detail from "../pages/detail/index";
import Schedule from "../pages/detail/tabs/schedule";

const AuthRouter = [
  {
    path: "/signIn",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignInPage />,
      },
      {
        path: "email",
        element: <EmailSignIn />,
      },
      {
        path: "kakao",
        element: <KakaoSignIn />,
      },
      {
        path: "google",
        element: <GoogleSignIn />,
      },
      {
        path: "naver",
        element: <NaverSignIn />,
      },
    ],
  },
  {
    path: "/signUp",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignUpPage />,
      },
      {
        path: "completed",
        element: <Complete />,
      },
    ],
  },
];

export default AuthRouter;
