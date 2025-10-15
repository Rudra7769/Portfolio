import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection"; // Ensure this is imported
import ContactSection from "../components/ContactSection";
import MovingBanner from "../components/MovingBanner";

export default function Home() {
  return (
    <main className="bg-black">
      <HeroSection />
      <ProjectsSection />
      <SkillsSection /> {/* Ensure this line is present */}
      <ContactSection />
      <MovingBanner />
    </main>
  );
}