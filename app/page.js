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
          <div className={styles.heroDown}>
            <img src="/down.svg" alt="" aria-hidden="true" />
          </div>
          <Work />
        </div>
      </main>
      <Footer />
    </div>
  );
}
