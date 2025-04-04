import { useUser } from "@clerk/clerk-react";
import {
  Typography,
  Paper,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const Profile = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Your Profile
      </Typography>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Avatar
              src={user.imageUrl}
              alt={`${user.firstName} ${user.lastName}`}
              sx={{ width: 128, height: 128 }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {user.emailAddresses[0].emailAddress}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <List disablePadding>
              <ListItem disableGutters>
                <ListItemText
                  primary="User ID"
                  secondary={user.id}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="Created"
                  secondary={new Date(
                    user.createdAt ?? "",
                  ).toLocaleDateString()}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="Last Updated"
                  secondary={new Date(
                    user.updatedAt ?? "",
                  ).toLocaleDateString()}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
