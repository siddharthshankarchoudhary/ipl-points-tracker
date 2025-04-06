import React, { lazy, Suspense } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { Path } from "./Path";
import { useUser } from "@clerk/clerk-react";
import { User } from "../TypeDefinition/User";

const HomeLayout = lazy(() =>
  import("../layout/HomeLayout").then((component) => ({
    default: component.HomeLayout,
  })),
);

const AuthLayout = lazy(() =>
  import("../layout/AuthLayout").then((component) => ({
    default: component.AuthLayout,
  })),
);

const RoomsPage = lazy(() =>
  import("../pages/RoomsPage").then((component) => ({
    default: component.RoomsPage,
  })),
);

const Profile = lazy(() =>
  import("../pages/Profile").then((component) => ({
    default: component.Profile,
  })),
);

const NotFound = lazy(() =>
  import("../pages/NotFound").then((component) => ({
    default: component.NotFound,
  })),
);

const AuthPage = lazy(() =>
  import("../pages/AuthPage").then((component) => ({
    default: component.AuthPage,
  })),
);

const appRoutes = (user: User): RouteObject[] => {
  return [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense>
              <RoomsPage {...user} />
            </Suspense>
          ),
        },
        {
          path: Path.Dashboard,
          element: (
            <Suspense>
              <RoomsPage {...user} />
            </Suspense>
          ),
        },
        {
          path: Path.Profile,
          element: (
            <Suspense>
              <Profile {...user} />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          ),
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
          element: (
            <Suspense>
              <AuthPage pagePath={Path.SignIn} />
            </Suspense>
          ),
        },
        {
          path: Path.SignUp,
          element: (
            <Suspense>
              <AuthPage pagePath={Path.SignUp} />
            </Suspense>
          ),
        },
        {
          path: "/",
          element: (
            <Suspense>
              <AuthPage pagePath={Path.SignIn} />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ];
};

export const Router = (): React.ReactElement | null => {
  const { isSignedIn, isLoaded, user } = useUser();

  let userObject: User | undefined;
  if (user) {
    userObject = {
      createdAt: user.createdAt,
      emailAddress: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      id: user.id,
      imageUrl: user.imageUrl,
      lastName: user.lastName,
      updatedAt: user.updatedAt,
      username: user.username,
      fullName: user.fullName,
    };
  }

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return useRoutes(authRoutes());
  } else if (userObject) {
    return useRoutes(appRoutes(userObject));
  } else {
    return null;
  }
};
