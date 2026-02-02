import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import ProjectSection from "@/components/project/ProjectSection";
import Introduction from "@/components/project/Introduction";
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
  },
  {
    content: (
      <>
        Approximately <strong>700,000</strong> skilled trades workers are
        expected to retire in Canada by 2028.
      </>
    ),
    attribution: "Government of Canada",
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
  },
];

export default function ForgePage() {
  return (
    <div>
      <Navbar activePage="" />
      <main>
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
      </main>
    </div>
  );
}
