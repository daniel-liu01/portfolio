"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { THEME_KEY } from "./climbData";
import "./ClimbNav.css";

function applyTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
}

export default function ClimbNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [overSky, setOverSky] = useState(isHome);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_KEY);
    const dark = stored === "dark" || document.documentElement.classList.contains("dark");
    setIsDark(dark);
    applyTheme(dark);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("has-nav-offset", !isHome);
    return () => document.body.classList.remove("has-nav-offset");
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      setOverSky(false);
      return undefined;
    }
    const onScroll = () => {
      setOverSky(window.scrollY < window.innerHeight * 0.2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      applyTheme(next);
      return next;
    });
  };

  const ink = !overSky;

  return (
    <header className={`site-nav${ink ? " ink" : ""}`} id="nav">
      <Link className="logo" href="/" aria-label="Daniel Liu, home">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 4h6v28H3z" />
          <path d="M9 4h8c9 0 14 5 14 14s-5 14-14 14H9" />
          <path d="M13 28h24v5H13" />
          <path d="M13 8v20" />
        </svg>
      </Link>
      <div className="nav-right">
        <nav className="nav-links" aria-label="Main">
          <Link href="/" aria-current={isHome ? "page" : undefined}>
            Home
          </Link>
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>
            About
          </Link>
          <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>
            Contact
          </Link>
        </nav>
        <button
          className="theme"
          id="theme"
          type="button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={mounted ? isDark : undefined}
          onClick={toggleTheme}
        >
          <span className="theme-thumb">
            <svg className="sun-i" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <circle cx="8" cy="8" r="3" />
              <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3" />
              </g>
            </svg>
            <svg className="moon-i" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M13 9.6A5.6 5.6 0 0 1 6.4 3a5.6 5.6 0 1 0 6.6 6.6z" />
            </svg>
          </span>
        </button>
      </div>
    </header>
  );
}
