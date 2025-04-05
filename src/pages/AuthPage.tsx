import { SignIn, SignUp } from "@clerk/clerk-react";
import { Stack } from "@mui/material";
import React from "react";
import { Path } from "../routes/Path";

type AuthPageProps = {
  pagePath: Path.SignIn | Path.SignUp;
};

export const AuthPage = ({ pagePath }: AuthPageProps): React.ReactElement => {
  const appearance = {
    layout: {
      logoImageUrl: "RunsAndRivalryLogo.png",
    },
    elements: {
      logoBox: {
        padding: "40px",
      },
      logoImage: {
        height: "120px",
        width: "auto",
      },
    },
  };
  return (
    <Stack
      alignItems="center"
      height="100vh"
      width="100vw"
      overflow="auto"
      padding="40px"
    >
      {pagePath === Path.SignIn ? (
        <SignIn signUpUrl={Path.SignUp} appearance={appearance} />
      ) : (
        <SignUp signInUrl={Path.SignIn} appearance={appearance} />
      )}
    </Stack>
  );
};
