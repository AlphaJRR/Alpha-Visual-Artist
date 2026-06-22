import React from "react";
import { APP_STORE_URL } from "@/config/app";
import "@/styles/ava-tokens.css";
import "./app-download-pill.css";

export function AppDownloadPill() {
  return (
    <a
      href={APP_STORE_URL}
      className="ava-app-download-pill"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download ALPHA Creators on the App Store"
    >
      <span className="ava-app-download-pill__cta">↓ Get the App</span>
      <span className="ava-app-download-pill__tag">Inspire. Connect. Create Impact.</span>
    </a>
  );
}
