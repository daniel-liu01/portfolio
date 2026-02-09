"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";

function Navbar({ activePage = "home" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            href={isHome ? "#contact" : "/#contact"}
            className={`navbar-link ${
              activePage === "contact" ? "active" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
