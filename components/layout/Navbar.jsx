"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";

function Navbar({ activePage = "home" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" aria-label="Home">
          <img src="/icon.svg" alt="Logo" />
        </Link>

        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <img
            src="/hamburger.png"
            alt=""
            className={`navbar-toggle-icon ${isMenuOpen ? "open" : ""}`}
          />
        </button>

        <div
          className={`navbar-overlay ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsMenuOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close menu"
        />

        <div className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          <Link
            href={isHome ? "#home" : "/"}
            className={`navbar-link ${activePage === "home" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`navbar-link ${activePage === "about" ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`navbar-link ${
              activePage === "contact" ? "active" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <button
            type="button"
            className="navbar-theme-toggle"
            onClick={toggleTheme}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={isDarkMode}
            title={isDarkMode ? "Light mode" : "Dark mode"}
          >
            <span className="navbar-theme-toggle-track">
              <span
                className={`navbar-theme-toggle-thumb ${isDarkMode ? "dark" : ""}`}
              >
                {isDarkMode ? (
                  <svg
                    className="navbar-theme-toggle-thumb-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg
                    className="navbar-theme-toggle-thumb-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                )}
              </span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
