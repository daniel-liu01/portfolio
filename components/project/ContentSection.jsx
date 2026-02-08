import Image from "next/image";
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
 * @param {boolean} [bottomImageNoShadow] - When true, remove background and shadow from bottomImage
 * @param {{ src: string, alt: string }[]} [bottomImages] - Two images below the row when variant is "textRight"; grid is 1fr 1fr by default
 * @param {string} [bottomImagesGrid] - Optional grid template for bottomImages (e.g. "1fr 2fr")
 *
 * @example
 * // Heading + body + full-width image below (e.g. Pivot section)
 * <ContentSection title="Pivot" variant="textRight" bottomImage={{ src: "/forge/pivot.png", alt: "..." }}>
 *   <p>...</p>
 * </ContentSection>
 * @example
 * // Heading + body + two images below in 1fr 1fr (e.g. Primary Research)
 * <ContentSection title="Primary Research" variant="textRight" bottomImages={[{ src: "/stat1.png", alt: "..." }, { src: "/stat2.png", alt: "..." }]}>
 *   <p>...</p>
 * </ContentSection>
 */
function ContentSection({
  title,
  children,
  variant = "textRight",
  rightContent,
  bottomImage,
  bottomImageNoShadow,
  bottomImages,
  bottomImagesGrid,
}) {
  const isTextLeftImagesRight = variant === "textLeftImagesRight";

  const hasBottomImagesGrid = Boolean(
    variant === "textRight" && bottomImages && bottomImagesGrid
  );

  const hasBottomImageNoShadow = Boolean(
    variant === "textRight" && bottomImage && bottomImageNoShadow
  );

  return (
    <section
      className={`content-section content-section--${variant}${hasBottomImagesGrid ? " content-section--bottomImagesGrid" : ""}${hasBottomImageNoShadow ? " content-section--bottomImageNoShadow" : ""}`}
    >
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
      {variant === "textRight" && bottomImages && bottomImages.length >= 2 && (
        <div
          className={`content-section-bottom-images${bottomImages.length === 4 ? " content-section-bottom-images--four" : ""}`}
          style={
            bottomImagesGrid
              ? { gridTemplateColumns: bottomImagesGrid }
              : undefined
          }
        >
          {bottomImages.map((img, i) => (
            <div key={i} className="content-section-bottom-images-cell">
              {bottomImages.length === 4 ? (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <img src={img.src} alt={img.alt} />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ContentSection;
