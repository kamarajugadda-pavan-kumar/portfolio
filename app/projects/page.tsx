import type { Metadata } from "next";
import { ProjectFilter } from "@/components/project/project-filter";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All projects by Pavan Kumar — RAG systems, agentic workflows, ML applications, and document AI.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6">
      <div className="mb-12">
        <span className="font-mono text-sm text-primary">projects</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          All Projects
        </h1>
        <p className="mt-3 text-muted-foreground">
          {projects.length} projects — filter by technology or domain.
        </p>
      </div>
      <ProjectFilter projects={projects} />
    </div>
  );
}
