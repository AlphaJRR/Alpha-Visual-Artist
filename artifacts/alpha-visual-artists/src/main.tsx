import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClerkConfigBanner, ClerkRoot } from "@/components/ClerkRoot";

createRoot(document.getElementById("root")!).render(
  <ClerkRoot>
    <ClerkConfigBanner />
    <App />
  </ClerkRoot>,
);
