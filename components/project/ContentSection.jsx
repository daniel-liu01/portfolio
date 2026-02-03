import "./ContentSection.css";

/**
 * Reusable content section for project pages. Layout depends on variant.
 *
 * **Variants:**
 * - `textRight` – Heading (1fr) left, body (2fr) right. Optional `bottomImage` adds a full-width image below, aligned to the grid with subtle shadow.
 * - `textLeftImagesRight` – Heading + body left, `rightContent` (e.g. image) right; image fills grid cell height.
 *
 * @param {string} title - Section heading
 * @param {React.ReactNode} children - Body content (use <strong> for emphasis)
 * @param {"textRight" | "textLeftImagesRight"} variant
 * @param {React.ReactNode} [rightContent] - Right column content when variant is "textLeftImagesRight"
 * @param {{ src: string, alt: string }} [bottomImage] - Image below the row when variant is "textRight"; use for boards/screenshots (e.g. pivot.png)
 *
 * @example
 * // Heading + body + full-width image below (e.g. Pivot section)
 * <ContentSection title="Pivot" variant="textRight" bottomImage={{ src: "/pivot.png", alt: "..." }}>
 *   <p>...</p>
 * </ContentSection>
 */
function ContentSection({
  title,
  children,
  variant = "textRight",
  rightContent,
  bottomImage,
}) {
  const isTextLeftImagesRight = variant === "textLeftImagesRight";

  return (
    <section className={`content-section content-section--${variant}`}>
      <div className="content-section-container">
        {variant === "textRight" && (
          <>
            <h2 className="content-section-title">{title}</h2>
            <div className="content-section-body">{children}</div>
          </>
        )}
        {isTextLeftImagesRight && (
          <>
            <div className="content-section-left">
              <h2 className="content-section-title">{title}</h2>
              <div className="content-section-body">{children}</div>
            </div>
            {rightContent && (
              <div className="content-section-right">{rightContent}</div>
            )}
          </>
        )}
      </div>
      {variant === "textRight" && bottomImage && (
        <div className="content-section-bottom-image">
          <img src={bottomImage.src} alt={bottomImage.alt} />
        </div>
      )}
    </section>
  );
}

export default ContentSection;
