import "./Introduction.css";

/**
 * Reusable introduction section: large heading (left) with optional content on the right.
 * Use for project pages to introduce the problem or context.
 *
 * @param {React.ReactNode} children - Main intro text (use <strong> for emphasis)
 * @param {React.ReactNode} [rightContent] - Optional content for the right side (e.g. images, mockups)
 * @param {boolean} [centerAlign] - When true, center-align the heading text
 */
function Introduction({ children, rightContent, centerAlign }) {
  return (
    <section className={`introduction ${centerAlign ? "introduction--center" : ""}`}>
      <div className="introduction-container">
        <div className="introduction-content">
          <h2 className="introduction-heading">{children}</h2>
        </div>
        {rightContent && (
          <div className="introduction-right">{rightContent}</div>
        )}
      </div>
    </section>
  );
}

export default Introduction;
