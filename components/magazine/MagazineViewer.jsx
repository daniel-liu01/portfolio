"use client";

import { useState } from "react";
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

export default function MagazineViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((i) => i - 1);
  };

  const goNext = () => {
    if (currentIndex === PAGES.length - 1) return;
    setCurrentIndex((i) => i + 1);
  };

  return (
    <section className="magazine-viewer">
      <div className="magazine-viewer-container">
        <button
          type="button"
          className={`magazine-viewer-arrow magazine-viewer-arrow--prev ${currentIndex === 0 ? "magazine-viewer-arrow--disabled" : ""}`}
          onClick={goPrev}
          aria-label="Previous page"
          aria-disabled={currentIndex === 0}
        >
          <img src="/left.svg" alt="" width={32} height={32} aria-hidden />
        </button>

        <div
          className={`magazine-viewer-frame ${currentIndex === 0 ? "magazine-viewer-frame--first" : ""} ${currentIndex === PAGES.length - 1 ? "magazine-viewer-frame--last" : ""}`}
        >
          {currentIndex === 0 ? (
            <>
              <div className="magazine-viewer-frame-spacer" aria-hidden="true" />
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
          onClick={goNext}
          aria-label="Next page"
          aria-disabled={currentIndex === PAGES.length - 1}
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
