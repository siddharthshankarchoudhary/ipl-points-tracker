import { useUser } from "@clerk/clerk-react";
import { Typography, Paper, Box, Button } from "@mui/material";
import {
  BarChart as BarChartIcon,
  AccountCircle as AccountIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          fontWeight="medium"
        >
          Welcome back, {user?.firstName || "User"}!
        </Typography>

        <Typography variant="body1" paragraph>
          This is your protected dashboard. Only authenticated users can access
          this page.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<BarChartIcon />}
              fullWidth
              sx={{ p: 2, justifyContent: "flex-start" }}
            >
              View Analytics
            </Button>
            <Button
              variant="outlined"
              startIcon={<AccountIcon />}
              fullWidth
              sx={{ p: 2, justifyContent: "flex-start" }}
            >
              Manage Account
            </Button>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              fullWidth
              sx={{ p: 2, justifyContent: "flex-start" }}
            >
              Settings
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
