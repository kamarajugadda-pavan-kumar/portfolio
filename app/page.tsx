import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects-section";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />
      <About />
      <ProjectsSection projects={featured} />
      <Skills />
      <Contact />
    </>
  );
}
