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
import RoomsListPage from "../pages/RoomsListPage";
import CreateRoomPage from "../pages/CreateRoomPage";
import JoinRoomPage from "../pages/JoinRoomPage";
import RoomDetailPage from "../pages/RoomDetailPage";

const appRoutes = (): RouteObject[] => {
  return [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <RoomsListPage />,
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
          path: Path.Rooms,
          element: <RoomsListPage />,
        },
        {
          path: Path.CreateRoom,
          element: <CreateRoomPage />,
        },
        {
          path: Path.JoinRoom,
          element: <JoinRoomPage />,
        },
        {
          path: Path.RoomDetail,
          element: <RoomDetailPage />,
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
      element: <AuthLayout />,
      children: [
        {
          path: Path.SignIn,
          element: <AuthPage pagePath={Path.SignIn} />,
        },
        {
          path: Path.SignUp,
          element: <AuthPage pagePath={Path.SignUp} />,
        },
        {
          path: "/",
          element: <AuthPage pagePath={Path.SignIn} />,
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
