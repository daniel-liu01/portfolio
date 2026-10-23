"use client";

import { useLayoutEffect, useRef } from "react";
import MountainScene from "./MountainScene";
import { runClimb } from "./runClimb";
import "./ClimbHome.css";

export default function ClimbHome() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const stayOnWork = window.location.hash === "#steps";
    if (window.location.hash && !stayOnWork) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (!stayOnWork) window.scrollTo(0, 0);
    return runClimb(root);
  }, []);

  return (
    <div className="climb-home" id="top" ref={rootRef}>
      <main>
        <section className="climb" id="climb" aria-label="Selected work, shown as a climb up a mountain">
          <div className="stage" id="stage">
            <div className="sky" />
            <div className="sky-night" />
            <div className="stars" id="stars" aria-hidden="true" />
            <div className="moon" aria-hidden="true" />

            <h1 className="sr">Daniel Liu: UX/UI designer. Design, research and branding.</h1>

            <div className="world" id="world" aria-hidden="true">
              <div className="ground" />
              <MountainScene />
              <svg id="trail" width="2000" height="1125" viewBox="0 0 2000 1125">
                <path id="route" className="route" />
                <g id="prints" />
                <g id="flags" />
                <g id="summit">
                  <line className="sum-pole" x1="984" y1="204" x2="984" y2="136" />
                  <path className="sum-flag" d="M984 136 L1022 147 L984 158 Z" />
                  <text className="summit-t" x="1038" y="152">
                    SUMMIT
                  </text>
                  <text className="summit-s" x="1038" y="176">
                    [ Mount Drachenfels · 5,378 m ]
                  </text>
                </g>
              </svg>
              <div className="pg" id="pg">
                <div className="pg-shadow" />
                <div className="pg-flip" id="pgFlip">
                  <div className="pg-body" id="pgBody">
                    <img alt="" src="/climb/penguin.svg" />
                  </div>
                </div>
              </div>
            </div>

            <a className="skip" href="#steps" id="skip">
              Skip the climb, see all work
            </a>
            <a
              className="trail-link trail-link--work"
              href="#steps"
              id="seeWork"
              tabIndex={-1}
              aria-hidden="true"
            >
              <span>Scroll</span>
              <svg
                className="cue-arrow down"
                viewBox="0 0 26 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <path d="M1 3l12 12L25 3" />
              </svg>
            </a>
            <div className="fade" id="fade" />
            <div className="cue" id="cue">
              <svg
                className="cue-arrow up"
                viewBox="0 0 26 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <path d="M1 15l12-12L25 15" />
              </svg>
              <span>Scroll to climb</span>
              <svg
                className="cue-arrow down"
                viewBox="0 0 26 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                aria-hidden="true"
              >
                <path d="M1 3l12 12L25 3" />
              </svg>
            </div>

            <aside className="gauge" id="gauge" aria-hidden="true">
              <div className="g-track" id="gTrack">
                <div className="g-fill" />
                <div className="g-dot" />
              </div>
            </aside>
            <div className="cards" id="cards" />

            <section className="finale" id="finale" aria-label="Contact">
              <p className="eyebrow">The summit</p>
              <h2>Hi, I&rsquo;m Daniel.</h2>
              <p className="body">
                My goal is to combine design, research and branding to craft meaningful user
                experiences.
              </p>
              <div className="cta">
                <a className="btn" href="#wide" id="revealWide">
                  Explore the full site <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>
          </div>
        </section>

        <section className="steps" id="steps" aria-label="All work">
          <div className="wrap">
            <p className="eyebrow">The trail so far</p>
            <h2>My Work</h2>
            <div className="grid" id="grid" />
          </div>
        </section>
      </main>
      <div className="sr" aria-live="polite" id="live" />
    </div>
  );
}
