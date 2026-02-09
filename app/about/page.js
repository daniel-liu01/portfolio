import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContentSection from "@/components/project/ContentSection";
import ScrollFade from "@/components/ScrollFade";
import ScrollToTopOnHash from "@/components/ScrollToTopOnHash";
import styles from "./page.module.css";

export const metadata = {
  title: "About | Daniel Liu",
  description: "About Daniel Liu",
};

export default function AboutPage() {
  return (
    <div>
      <ScrollToTopOnHash />
      <Navbar activePage="about" />
      <main className={styles.aboutMain}>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="About Me"
            variant="imageLeftTextRight"
            leftContent={
              <img
                src="/about/doodle.png"
                alt="Doodle by Daniel Liu"
                className={`content-section-image-single ${styles.doodleImg}`}
              />
            }
          >
            <p>
              Hello! My name is Daniel. I am a UX/UI designer based in Vancouver.
              I originally grew up in Taiwan and moved to Canada at the age of 10.
            </p>
            <p>
              I got into design back when I was taking a gap year from university.
              I told my friend I wasn&apos;t sure what to study and he told me:
              <strong>
                &quot;You should look into UX design, they make buttons.&quot;
              </strong>{" "}
              I then went down the rabbit hole and here I am today. I love the
              creative aspect of this field, where I get to solve problems in a
              non-traditional, creative way.
            </p>
          </ContentSection>
        </ScrollFade>

        <div className={styles.heroDownWrap}>
          <a href="#small-joys" className={styles.heroDown} aria-label="Scroll to Small Joys section">
            <img src="/down.svg" alt="" aria-hidden="true" />
          </a>
        </div>

        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <section id="small-joys" className={styles.smallJoys} aria-label="Small joys">
          <h2 className={styles.smallJoysTitle}>Small Joys</h2>
          <div className={styles.smallJoysCloud}>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "8%", top: "18%" }}
            >
              <span
                className={`${styles.smallJoy} ${styles.smallJoyLarge}`}
              >
                Reading
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "88%", top: "82%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoyLarge}`}>
                Coffee
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "26%", top: "54%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoyLarge}`}>
                Basketball
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "28%", top: "22%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Slow Mornings
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "50%", top: "88%" }}
            >
              <span
                className={`${styles.smallJoy} ${styles.smallJoyLarge}`}
                style={{ transform: "translateX(-50%)" }}
              >
                Running
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "58%", top: "28%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoyLarge}`}>
                Thrifting
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "12%", top: "64%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Photography
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "20%", top: "44%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Videography
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "8%", top: "84%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Anime
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "14%", top: "92%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Manga
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "38%", top: "78%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Fashion
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "56%", top: "48%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Movies
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "44%", top: "36%" }}
            >
              <span
                className={`${styles.smallJoy} ${styles.smallJoySmall}`}
                style={{ transform: "translateX(-50%)" }}
              >
                Art
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "52%", top: "62%" }}
            >
              <span
                className={`${styles.smallJoy} ${styles.smallJoySmall}`}
                style={{ transform: "translateX(-50%)" }}
              >
                Video Essays
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "62%", top: "70%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Plants
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "70%", top: "50%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoyLarge}`}>
                Music
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "94%", top: "52%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Eating
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "84%", top: "24%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Snoopy
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "78%", top: "42%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Gaming
              </span>
            </span>
            <span
              className={styles.smallJoyWrap}
              style={{ left: "76%", top: "92%" }}
            >
              <span className={`${styles.smallJoy} ${styles.smallJoySmall}`}>
                Travelling
              </span>
            </span>
          </div>
        </section>
        </ScrollFade>

        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
        <section className={styles.contactSection} aria-label="Contact">
          <div className={styles.contactGrid}>
            <div className={styles.contactCopy}>
              <p>Just scratching</p>
              <p>the surface,</p>
              <p>perhaps you can</p>
              <p>
                <a href="/contact" className={styles.contactLink}>
                  Contact Me
                </a>{" "}
                =)
              </p>
            </div>
            <div className={styles.contactCollage}>
              <div className={styles.contactPlaceholder}>
                <img src="/about/1.jpeg" alt="" className={styles.contactCollageImg} />
              </div>
              <div className={styles.contactPlaceholder}>
                <img src="/about/3.jpg" alt="" className={styles.contactCollageImg} />
              </div>
              <div className={styles.contactPlaceholder}>
                <img src="/about/2.jpg" alt="" className={styles.contactCollageImg} />
              </div>
            </div>
          </div>
        </section>
        </ScrollFade>
      </main>
      <Footer />
    </div>
  );
}
