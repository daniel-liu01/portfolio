"use client";

import { useState, useRef, useEffect } from "react";
import "./MagazineViewer.css";

const PAGES = [
  "/magazine/cover.png",
  "/magazine/mag1.png",
  "/magazine/mag2.png",
  "/magazine/mag3.png",
  "/magazine/mag4.png",
  "/magazine/mag5.png",
  "/magazine/back.png",
];

const FADE_MS = 150;

export default function MagazineViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollRestoreRef = useRef(null);
  const pendingIndexRef = useRef(null);

  useEffect(() => {
    if (scrollRestoreRef.current != null) {
      window.scrollTo({ top: scrollRestoreRef.current, behavior: "auto" });
      scrollRestoreRef.current = null;
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isTransitioning || pendingIndexRef.current == null) return;
    const t = setTimeout(() => {
      setCurrentIndex(pendingIndexRef.current);
      pendingIndexRef.current = null;
      setTimeout(() => setIsTransitioning(false), FADE_MS);
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [isTransitioning]);

  const goToPage = (e, nextIndex) => {
    if (nextIndex < 0 || nextIndex >= PAGES.length) return;
    scrollRestoreRef.current = window.scrollY ?? document.documentElement.scrollTop;
    e.currentTarget?.blur();
    pendingIndexRef.current = nextIndex;
    setIsTransitioning(true);
  };

  return (
    <section className="magazine-viewer">
      <div className="magazine-viewer-container">
        <button
          type="button"
          className={`magazine-viewer-arrow magazine-viewer-arrow--prev ${currentIndex === 0 ? "magazine-viewer-arrow--disabled" : ""}`}
          onClick={(e) => goToPage(e, currentIndex - 1)}
          aria-label="Previous page"
          aria-disabled={currentIndex === 0}
          tabIndex={currentIndex === 0 ? -1 : 0}
        >
          <img src="/left.svg" alt="" width={32} height={32} aria-hidden />
        </button>

        <div
          className={`magazine-viewer-frame ${currentIndex === 0 ? "magazine-viewer-frame--first" : ""} ${currentIndex === PAGES.length - 1 ? "magazine-viewer-frame--last" : ""} ${isTransitioning ? "magazine-viewer-frame--fade" : ""}`}
        >
          {currentIndex === 0 ? (
            <>
              <div className="magazine-viewer-frame-prompt">
                <h2 className="magazine-viewer-frame-prompt-text">
                  Click Through
                  <br />
                  To Explore!
                </h2>
              </div>
              <div className="magazine-viewer-frame-image-wrap">
                <img
                  src={PAGES[currentIndex]}
                  alt={`Magazine page ${currentIndex + 1} of ${PAGES.length}`}
                  className="magazine-viewer-image"
                />
              </div>
            </>
          ) : currentIndex === PAGES.length - 1 ? (
            <>
              <div className="magazine-viewer-frame-image-wrap">
                <img
                  src={PAGES[currentIndex]}
                  alt={`Magazine page ${currentIndex + 1} of ${PAGES.length}`}
                  className="magazine-viewer-image"
                />
              </div>
              <div className="magazine-viewer-frame-spacer" aria-hidden="true" />
            </>
          ) : (
            <img
              src={PAGES[currentIndex]}
              alt={`Magazine page ${currentIndex + 1} of ${PAGES.length}`}
              className="magazine-viewer-image"
            />
          )}
        </div>

        <button
          type="button"
          className={`magazine-viewer-arrow magazine-viewer-arrow--next ${currentIndex === PAGES.length - 1 ? "magazine-viewer-arrow--disabled" : ""}`}
          onClick={(e) => goToPage(e, currentIndex + 1)}
          aria-label="Next page"
          aria-disabled={currentIndex === PAGES.length - 1}
          tabIndex={currentIndex === PAGES.length - 1 ? -1 : 0}
        >
          <img src="/right.svg" alt="" width={32} height={32} aria-hidden />
        </button>
      </div>
      <p className="magazine-viewer-indicator" aria-live="polite">
        {currentIndex + 1} / {PAGES.length}
      </p>
    </section>
  );
}
