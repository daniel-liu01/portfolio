"use client";

import { useState, useRef, useEffect } from "react";

export default function AboutMeImage({ className = "", onPow }) {
  const [showPow, setShowPow] = useState(false);
  const timeoutRef = useRef(null);
  const src = showPow ? "/about/pow.jpeg" : "/about/doodle.jpeg";
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
