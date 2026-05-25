"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/project/project-card";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { type Project } from "@/lib/projects";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={fadeInUp}
            className="mb-16 flex items-end justify-between gap-4"
          >
            <div>
              <span className="font-mono text-sm text-primary">02 / projects</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Featured Projects
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                A selection of systems I&apos;ve designed and shipped. Each
                includes a full case study with architecture decisions and
                tradeoffs.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i < 2} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex justify-center sm:hidden"
          >
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all projects <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
