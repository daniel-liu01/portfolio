import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContentSection from "@/components/project/ContentSection";
import styles from "./page.module.css";

export const metadata = {
  title: "About | Daniel Liu",
  description: "About Daniel Liu",
};

export default function AboutPage() {
  return (
    <div>
      <Navbar activePage="about" />
      <main className={styles.aboutMain}>
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

        <section className={styles.smallJoys} aria-label="Small joys">
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

        <section className={styles.enjoy}>
          <div className={styles.enjoyContainer}>
            <h2 className={styles.enjoyTitle}>Things I enjoy:</h2>
            <div className={styles.enjoyGrid}>
              <div className={styles.enjoyColumn}>
                <h3 className={styles.enjoySubtitle}>Sports</h3>
                <p className={styles.enjoyBody}>
                  I like staying active through mainly running and basketball.
                  My favorite distance is the 10k and favorite NBA player is
                  Trae Young.
                </p>
                <div className={styles.enjoyPlaceholder} aria-hidden="true" />
                <div className={styles.enjoyPlaceholder} aria-hidden="true" />
              </div>
              <div className={styles.enjoyColumn}>
                <h3 className={styles.enjoySubtitle}>Reading</h3>
                <p className={styles.enjoyBody}>
                  I am an avid reader. I mostly read non-fiction because I find
                  it more enjoyable and gives me that creative juice. Some of my
                  favorite reads recently are &quot;The Great Passage&quot; by
                  Shion Miura and &quot;When Breath Becomes Air&quot; by Paul
                  Kalanithi.
                </p>
                <div className={styles.enjoyPlaceholder} aria-hidden="true" />
                <div className={styles.enjoyPlaceholder} aria-hidden="true" />
              </div>
              <div className={styles.enjoyColumn}>
                <h3 className={styles.enjoySubtitle}>Fashion</h3>
                <p className={styles.enjoyBody}>
                  I really enjoy thrifting. There was a period of time where
                  I&apos;d go every week to look for deals. Nowadays, I
                  don&apos;t need more clothes but I still find the urge to go
                  from time to time.
                </p>
                <div className={styles.enjoyPlaceholder} aria-hidden="true" />
                <div className={styles.enjoyPlaceholder} aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
