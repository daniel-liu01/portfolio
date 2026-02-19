"use client";

import { useState, useEffect, useRef } from "react";

const LIGHT_IMG = "/levelup/bad.png";
const DARK_IMG = "/levelup/badDark.png";

function getIsDark() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function LevelUpWorkoutImage() {
  const [src, setSrc] = useState(LIGHT_IMG);
  const observerRef = useRef(null);

  useEffect(() => {
    setSrc(getIsDark() ? DARK_IMG : LIGHT_IMG);

    observerRef.current = new MutationObserver(() => {
      setSrc(getIsDark() ? DARK_IMG : LIGHT_IMG);
    });
    observerRef.current.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <img
      src={src}
      alt="LevelUp Push Day workout screen with annotations on clarity and navigation"
      className="content-section-image-single"
    />
  );
}
