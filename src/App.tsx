import { BrowserRouter } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { PropsWithChildren } from "react";
import { Router } from "./routes/Router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
