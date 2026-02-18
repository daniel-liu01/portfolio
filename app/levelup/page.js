import "../globals.css";
import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectSection from "@/components/project/ProjectSection";
import Introduction from "@/components/project/Introduction";
import ContentSection from "@/components/project/ContentSection";
import ScrollFade from "@/components/ScrollFade";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "LevelUp | Daniel Liu",
  description:
    "LevelUp — Fitness gamification app. UX/UI Design, Graphic Design. RevenueCat Hackathon 2025.",
};

const levelupContent = {
  title: "LevelUp",
  readingTime: "10 minutes",
  heroImage: "/levelup/lvlup.png",
  heroImageAlt: "LevelUp app — fitness companion with pink slime character, workout plans, and stats",
  meta: [
    { label: "Location", value: "RevenueCat Hackathon" },
    { label: "Year", value: "2025" },
    { label: "Team", value: "3 members" },
    { label: "Focus", value: "UX/UI Design, Graphic Design" },
  ],
};

export default function LevelUpPage() {
  return (
    <div>
      <Navbar activePage="" />
      <main className={styles.main}>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ProjectSection {...levelupContent} />
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <Introduction
            rightContent={
              <div className={styles.introductionImageWrap}>
                <img
                  src="/levelup/muscle.png"
                  alt="LevelUp pink companion character flexing"
                  className="introduction-image"
                />
              </div>
            }
          >
            <>
              Turning workouts into a playful
              <br />
              experience with virtual pets and
              <br />
              bite-sized minigames.
            </>
          </Introduction>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <div className={styles.dividerWrap}>
            <div className={styles.divider} role="presentation" />
          </div>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection title="Overview" variant="textRight">
            <p>
              The app centers on a pink spherical companion that asks to be fed
              and leveled up. Users progress through steps, distance, and
              calories (Stats Today), and can run workout plans like Push Day and
              Pull Day. Rest timers and minigames (e.g. basketball) add variety
              and keep the experience light.
            </p>
            <p>
              Navigation is built around Home, Workouts, Calendar, and Profile,
              with a clear hierarchy so users can jump into a workout or check
              their stats without friction.
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
                Thanks for reading. More case study content can be added here as
                you build out the page.
              </p>
              <a href="/#work" className={styles.thankYouLink}>
                Back to work
              </a>
            </div>
          </section>
        </ScrollFade>
      </main>
      <Footer />
      <BackToTop />
      <ScrollProgress />
    </div>
  );
}
