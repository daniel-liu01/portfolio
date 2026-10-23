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
    const html = document.documentElement;
    const sync = () => {
      setOverSky(!html.classList.contains("climb-nav-on-light"));
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
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
          viewBox="0 0 97.24 87.48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeMiterlimit="10"
          aria-hidden="true"
        >
          <rect x="1" y="1" width="18.02" height="85.41" />
          <path d="M71.84,66.74c3.76-6.47,5.63-14.39,5.63-23.77,0-14.15-3.94-24.65-11.83-31.51C57.75,4.6,46.37,1.17,31.49,1.17h-7.3v14.95h6.02c6.33,0,11.48.82,15.45,2.46s6.9,4.44,8.79,8.38c1.89,3.95,2.83,9.34,2.83,16.18s-1.03,12.22-3.08,16.39c-2.05,4.16-5.03,7.2-8.93,9.12-3.39,1.67-7.41,2.61-12.04,2.82h35.36c1.19-1.47,2.27-3.05,3.25-4.73Z" />
          <path d="M68.59,71.47c-3.38,4.18-7.61,7.5-12.69,9.96-6.87,3.32-15.01,4.98-24.41,4.98h-7.2v.07h71.95v-15.01h-27.66.01Z" />
          <path d="M55.9,81.42c5.08-2.46,9.31-5.78,12.69-9.96h-35.36c-.69.03-1.38.05-2.1.05h-6.84v14.89h7.2c9.4,0,17.54-1.66,24.41-4.98Z" />
        </svg>
      </Link>
      <div className="nav-right">
        <nav className="nav-links" aria-label="Main">
          <Link href="/" aria-current={isHome ? "page" : undefined}>
            Home
          </Link>
          <Link
            href="/#steps"
            onClick={(e) => {
              if (pathname !== "/") return;
              e.preventDefault();
              window.dispatchEvent(new Event("climb:go-work"));
            }}
          >
            Work
          </Link>
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>
            About
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
