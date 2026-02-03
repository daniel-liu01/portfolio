import "../globals.css";
import styles from "./page.module.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectSection from "@/components/project/ProjectSection";
import Introduction from "@/components/project/Introduction";
import ContentSection from "@/components/project/ContentSection";
import Quotes from "@/components/project/Quotes";

export const metadata = {
  title: "Forge | Daniel Liu",
  description: "Forge — UX Design/Research, Frontend Development. BCIT 2025.",
};

const forgeContent = {
  title: "Forge",
  readingTime: "10 minutes",
  heroImage: "/forge.jpg",
  heroImageAlt: "Forge project",
  meta: [
    { label: "Location", value: "BCIT" },
    { label: "Year", value: "2025" },
    { label: "Team", value: "8 members" },
    { label: "Focus", value: "UX Design/Research Frontend Development" },
  ],
};

const forgeIntroduction = (
  <>
    Gamifying skilled-trades discovery and helping{" "}
    <strong>high school students</strong> and{" "}
    <strong>young adults</strong> explore, experience, and choose their future
    with confidence.
  </>
);

const forgeQuotes = [
  {
    content: (
      <>
        <strong>4 million</strong> people in Canada work in the skilled trades,
        and that a large number will need to upskill while many will retire by
        2028.
      </>
    ),
    attribution: "Source",
    url: "https://www.rbc.com/en/economics/canadian-analysis/featured-analysis/insights/powering-up-preparing-canadas-skilled-trades-for-a-post-pandemic-economy/",
  },
  {
    content: (
      <>
        Approximately <strong>700,000</strong> skilled trades workers are
        expected to retire in Canada by 2028.
      </>
    ),
    attribution: "Source",
    url: "https://www.canada.ca/en/employment-social-development/news/2022/07/government-of-canada-invests-to-help-canadians-enter-skilled-trades.html",
  },
  {
    content: (
      <>
        The average age of an apprentice today is around <strong>27</strong>, a
        whole lot of them go to university first, don't get the jobs they want,
        and come back to the trades.
      </>
    ),
    attribution: "Source",
    url: "https://ca.news.yahoo.com/why-2026-may-best-time-024753837.html",
  },
];

export default function ForgePage() {
  return (
    <div>
      <Navbar activePage="" />
      <main className={styles.main}>
        <ProjectSection {...forgeContent} />
        <Introduction
          rightContent={
            <img
              src="/introMcok.png"
              alt="Career Simulation app screens"
              className="introduction-image"
            />
          }
        >
          {forgeIntroduction}
        </Introduction>
        <Quotes quotes={forgeQuotes} />
        <ContentSection
          title="Big numbers, What do they mean?"
          variant="textRight"
        >
          <p>
            To sum it up, there will be a <strong>shortage</strong> of labour
            for BC&apos;s skilled trades industry. Also, the average apprentice
            is <strong>not</strong> as young as expected.
          </p>
        </ContentSection>
        <ContentSection title="Expectations" variant="textRight">
          <p>
            We thought the problem was that it&apos;s hard to enter the business
            as a business owner. So in the beginning, we thought the
            opportunity was to help out{" "}
            <strong>immigrant business owners</strong>.
            <br />
            <br />
            Based on the assumption
            that they cannot create a successful business due to the{" "}
            <strong>language barrier</strong>.
          </p>
        </ContentSection>
        <ContentSection
          title="Initial Ideation"
          variant="textLeftImagesRight"
          rightContent={
            <img
              src="/initial.png"
              alt="Forge app mockups: business dashboard, step-by-step guide, and document input screens"
              className="content-section-image-single"
            />
          }
        >
          <p>
            I quickly made these mockups, a <strong>business dashboard</strong>{" "}
            doubling as a <strong>step by step guide</strong> to building a
            business. We were excited, convinced this is the idea going
            forward.
          </p>
        </ContentSection>
        <ContentSection title="Realization" variant="textRight">
          <p>
            The initial idea is not going to work due to too much research and
            logistics and it being a big undertaking.
          </p>
        </ContentSection>
        <ContentSection
          title="Pivot"
          variant="textRight"
          bottomImage={{
            src: "/pivot.png",
            alt: "Final idea board: value proposition, user flow, and feedback",
          }}
        >
          <p>
            We shifted from helping <strong>immigrant business owners</strong>{" "}
            back to brainstorming.
          </p>
          <p>
            We identified a gap in studying apprentices due to challenges like
            school/work, financial pressure, and information overload.
          </p>
          <p>
            The new focus: raising awareness for{" "}
            <strong>high school students</strong>.
          </p>
        </ContentSection>
      </main>
      <Footer />
    </div>
  );
}
