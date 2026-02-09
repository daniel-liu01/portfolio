"use client";

import { useRef, useEffect, useState } from "react";

/**
 * Wraps children in a div that fades in when it scrolls into view.
 * Use with CSS: wrapper starts opacity: 0 / translateY; add visibleClass when inView for opacity: 1 / translateY(0).
 *
 * @param {string} [wrapperClassName] - Class for the wrapper (e.g. opacity 0, transition)
 * @param {string} [visibleClassName] - Class to add when in view (e.g. opacity 1)
 * @param {number} [rootMargin='0px 0px -80px 0px'] - IntersectionObserver rootMargin (negative bottom = trigger before fully in view)
 * @param {number} [threshold=0] - IntersectionObserver threshold (0–1)
 */
export default function ScrollFade({
  children,
  wrapperClassName = "",
  visibleClassName = "",
  rootMargin = "0px 0px -80px 0px",
  threshold = 0,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={`${wrapperClassName} ${inView ? visibleClassName : ""}`.trim()}
    >
      {children}
    </div>
  );
}
