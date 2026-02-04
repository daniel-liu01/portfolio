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
  heroImage: "/forge/forge.jpg",
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
    <strong>high school students</strong> and <strong>young adults</strong>{" "}
    explore, experience, and choose their future with confidence.
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
              src="/forge/introMcok.png"
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
            as a business owner. So in the beginning, we thought the opportunity
            was to help out <strong>immigrant business owners</strong>.
            <br />
            <br />
            Based on the assumption that they cannot create a successful
            business due to the <strong>language barrier</strong>.
          </p>
        </ContentSection>
        <ContentSection
          title="Initial Ideation"
          variant="textLeftImagesRight"
          rightContent={
            <img
              src="/forge/initial.png"
              alt="Forge app mockups: business dashboard, step-by-step guide, and document input screens"
              className="content-section-image-single"
            />
          }
        >
          <p>
            I quickly made these mockups, a <strong>business dashboard</strong>{" "}
            doubling as a <strong>step by step guide</strong> to building a
            business. We were excited, convinced this is the idea going forward.
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
            src: "/forge/pivot.png",
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
        <ContentSection title="Assumption" variant="textRight">
          <p>
            So <strong>why</strong> high school students? Well it&apos;s
            apparent that there are a lot of opportunities in the coming years
            in skilled trades.
          </p>
          <p>
            With the older workers retiring and a relatively high average age
            for apprentice, there is potential for high school students to come
            in and fill the upcoming labour shortage.
          </p>
        </ContentSection>
        <ContentSection
          title="Primary Research"
          variant="textRight"
          bottomImages={[
            {
              src: "/forge/stat1.png",
              alt: "Have you ever considered a career in the trades? 9 responses. Yes 33.3%, No 66.7%",
            },
            {
              src: "/forge/stat2.png",
              alt: "Do you feel trades careers are explained well enough in schools? 9 responses. Yes 33.3%, No 66.7%",
            },
          ]}
        >
          <p>
            Our team also sent out a survey to local high school students to
            understand their concerns and motivations regarding skilled trades.
            We had 9 respondents in total.
          </p>
        </ContentSection>
        <ContentSection title="Key Findings" variant="textRight">
          <ul>
            <li>
              Most students <strong>don&apos;t consider</strong> skilled trades
              a viable career path
            </li>
            <li>
              Many students learn about skilled trades <strong>too late</strong>
            </li>
            <li>
              Students don&apos;t know a lot or have{" "}
              <strong>misconceptions</strong> about skilled trades
            </li>
            <li>
              High schools don&apos;t educate students enough about skilled
              trades
            </li>
            <li>
              Many students feel <strong>overwhelmed</strong> about the{" "}
              <strong>overabundance</strong> of information
            </li>
          </ul>
        </ContentSection>
        <ContentSection title="Opportunity" variant="textRight">
          <p>
            From our research findings, we can confirm that there is a clear
            opportunity to educate high school students about skilled trades.
          </p>
          <p>
            Helping teens understand the possibilities and opportunities in
            skilled trades would benefit both them <strong>and</strong> the
            skilled trades industry as a whole.
          </p>
        </ContentSection>
        <ContentSection title="Considerations" variant="textRight">
          <p>
            In this day and age, most students have their phones as their
            primary devices. So a mobile app is a no brainer.
          </p>
          <p>
            With attention span at an all time low (especially for teens), we
            wanted the information to be easily digestible.
          </p>
        </ContentSection>
        <ContentSection
          title="Wireframe"
          variant="textLeftImagesRight"
          rightContent={
            <img
              src="/forge/wireframe.png"
              alt="Grayscale wireframes: Home screen, Plumbing detail, Daily work schedule, Mentorship screen"
              className="content-section-image-single"
            />
          }
        >
          <p>Initial focus was on:</p>
          <ul>
            <li>Learning about careers in demand</li>
            <li>Finding local opportunities</li>
            <li>Talking to mentors</li>
          </ul>
        </ContentSection>
        <ContentSection title="Rushing" variant="textRight">
          <p>
            My team and I were already behind on schedule, so we quickly whipped
            up a mid-fi prototype.
          </p>
          <p>
            Not much changed in terms of functionality. Our core goal remained
            the same: helping students understand skilled trades careers and
            opportunities.
          </p>
        </ContentSection>
        <ContentSection
          title="Mid-Fi Prototype"
          variant="textLeftImagesRight"
          rightContent={
            <img
              src="/forge/midfi.png"
              alt="Mid-fidelity prototype screens: Home, Plumbing detail, Pathways, Careers in Demand"
              className="content-section-image-single"
            />
          }
        >
          <p>
            Colored mobile app screens showing the home flow, career detail,
            pathways, and careers in demand.
          </p>
        </ContentSection>
        <ContentSection
          title="Branding & Styling"
          variant="textRight"
          bottomImages={[
            {
              src: "/forge/type.jpg",
              alt: "Nunito Sans typography and font weights on orange background",
            },
            {
              src: "/forge/bento.png",
              alt: "Forge branding: logo, colors, graphics, and UI elements in bento layout",
            },
          ]}
          bottomImagesGrid="1fr 2fr"
        >
          <p>
            <strong>Color:</strong> The main color is orange, drawing a
            comparison to high-visibility vests and linking bright colors to
            improved mood and productivity.
          </p>
          <p>
            <strong>Graphics:</strong> The design philosophy for graphics is
            simple, cartoon-style to appeal to a younger audience.
          </p>
          <p>
            <strong>Typography:</strong> The typeface we decided on is Nunito
            Sans. It strikes the perfect balance between readability and
            playfulness.
          </p>
        </ContentSection>
        <ContentSection title="Realization" variant="textRight">
          <p>
            While our app provided clear information about skilled trades, the
            learning experience was <strong>too informative</strong> and{" "}
            <strong>not fun at all.</strong>
            <br />
            <br />
            I immediately thought of Duolingo
            and how colorful and fun it seems, which made me realize our
            experience lacked the same sense of playfulness and motivation.
          </p>
        </ContentSection>
        <ContentSection title="Incorporating Gamification" variant="textRight">
          <p>
            The team agreed that we need to incorporate some sort of{" "}
            <strong>gamification</strong> into our app.
          </p>
          <p>
            I suggested that we should make it a <strong>text-based</strong>{" "}
            game, leveraging AI to <strong>simulate a career</strong> from
            beginning to end. We could use storytelling to immerse students in
            the career journey from apprentice to red seal, engaging them with
            tasks and questions along the way.
          </p>
          <p>
            Considering the workload required if we were to make a visual-heavy
            game, this felt like the best solution.
          </p>
        </ContentSection>
        <ContentSection
          title="Redesign"
          variant="textRight"
          bottomImage={{
            src: "/forge/redesign.png",
            alt: "Career Simulation app mockups: introduction, work style preferences, career progression and badges, explore careers map",
          }}
          bottomImageNoShadow
        >
          <p>
            Four mobile mockups showing the Career Simulation flow: introduction
            with Anna, work style preferences, career progression with badges,
            and the explore careers map.
          </p>
        </ContentSection>
        <ContentSection title="Usability Testing" variant="textRight">
          <p>
            We conducted usability testing on our prototype across five tasks
            and received an average SUS score of 38.75 out of 50.
          </p>
        </ContentSection>
        <ContentSection
          title="Feedback"
          variant="textLeftImagesRight"
          rightContent={
            <img
              src="/forge/testing.png"
              alt="Usability testing participant feedback and SUS scores"
              className="content-section-image-single"
            />
          }
        >
          <p>
            <strong>Key Findings:</strong>
          </p>
          <ul>
            <li>Repetitive buttons</li>
            <li>Lack of control in simulation</li>
            <li>Too text heavy</li>
            <li>Fun factor is lacking</li>
          </ul>
        </ContentSection>
        <ContentSection title="Re-Redesign" variant="textRight">
          <p>
            For this iteration, the most important part was to remove the clunk
            and make it more fun.
          </p>
          <ul>
            <li>
              <strong>Onboarding:</strong> I added an onboarding section, where
              users answer a set of questions to determine which career path they
              go down.
            </li>
            <li>
              <strong>Scenarios:</strong> I also added scenarios where students
              can make a choice and diverge paths, so each simulation could be
              different. This along with the onboarding could greatly increase
              replay-ability.
            </li>
            <li>
              <strong>Redundancy:</strong> Lastly, I removed the repetitiveness
              in the home screen and navigation bar, making it easier to
              navigate and more straightforward.
            </li>
          </ul>
        </ContentSection>
      </main>
      <Footer />
    </div>
  );
}
