"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  BarChart3,
  FileText,
  Layers,
} from "lucide-react";
import { skillGroups } from "@/data/skills";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 className="h-4 w-4" />,
  cpu: <Cpu className="h-4 w-4" />,
  "bar-chart": <BarChart3 className="h-4 w-4" />,
  "file-text": <FileText className="h-4 w-4" />,
  layers: <Layers className="h-4 w-4" />,
};

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeInUp} className="mb-16">
            <span className="font-mono text-sm text-primary">03 / skills</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Technical Skills
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Tools and technologies I use to build production AI systems.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <motion.div
                key={group.category}
                variants={fadeInUp}
                className="rounded-lg border border-border/60 bg-card p-6"
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 bg-muted text-primary">
                    {iconMap[group.icon]}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border/60 bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
