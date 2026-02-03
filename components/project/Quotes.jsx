import "./Quotes.css";

/**
 * Reusable quotes/stats section: horizontal row of quote blocks with attribution.
 * Use for project pages to show research stats or testimonials.
 *
 * @param {Array<{ content: React.ReactNode | string, attribution: string, url?: string }>} quotes - Array of quote objects (content + attribution; optional url to link the source)
 */
function Quotes({ quotes = [] }) {
  if (quotes.length === 0) return null;

  return (
    <section className="quotes">
      <div className="quotes-container">
        <div className="quotes-divider" aria-hidden="true" />
        <div className="quotes-grid">
          {quotes.map(({ content, attribution, url }, index) => (
            <blockquote key={index} className="quotes-item">
              <p className="quotes-content">{content}</p>
              <cite className="quotes-attribution">
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quotes-attribution-link"
                  >
                    {attribution}
                  </a>
                ) : (
                  attribution
                )}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Quotes;
