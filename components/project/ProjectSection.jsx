import "./ProjectSection.css";

/**
 * Reusable project page layout: title, reading time, hero image, metadata grid.
 * Use for Forge, LevelUp, and other project pages.
 *
 * @param {string} title - Project title (e.g. "Forge")
 * @param {string} readingTime - e.g. "10 minutes"
 * @param {string} heroImage - Image path (e.g. "/forge.jpg")
 * @param {string} [heroImageAlt] - Alt text for hero image (default: "{title} project")
 * @param {Array<{ label: string, value: string }>} meta - Metadata items (e.g. [{ label: "Location", value: "BCIT" }, ...])
 */
function ProjectSection({ title, readingTime, heroImage, heroImageAlt, meta = [] }) {
  const alt = heroImageAlt ?? `${title} project`;

  return (
    <section className="project-section">
      <div className="project-container">
        <header className="project-header">
          <h1 className="project-title">{title}</h1>
          <p className="project-reading-time">
            Estimated reading time: {readingTime}
          </p>
        </header>

        <div className="project-hero">
          <img
            src={heroImage}
            alt={alt}
            className="project-hero-image"
          />
        </div>

        <div className="project-meta">
          <dl className="project-meta-grid">
            {meta.map(({ label, value }) => (
              <div key={label} className="project-meta-item">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;
