import { Link as RouterLink } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography
        variant="h1"
        component="h1"
        sx={{ fontSize: "6rem", fontWeight: "bold", mb: 2 }}
      >
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: "md", mx: "auto", mb: 4 }}
      >
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button component={RouterLink} to="/" variant="outlined" color="inherit">
        Return Home
      </Button>
    </Box>
  );
};

export default NotFound;
