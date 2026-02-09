import "../globals.css";
import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectSection from "@/components/project/ProjectSection";
import Introduction from "@/components/project/Introduction";
import MagazineViewer from "@/components/magazine/MagazineViewer";
import ContentSection from "@/components/project/ContentSection";
import ScrollFade from "@/components/ScrollFade";

export const metadata = {
  title: "G Adventures Travel Magazine | Daniel Liu",
  description: "G Adventures Travel Magazine — Layout Design. BCIT 2025.",
};

const magazineContent = {
  title: "G Adventures Travel Magazine",
  readingTime: "5 minutes",
  heroImage: "/magazine.jpg",
  heroImageAlt: "G Adventures Travel Magazine",
  meta: [
    { label: "Location", value: "BCIT" },
    { label: "Year", value: "2025" },
    { label: "Team", value: "Individual Project" },
    { label: "Focus", value: "Layout Design" },
  ],
};

export default function MagazinePage() {
  return (
    <div>
      <Navbar activePage="" />
      <main className={styles.main}>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ProjectSection {...magazineContent} />
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <Introduction
            rightContent={
              <p className="introduction-right-text">
                An experiment in structuring narrative through editorial design
                systems.
              </p>
            }
          >
            A magazine focused on layout, typography, and visual storytelling.
            Based on the fantastic world of Made in Abyss.
          </Introduction>
        </ScrollFade>
        <div className={styles.divider} role="presentation" />
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <MagazineViewer />
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection title="Retrospective" variant="textRight">
            <p>
              This project taught me the importance of designing across both
              pages of a spread to create stronger visual flow and narrative
              rhythm, rather than treating each page in isolation.
            </p>
            <p>
              I also learned to design with CMYK in mind early on, since colors
              that look vibrant in RGB can shift dramatically in print.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <section className={styles.thankYou}>
            <div className={styles.thankYouInner}>
              <p className={styles.thankYouText}>
                Thank you, feel free to check out
                <br />
                my other works!
              </p>
              <a href="/" className={styles.thankYouLink}>
                Back home
              </a>
            </div>
          </section>
        </ScrollFade>
      </main>
      <Footer />
    </div>
  );
}
