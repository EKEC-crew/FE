import React from "react";
import AuthLayout from "../layout/authLayout";
import SignInPage from "../pages/auth/signInPage";
import SignUpPage from "../pages/auth/signUpPage";
import Complete from "../pages/auth/signUpPage/complete";
import Detail from "../pages/detail";

const AuthRouter = [
  {
    path: "/signIn",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignInPage />,
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
  {
    path: "/detail",
    element: <Detail />,
  },
];

export default AuthRouter;
