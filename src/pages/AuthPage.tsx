import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { useAuth } from "../context/authContext";
import {
  executeSignInUserWithEmailAndPassword,
  executeSignInWithApple,
  executeSignInWithGoogle,
} from "../firebase/auth";
import { Navigate } from "react-router-dom";

export const AuthPage = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { isUserLoggedIn } = useAuth();

  const handleTabChange = (event: React.SyntheticEvent, value: any) => {
    setActiveTab(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await executeSignInUserWithEmailAndPassword(email, password);
    }
  };

  const onGoogleSigningIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await executeSignInWithGoogle().catch(() => {
        setIsSigningIn(false);
      });
    }
  };

  const onAppleSigningIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await executeSignInWithApple().catch(() => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
      }}
    >
      {isUserLoggedIn && <Navigate to="/game-score" replace={true} />}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 3,
            color: "#2563eb",
            fontWeight: "bold",
          }}
        >
          Welcome
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 3,
            "& .MuiTabs-indicator": {
              backgroundColor: "#0d9488",
            },
          }}
        >
          <Tab
            label="Sign In"
            sx={{
              color: activeTab === 0 ? "#0d9488" : "inherit",
              fontWeight: "bold",
            }}
          />
          <Tab
            label="Sign Up"
            sx={{
              color: activeTab === 1 ? "#0d9488" : "inherit",
              fontWeight: "bold",
            }}
          />
        </Tabs>

        {activeTab === 0 && (
          <Box component="form" onSubmit={onGoogleSigningIn} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              color="primary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              color="primary"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#0d9488",
                "&:hover": {
                  backgroundColor: "#0f766e",
                },
              }}
            >
              Sign In
            </Button>
            <Box textAlign="center">
              <Button
                color="primary"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Forgot Password?
              </Button>
            </Box>
          </Box>
        )}

        {activeTab === 1 && (
          <Box component="form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => {onSubmit(event)}} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              color="primary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              color="primary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              color="primary"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: "#0d9488",
                "&:hover": {
                  backgroundColor: "#0f766e",
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
