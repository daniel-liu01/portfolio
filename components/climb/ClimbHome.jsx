"use client";

import { useEffect, useRef } from "react";
import MountainScene from "./MountainScene";
import { runClimb } from "./runClimb";
import "./ClimbHome.css";

export default function ClimbHome() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
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
            <div className="fade" id="fade" />
            <div className="cue" id="cue">
              <span>Scroll to climb</span>
              <svg viewBox="0 0 26 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M1 3l12 12L25 3" />
              </svg>
            </div>

            <aside className="gauge" id="gauge" aria-label="Climb progress">
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
                <a className="btn" href="#steps">
                  Explore the full site <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>
            <section className="finale" id="coda" aria-label="The journey continues">
              <p className="eyebrow">The journey continues</p>
              <h2>Higher peaks ahead.</h2>
              <p className="body">
                Reaching this summit is just one part of the journey. There is always a taller one to
                climb.
              </p>
              <div className="cta">
                <a className="btn" href="#steps">
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
