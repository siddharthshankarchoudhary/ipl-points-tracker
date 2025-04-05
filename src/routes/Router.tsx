import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import GameScoreChart from "../components/LineChart";
import { Path } from "./Path";
import Profile from "../pages/Profile";
import { useUser } from "@clerk/clerk-react";
import AuthLayout from "../layout/AuthLayout";
import { AuthPage } from "../pages/AuthPage";
import NotFound from "../pages/NotFound";

const appRoutes = (): RouteObject[] => {
  return [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <GameScoreChart />,
        },
        {
          path: Path.Dashboard,
          element: <GameScoreChart />,
        },
        {
          path: Path.Profile,
          element: <Profile />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];
};

const authRoutes = (): RouteObject[] => {
  return [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: `${Path.SignIn}/*`,
          element: <AuthPage pagePath={Path.SignIn} />,
        },
        {
          path: `${Path.SignUp}/*`,
          element: <AuthPage pagePath={Path.SignUp} />,
        },
        {
          path: Path.SignIn, 
          element: <AuthPage pagePath={Path.SignIn} />,
        },
        {
          path: Path.SignUp,
          element: <AuthPage pagePath={Path.SignUp} />,
        },
        {
          path: "#/sso-callback",
          element: <AuthPage pagePath={Path.SignIn} />,
        },
        {
          path: "sign-up#/continue",
          element: <AuthPage pagePath={Path.SignUp} />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];
};

export const Router = (): React.ReactElement | null => {
  const { isSignedIn, isLoaded } = useUser();
  
  if (!isLoaded) {
    return null;  
  }
  
  if (!isSignedIn) {
    return useRoutes(authRoutes());
  } else {
    return useRoutes(appRoutes());
  }
};
