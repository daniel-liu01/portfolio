"use client";

import { useState, useRef, useEffect } from "react";

const IMAGES = {
  light: { doodle: "/about/doodle.png", pow: "/about/pow.png" },
  dark: { doodle: "/about/doodleDark.png", pow: "/about/powDark.png" },
};

function getIsDark() {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function AboutMeImage({ className = "", onPow }) {
  const [showPow, setShowPow] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setIsDark(getIsDark());
    const observer = new MutationObserver(() => setIsDark(getIsDark()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const theme = isDark ? IMAGES.dark : IMAGES.light;
  const src = showPow ? theme.pow : theme.doodle;
  const alt = showPow ? "Pow by Daniel Liu" : "Doodle by Daniel Liu";

  const handleClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (showPow) {
      setShowPow(false);
    } else {
      setShowPow(true);
      onPow?.();
      timeoutRef.current = setTimeout(() => setShowPow(false), 500);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
      tabIndex={0}
      style={{ cursor: "pointer" }}
    />
  );
}
