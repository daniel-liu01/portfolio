"use client";

import { useState } from "react";
import Image from "next/image";
import "./Work.css";

const projects = [
  { title: "Forge", image: "/forge/forge.jpg", href: "/forge" },
  { title: "LevelUp", image: "/levelup/lvlup.png", href: "#" },
  { title: "G Adventures Travel Magazine", image: "/magazine.jpg", href: "/magazine" },
  { title: "Kofi", image: "/kofi/cans.png", href: "#" },
];

function Work() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const hoveredWrapStyle = {
    transform: "scale(1.02)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  };

  return (
    <section className="work" id="work">
      <div className="work-container">
        <h2 className="work-title">
          Selected Works{" "}
          <span className="work-title-note">(Under construction!)</span>
        </h2>
        <div className="work-grid">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className={`work-card${project.title === "LevelUp" ? " work-card--levelup" : ""}`}
              onMouseEnter={() => setHoveredCard(project.title)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="work-card-image-wrap"
                style={
                  hoveredCard === project.title ? hoveredWrapStyle : undefined
                }
              >
                {project.image ? (
                  <Image
                    key={project.image}
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1600px) 50vw, 800px"
                    style={{ objectFit: "cover" }}
                    quality={90}
                  />
                ) : (
                  <div
                    className="work-card-image-placeholder"
                    aria-hidden="true"
                  />
                )}
              </div>
              <h3 className="work-card-title">{project.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
