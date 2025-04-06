import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

export const AuthLayout = () => {
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
