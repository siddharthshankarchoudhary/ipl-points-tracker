import { Link as RouterLink } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#dce3ea", boxShadow: "none" }}
    >
      <Container sx={{ minWidth: "100%" }}>
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", py: 1.5 }}
        >
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="/RunsAndRivalryLogo.png"
              alt="Logo"
              sx={{
                height: 40,
                width: 40,
                mr: 1,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#333",
                letterSpacing: 1,
              }}
            >
              Runs & Rivalry
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <>
              <Button
                component={RouterLink}
                to="/dashboard"
                sx={{
                  color: "#333",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                }}
              >
                Dashboard
              </Button>
              <Button
                component={RouterLink}
                to="/profile"
                sx={{
                  color: "#333",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                }}
              >
                Profile
              </Button>

              <Box sx={{ ml: isMobile ? 0 : 2 }}>
                <UserButton />
              </Box>
            </>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
