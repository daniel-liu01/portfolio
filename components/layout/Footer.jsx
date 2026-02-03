import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-name">Daniel Liu</span>
          <span className="footer-title">UX/UI Designer</span>
        </div>
        <a href="mailto:daniel30912@gmail.com" className="footer-email">
          daniel30912@gmail.com
        </a>
        <a
          href="/Daniel%20Liu%20%7C%20Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Resume
        </a>
        <a
          href="https://www.linkedin.com/in/danielmyliu/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;
