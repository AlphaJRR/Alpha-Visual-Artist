import React from "react";
import { Link } from "wouter";
import { APP_LAUNCH_LIVE, APP_STORE_URL } from "@/config/app";
import "@/styles/ava-tokens.css";
import "./app-download-pill.css";

export function AppDownloadPill() {
  const className = "ava-app-download-pill";
  const label = "Download ALPHA Creators on the App Store";
  const content = (
    <>
      <span className="ava-app-download-pill__cta">↓ Get the App</span>
      <span className="ava-app-download-pill__tag">Inspire. Connect. Create Impact.</span>
    </>
  );

  if (APP_LAUNCH_LIVE) {
    return (
      <a
        href={APP_STORE_URL}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href="/app" className={className} aria-label="Alpha Creators App — learn more">
      {content}
    </Link>
  );
}
