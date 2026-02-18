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
  heroImageAlt:
    "LevelUp app — fitness companion with pink slime character, workout plans, and stats",
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
          <ContentSection title="The Start" variant="textRight">
            <p>
              A developer friend invited me to participate in a hackathon. I
              then asked one of our mutual friend to join in with us, forming a
              team of 3.
            </p>
            <p>
              It&apos;s for RevenueCat&apos;s annual hackathon, Shipaton. The
              only requirements are that it&apos;s a mobile app and includes
              subscription-based monetization.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection title="Concept Choice" variant="textRight">
            <p>
              One member of our team frequently goes to the gym. His problem is
              that sometimes he finds himself taking <strong>too long</strong>{" "}
              of a break between sets.
            </p>
            <p>
              He also observed that other people do the same, always glued to
              their phones soon as they finish a set of a workout.
            </p>
            <p>
              <strong>This pattern highlighted a common problem</strong>:{" "}
              unstructured rest time combined with phone distraction reduces
              focus, intensity, and efficiency during workouts.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Initial Ideation"
            variant="textLeftImagesRight"
            rightContentNoShadow
            rightContent={
              <img
                src="/levelup/initial.png"
                alt="LevelUp initial mockups — home, steps, Push Day workout, rest time minigame"
                className="content-section-image-single"
              />
            }
          >
            <p>I quickly made these mockups, it&apos;s a simple fitness app.</p>
            <p>
              The core feature we focused on was integrating short minigames
              between workout sets.
            </p>
            <p>
              These games last for the duration of the rest period, helping
              users stay engaged without over-resting.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Virtual Pet"
            variant="textLeftImagesRight"
            rightContentNoShadow
            rightContent={
              <img
                src="/levelup/finalSlime.png"
                alt="LevelUp virtual pet evolution — simple face to evolved pink slime with flexing biceps"
                className="content-section-image-single"
              />
            }
          >
            <p>Our standout element is the virtual Pet.</p>
            <p>
              It&apos;s a digital companion that grows alongside you as you
              complete workouts.
            </p>
            <p>
              You workout, you get food to feed the pet and help it gain
              experience points as it grows
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Pet Illustration"
            variant="textLeftImagesRight"
            rightContentNoShadow
            rightContent={
              <img
                src="/levelup/slimes.png"
                alt="LevelUp slime character expressions and poses — neutral, sleepy, flexing, happy, dashing, level up, angry"
                className="content-section-image-single"
              />
            }
          >
            <p>
              I chose slime as the virtual pet
              <br />
              for its simplicity and versatility.
            </p>
            <p>
              It&apos;d be easy to customize with just
              <br />
              colors and additional elements.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection title="Dev Review" variant="textRight">
            <p>
              The developers gave me the okay. Since time is limited, they
              wanted me
              <br />
              to work on implementing colors and real graphical assets right
              away.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Workout Graphics"
            variant="textLeftImagesRight"
            rightContentNoShadow
            rightContent={
              <img
                src="/levelup/Workout.png"
                alt="LevelUp workout illustration — barbell bench press isometric and exercise card"
                className="content-section-image-single"
              />
            }
          >
            <p>
              For the workout images, I planned
              <br />
              to use an API so it would be easy
              <br />
              to implement and scale.
            </p>
            <p>
              Workout API felt most aligned with
              <br />
              my design approach for it&apos;s simple
              <br />
              yet cartoony style.
            </p>
            <p>
              Though I used vector images as
              <br />
              placeholders in my prototype as we
              <br />
              weren&apos;t ready to make the purchase
              <br />
              yet.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Colours"
            variant="textRight"
            bottomImage={{
              src: "/levelup/lvlbento.png",
              alt: "LevelUp colour palette, stats card, bench press card, and buttons",
            }}
            bottomImageNoShadow
          >
            <p>
              The app uses a light, green-focused colour palette, chosen to
              reinforce themes of{" "}
              <strong>health, growth, and positive progression</strong>.
            </p>
            <p>
              Originally, I’d wanted to use a bright orange as the main color,
              but it doesn’t go well with the cartoon style assets. Also, the
              softer tones makes the app feel approachable rather than intense.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection title="Typography" variant="textRight">
            <p>
              For typography, I chose Nunito for its rounded feel and wide range
              of bold weights. It compliments the playful nature and is easy to
              work with.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Hi-Fi Mockup"
            variant="textLeftImagesRight"
            rightContentNoShadow
            rightContent={
              <img
                src="/levelup/FinalLook.png"
                alt="LevelUp high-fidelity screens — home, calories, Push Day workout, goal progress"
                className="content-section-image-single"
              />
            }
          >
            <p>
              Four high-fidelity screens demonstrate the final UI: a home
              <br />
              dashboard with stats and daily quests, calories tracking with the
              <br />
              pink companion, a Push Day workout plan with exercises and
              <br />
              rest times, and a goal visual with the basketball hoop and score.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Minigames"
            variant="textLeftImagesRight"
            rightContentNoShadow
            rightContent={
              <img
                src="/levelup/minigames.png"
                alt="LevelUp minigame screens — timer, basketball hoop, rest time"
                className="content-section-image-single"
              />
            }
          >
            <p>I wanted to keep these easy for everyone.</p>
            <p>
              Something that feels easy but rewarding and fun to play at the
              same time.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection title="Challenge" variant="textRight">
            <p>
              The challenge was in the timing—what happens when your rest time
              ends and you&apos;re still playing?
            </p>
            <p>
              As a temporary solution, I chose to automatically end the game
              when the rest timer finishes to keep workouts on track.
            </p>
            <p>
              Some alternatives I thought of was to either allow users to
              continue on their next rest or ensure each minigame fits the rest
              time provided.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Workout"
            variant="textLeftImagesRight"
            rightContentNoShadow
            rightContent={
              <img
                src="/levelup/bad.png"
                alt="LevelUp Push Day workout screen with annotations on clarity and navigation"
                className="content-section-image-single"
              />
            }
          >
            <p>
              I needed to remind myself a few times that the core of this app is
              working out.
            </p>
            <p>
              It&apos;s not very clear what and where to click, so I&apos;ve
              gone back and refined it.
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
            bottomImage={{
              src: "/levelup/redesign.png",
              alt: "LevelUp workout screen before and after redesign — numbering and greyed-out elements",
            }}
            bottomImageNoShadow
          >
            <p>
              I added a numbering system so the workouts will have more
              structure. I also greyed out elements that are not active.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Experience Progression"
            variant="textLeftImagesRight"
            rightContentNoShadow
            rightContent={
              <img
                src="/levelup/lvlhome.png"
                alt="LevelUp home screen — pet level and experience progression from Lvl 30 to Lvl 98"
                className="content-section-image-single"
              />
            }
          >
            <p>
              Instead of gaining food and feeding the pet, I decided it&apos;s
              better to just give experience points altogether.
            </p>
            <p>This skips a step that could feel redundant over time.</p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection title="Aftermath" variant="textRight">
            <p>
              On the day of the sprint, where we were supposed to get most of
              the work done on the coding side of things. We were heavily
              distracted and ended up just eating, chatting, and playing
              basketball.
            </p>
            <p>
              It&apos;s a shame but I was happy to be able to tackle a design
              problem as the sole designer regardless of the outcome of this
              hackathon.
            </p>
          </ContentSection>
        </ScrollFade>
        <ScrollFade
          wrapperClassName={styles.scrollFadeWrap}
          visibleClassName={styles.scrollFadeVisible}
        >
          <ContentSection
            title="Retrospective"
            variant="textLeftImagesRight"
            rightContentNoShadow
            rightContent={
              <img
                src="/levelup/retro.png"
                alt="LevelUp slime characters — sleepy with Zzz and angry expression"
                className="content-section-image-single"
              />
            }
          >
            <p>
              There are still lots of possible additions that could take this
              app further.
            </p>
            <p>
              Elements such as customization, friend leaderboard, daily
              challenges, etc.
            </p>
            <p>
              When I&apos;m feeling up for the challenge, I&apos;ll definitely
              come back to this project and make it even better.
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
      <BackToTop />
      <ScrollProgress />
    </div>
  );
}
