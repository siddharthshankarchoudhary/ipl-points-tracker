import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { HomeLayout } from "../layout/HomeLayout";
import { RootPage } from "../pages/RootPage";

const getApplicationRoutes = (): RouteObject[] => {
  return [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <RootPage />,
        },
      ],
    },
  ];
};

export const Router = (): React.ReactElement | null => {
  return useRoutes([]);
};
