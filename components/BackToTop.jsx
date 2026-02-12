"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import "./BackToTop.css";

const SCROLL_THRESHOLD = 400;
const IDLE_HIDE_MS = 1000;

export default function BackToTop() {
  const [scrollPast, setScrollPast] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [idle, setIdle] = useState(true);
  const hideTimeoutRef = useRef(null);

  const onScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    const y = window.scrollY;
    setScrollPast(y > SCROLL_THRESHOLD);
    setIdle(false);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setIdle(true), IDLE_HIDE_MS);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [onScroll]);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterInView(entry.isIntersecting),
      { rootMargin: "0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = scrollPast && !footerInView && !idle;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`back-to-top-wrap ${visible ? "back-to-top-wrap--visible" : ""}`}>
      <span className="back-to-top-label" aria-hidden>Back to Top</span>
      <button
        type="button"
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <img src="/down.svg" alt="" className="back-to-top-icon" aria-hidden />
      </button>
    </div>
  );
}
