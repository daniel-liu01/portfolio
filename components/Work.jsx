import "./Work.css";

const projects = [
  { title: "Forge", image: "/forge.jpg" },
  { title: "LevelUp" },
  { title: "G Adventures Travel Magazine", image: "/magazine.jpg" },
  { title: "Kofi" },
];

function Work() {
  return (
    <section className="work" id="work">
      <div className="work-container">
        <h2 className="work-title">Work</h2>
        <div className="work-grid">
          {projects.map((project) => (
            <article key={project.title} className="work-card">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="work-card-image"
                />
              ) : (
                <div className="work-card-image" aria-hidden="true" />
              )}
              <h3 className="work-card-title">{project.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
