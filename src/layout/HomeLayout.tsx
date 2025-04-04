import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Header } from "../components/Header";

const HomeLayout = () => {
  return (
    <ProtectedRoute>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </ProtectedRoute>
  );
};

export default HomeLayout;
