"use client";
import Image from "next/image";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 1.8s, then unmount after transition ends
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`preloader-overlay ${fadeOut ? "preloader-fadeout" : ""}`}>
      {/* Animated background blobs */}
      <div className="preloader-blob preloader-blob--1" />
      <div className="preloader-blob preloader-blob--2" />

      <div className="preloader-content">
        {/* Logo / brand mark */}
        <div className="preloader-logo-ring">
          <svg
            className="preloader-ring-svg"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="url(#preloaderGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="339.29"
              strokeDashoffset="339.29"
              className="preloader-arc"
            />
            <defs>
              <linearGradient id="preloaderGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#5b2dc4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Book / graduation cap icon inside ring */}
          <div className="preloader-icon">
           <Image src="/logo_icon.jpg" alt="Logo" className="rounded-full" width={80} height={80} />
          </div>
        </div>

        {/* Brand name */}
        <h1 className="preloader-title">
          Deeksha Classes 
        </h1>
        <h5 className="text-amber-50">सा विद्या या विमुक्तये</h5>
        <p className="preloader-subtitle">Loading your experience…</p>

        {/* Dot loader */}
        <div className="preloader-dots">
          <span className="preloader-dot" style={{ animationDelay: "0s" }} />
          <span className="preloader-dot" style={{ animationDelay: "0.2s" }} />
          <span className="preloader-dot" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}
