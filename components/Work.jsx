"use client";

import { useState } from "react";
import "./Work.css";

const projects = [
  { title: "Forge", image: "/forge.jpg", href: "#" },
  { title: "LevelUp", href: "#" },
  { title: "G Adventures Travel Magazine", image: "/magazine.jpg", href: "#" },
  { title: "Kofi", href: "#" },
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
        <h2 className="work-title">Work</h2>
        <div className="work-grid">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="work-card"
              onMouseEnter={() => setHoveredCard(project.title)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="work-card-image-wrap"
                style={hoveredCard === project.title ? hoveredWrapStyle : undefined}
              >
                {project.image ? (
                  <img
                    key={project.image}
                    src={project.image}
                    alt={project.title}
                    className="work-card-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="work-card-image-placeholder" aria-hidden="true" />
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
