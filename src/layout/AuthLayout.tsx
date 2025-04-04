import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

const AuthLayout = () => {
  return (
    <Stack
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
    >
      <Outlet />
    </Stack>
  );
};

export default AuthLayout;
