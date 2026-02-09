"use client";

import { useEffect } from "react";

/**
 * On mount, if the URL has a hash (e.g. #small-joys), scroll to top and remove
 * the hash so refresh always starts at the top of the page.
 */
export default function ScrollToTopOnHash() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return;
    window.scrollTo(0, 0);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  return null;
}
