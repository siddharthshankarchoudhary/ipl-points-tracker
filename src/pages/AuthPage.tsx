import React, { useState, ReactNode, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleIcon } from "../assets/GoogleIcon";
import { AppleIcon } from "../assets/AppleIcon";
import {
  executeCreateUserWithEmailAndPassword,
  executeSignInUserWithEmailAndPassword,
  executeSignInWithApple,
  executeSignInWithGoogle,
  executeSignOut,
} from "../firebase/auth";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface SignInFormData {
  email: string;
  password: string;
}

interface SignUpFormData extends SignInFormData {
  confirmPassword: string;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number): {
  id: string;
  "aria-controls": string;
} {
  return {
    id: `auth-tab-${index}`,
    "aria-controls": `auth-tabpanel-${index}`,
  };
}

export const AuthPage: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = (email: string): boolean => {
    if (!email) return false;
    return emailRegex.test(email);
  };

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
    setTabValue(newValue);
    setPasswordError("");
    setEmailError("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }

    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    await executeSignInUserWithEmailAndPassword(
      formData.email,
      formData.password,
    );
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    await executeCreateUserWithEmailAndPassword(
      formData.email,
      formData.password,
    );
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    await executeSignInWithGoogle();
  };

  const handleAppleSignIn = async (): Promise<void> => {
    await executeSignInWithApple();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ width: "100%", borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label="authentication tabs"
          >
            <Tab label="Sign In" {...a11yProps(0)} />
            <Tab label="Sign Up" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box component="form" onSubmit={handleSignIn} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleInputChange}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link href="#" variant="body2" onClick={() => setTabValue(1)}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Box>
            </Box>
          </TabPanel>

          {/* Sign Up Form */}
          <TabPanel value={tabValue} index={1}>
            <Box component="form" onSubmit={handleSignUp} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email-signup"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleInputChange}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password-signup"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!passwordError}
                helperText={passwordError}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link href="#" variant="body2" onClick={() => setTabValue(0)}>
                  {"Already have an account? Sign In"}
                </Link>
              </Box>
            </Box>
          </TabPanel>

          <Box sx={{ px: 3, pb: 3 }}>
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={handleGoogleSignIn}
              startIcon={<GoogleIcon height="24px" width="24px" />}
            >
              Continue with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleAppleSignIn}
              startIcon={<AppleIcon height="24px" width="24px" />}
            >
              Continue with Apple
            </Button>
          </Box>
        </Paper>
      </Box>

      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={async () => {
          await executeSignOut();
        }}
      >
        Sign Out
      </Button>
    </Container>
  );
};
