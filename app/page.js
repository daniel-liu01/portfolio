import "./globals.css";
import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <div>
          <Hero />
          <a href="#work" className={styles.heroDown} aria-label="Scroll to work section">
            <img src="/down.svg" alt="" aria-hidden="true" />
          </a>
          <Work />
        </div>
      </main>
      <Footer />
    </div>
  );
}
