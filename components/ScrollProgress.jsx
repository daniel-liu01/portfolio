"use client";

import { useState, useEffect, useCallback } from "react";
import "./ScrollProgress.css";

const SIZE = 56;
const STROKE_WIDTH = 3;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    const { scrollY, innerHeight } = window;
    const { scrollHeight } = document.documentElement;
    const maxScroll = scrollHeight - innerHeight;
    const value = maxScroll <= 0 ? 0 : Math.min(1, scrollY / maxScroll);
    setProgress(value);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const percent = Math.round(progress * 100);
  const atEnd = progress >= 1;

  return (
    <div className={`scroll-progress ${atEnd ? "scroll-progress--hidden" : ""}`} role="presentation" aria-hidden>
      <svg
        className="scroll-progress-svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <circle
          className="scroll-progress-track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
        />
        <circle
          className="scroll-progress-fill"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <span className="scroll-progress-text">{percent}%</span>
    </div>
  );
}
