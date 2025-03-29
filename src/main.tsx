import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

console.log(import.meta.env.VITE_APP_FIREBASE_API_KEY)
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
