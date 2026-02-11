import "../globals.css";
import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectSection from "@/components/project/ProjectSection";
import Introduction from "@/components/project/Introduction";
import ContentSection from "@/components/project/ContentSection";
import ScrollFade from "@/components/ScrollFade";

export const metadata = {
  title: "Kofi | Daniel Liu",
  description: "Kofi — Beverage can design. Graphic Design, Layout Design. BCIT 2025.",
};

const kofiContent = {
  title: "Kofi",
  readingTime: "5 minutes",
  heroImage: "/kofi/cans.png",
  heroImageAlt: "Kofi coffee cans",
  meta: [
    { label: "Location", value: "BCIT" },
    { label: "Year", value: "2025" },
    { label: "Team", value: "Individual Project" },
    { label: "Focus", value: "Graphic Design, Layout Design" },
  ],
};

export default function KofiPage() {
  return (
    <div>
      <Navbar activePage="" />
      <main className={styles.main}>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ProjectSection {...kofiContent} />
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <Introduction
            rightContent={
              <div className="introduction-right-text-group">
                <p className="introduction-right-text">
                  This project explores how illustration, colour, and typography
                  can create a distinctive shelf presence.
                </p>
                <p className="introduction-right-text">
                  I handled the full design process, from concept and visual
                  design to layout, typography, and preparing print-ready files.
                </p>
              </div>
            }
          >
            <>
              Kofi is well... Coffee!
              <br />
              A can design blending playfulness and minimalism.
            </>
          </Introduction>
        </ScrollFade>
        <div className={styles.dividerWrap}>
          <div className={styles.divider} role="presentation" />
        </div>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection title="Concept" variant="textRight">
            <p>
              I wanted to create something that feels cool yet inviting. Since
              coffee is the start to many people&apos;s days, I wanted my
              design to evoke positive feelings.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Initial Design"
            variant="textRight"
            bottomImage={{
              src: "/kofi/placeholder.svg",
              alt: "Initial Kofi label design on short can (placeholder)",
            }}
          >
            <p>
              In the beginning, I started designing on a short can right away
              without giving it a second thought.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection title="Considerations" variant="textRight">
            <p>
              After looking at mockups and real products, the short can felt
              stubby and unappealing, so I switched the design to be on a tall
              can. Tall cans generally feel more premium, elegant, and are
              easier to hold. Not to mention, there is more room to work with
              for the designs.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Redesign"
            variant="textRight"
            bottomImages={[
              {
                src: "/kofi/placeholder.svg",
                alt: "Redesigned Kofi flat label for tall can (placeholder)",
              },
              {
                src: "/kofi/placeholder.svg",
                alt: "Three tall can mockups showing redesigned label (placeholder)",
              },
            ]}
          />
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection title="Key Design Decisions" variant="textRight">
            <ul>
              <li>
                Tall can format for stronger shelf presence and premium
                perception
              </li>
              <li>Playful colours to differentiate flavours</li>
              <li>
                Minimal layout to keep the brand clear and readable at a
                distance
              </li>
              <li>Bold typography for quick brand recognition</li>
            </ul>
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
