import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.warn(
    "⚠️  Missing Publishable Key - Get it from https://dashboard.clerk.com and add to .env.local"
  );
  throw new Error(
    "Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local file. Please visit https://dashboard.clerk.com to get your key."
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
