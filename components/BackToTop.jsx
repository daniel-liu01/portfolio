"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import "./BackToTop.css";

const SCROLL_THRESHOLD = 400;

export default function BackToTop() {
  const [scrollPast, setScrollPast] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const prevScrollY = useRef(0);

  const onScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    const y = window.scrollY;
    setScrollPast(y > SCROLL_THRESHOLD);
    setScrollingUp(y < prevScrollY.current);
    prevScrollY.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    prevScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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

  const visible = scrollPast && !footerInView && !scrollingUp;

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
