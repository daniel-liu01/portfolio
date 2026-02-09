import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact | Daniel Liu",
  description: "Get in touch with Daniel Liu.",
};

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <Navbar activePage="contact" />
      <main className={styles.contactMain}>
        <section className={styles.contactSection} aria-label="Contact">
          <h1 className={styles.contactTitle}>Contact Me</h1>
          <p className={styles.contactSubtext}>
            Honestly, I prefer phone calls, but lets chat over email or LinkedIn
            first!
          </p>
          <div className={styles.contactBtns}>
            <a
              href="mailto:hello@example.com"
              className={styles.contactBtn}
              aria-label="Email"
            >
              Email
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactBtn}
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
          <div className={styles.illustration}>
            <img
              src="/contact/cups.png"
              alt=""
              className={styles.cupsDesktop}
              aria-hidden
            />
            <img
              src="/contact/mobileCups.png"
              alt=""
              className={styles.cupsMobile}
              aria-hidden
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
