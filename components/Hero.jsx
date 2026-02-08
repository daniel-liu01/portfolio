import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Main Name */}
        <div className="hero-name">
          <h1 className="hero-name-first">Daniel</h1>
          <h1 className="hero-name-last">Liu</h1>
        </div>

        {/* Top Right Tagline */}
        <p className="hero-tagline">
          <span className="hero-tagline-inner">
            Creating with
            <br />
            <strong>empathy & intent</strong>
          </span>
        </p>

        {/* Divider Line */}
        <div className="hero-divider">
          <span className="hero-divider-inner" />
        </div>

        {/* Services + Description row (mobile: side by side) */}
        <div className="hero-bottom">
          <div className="hero-services">
            <div className="hero-services-inner">
              <p>UX/UI Design</p>
              <p>User Research</p>
              <p>Graphic Design</p>
              <p>Branding</p>
            </div>
          </div>
          <p className="hero-description">
            <span className="hero-description-inner">
              Combining <strong>design</strong>, <strong>research</strong>, and{" "}
              <strong>branding</strong> to craft meaningful user experiences.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
