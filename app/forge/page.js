import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import ProjectSection from "@/components/project/ProjectSection";

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
    { label: "Focus", value: "UX Design/Research, Frontend Development" },
  ],
};

export default function ForgePage() {
  return (
    <div>
      <Navbar activePage="" />
      <main>
        <ProjectSection {...forgeContent} />
      </main>
    </div>
  );
}
