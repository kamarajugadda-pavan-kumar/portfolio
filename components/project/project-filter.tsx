"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./project-card";
import { type Project, type ProjectTag } from "@/lib/projects";
import { cn } from "@/lib/utils";

const ALL_TAG = "All";

interface ProjectFilterProps {
  projects: Project[];
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [active, setActive] = useState<string>(ALL_TAG);

  const tags = [
    ALL_TAG,
    ...Array.from(new Set(projects.flatMap((p) => p.tags))),
  ];

  const filtered =
    active === ALL_TAG
      ? projects
      : projects.filter((p) =>
          p.tags.includes(active as ProjectTag)
        );

  return (
    <div>
      {/* Filter bar */}
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by tag"
      >
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active === tag
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 bg-muted text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
            >
              <ProjectCard project={project} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          No projects with tag &quot;{active}&quot;.
        </p>
      )}
    </div>
  );
}
