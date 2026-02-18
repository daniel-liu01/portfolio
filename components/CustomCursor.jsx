"use client";

import { useState, useEffect, useRef } from "react";
import "./CustomCursor.css";

const TRAIL_COUNT = 4;
const LERP = 0.28;
const MAIN_SIZE = 10;
const MAIN_SIZE_HOVER = 18;
const TRAIL_SIZE = 6;

const interactiveSelector =
  'a, button, [role="button"], input[type="submit"], input[type="button"], [type="submit"]';

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const initialTrail = () =>
  Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState(initialTrail);
  const posRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef(initialTrail());
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (prefersReducedMotion || !hasHover) return;

    const onMove = (e) => {
      setVisible(true);
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos(posRef.current);
      const interactive = e.target?.closest(interactiveSelector);
      setIsHovering(Boolean(interactive));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const animate = () => {
      const target = posRef.current;
      const next = [...trailRef.current];
      next[0] = {
        x: lerp(next[0].x, target.x, LERP),
        y: lerp(next[0].y, target.y, LERP),
      };
      for (let i = 1; i < TRAIL_COUNT; i++) {
        next[i] = {
          x: lerp(next[i].x, next[i - 1].x, LERP),
          y: lerp(next[i].y, next[i - 1].y, LERP),
        };
      }
      trailRef.current = next;
      setTrail(next);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    document.body.style.cursor = "none";
    document.body.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", onMove);
    document.body.addEventListener("mouseleave", onLeave);
    document.body.addEventListener("mouseenter", onEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.cursor = "";
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
      document.body.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="custom-cursor"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {trail.map((t, i) => (
        <div
          key={i}
          className="custom-cursor-trail"
          style={{
            left: t.x,
            top: t.y,
            width: TRAIL_SIZE,
            height: TRAIL_SIZE,
            opacity: 0.25 - (i / TRAIL_COUNT) * 0.2,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <div
        className="custom-cursor-main"
        style={{
          left: pos.x,
          top: pos.y,
          width: isHovering ? MAIN_SIZE_HOVER : MAIN_SIZE,
          height: isHovering ? MAIN_SIZE_HOVER : MAIN_SIZE,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
