import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
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
            <Button as="a" href="mailto:hello@example.com" aria-label="Email">
              Email
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/in/danielmyliu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </Button>
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
