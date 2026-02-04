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
              src="/portrait.png"
              alt="Portrait of Daniel Liu"
              className="content-section-image-single"
            />
          }
        >
          <p>
            Hello! My name is Daniel. I am a UX/UI designer based in Vancouver. I
            originally grew up in Taiwan and moved to Canada at the age of 10. I
            am incredibly grateful for the opportunity of experiencing two very
            different cultures. It has taught me to adapt quickly to new
            environments and learn new skills with ease.
          </p>
          <p>
            I got into design back when I was taking a gap year from university. I
            told my friend I wasn&apos;t sure what direction my life/career was
            headed towards, and he told me: &quot;You should look into UX design,
            all they do is make buttons.&quot; I then went down the rabbit hole and
            here I am today. I love the creative aspect of this field, where I get
            to solve problems in a non-traditional, creative way.
          </p>
        </ContentSection>

        <section className={styles.enjoy}>
          <div className={styles.enjoyContainer}>
            <h2 className={styles.enjoyTitle}>Things I enjoy:</h2>
            <div className={styles.enjoyGrid}>
              <div className={styles.enjoyColumn}>
                <h3 className={styles.enjoySubtitle}>Sports</h3>
                <p className={styles.enjoyBody}>
                  I like staying active through mainly running and basketball. My
                  favorite distance is the 10k and favorite NBA player is Trae
                  Young.
                </p>
                <div className={styles.enjoyPlaceholder} aria-hidden="true" />
                <div className={styles.enjoyPlaceholder} aria-hidden="true" />
              </div>
              <div className={styles.enjoyColumn}>
                <h3 className={styles.enjoySubtitle}>Reading</h3>
                <p className={styles.enjoyBody}>
                  I am an avid reader. I mostly read non-fiction because I find it
                  more enjoyable and gives me that creative juice. Some of my
                  favorite reads recently are &quot;The Great Passage&quot; by Shion
                  Miura and &quot;When Breath Becomes Air&quot; by Paul Kalanithi.
                </p>
                <div className={styles.enjoyPlaceholder} aria-hidden="true" />
                <div className={styles.enjoyPlaceholder} aria-hidden="true" />
              </div>
              <div className={styles.enjoyColumn}>
                <h3 className={styles.enjoySubtitle}>Fashion</h3>
                <p className={styles.enjoyBody}>
                  I really enjoy thrifting. There was a period of time where
                  I&apos;d go every week to look for deals. Nowadays, I don&apos;t
                  need more clothes but I still find the urge to go from time to
                  time.
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

