"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const stats = [
  { label: "Years of Experience", value: "5+" },
  { label: "Projects Shipped", value: "7+" },
  // { label: "Technologies Used", value: "20+" },
  // { label: "Enterprise Documents Processed", value: "50K+" },
];

const coreStack = [
  "Python",
  "React",
  "Node.js (Express.js)",
  "FastAPI",
  "AWS",
  "GCP",
  "LangChain",
  "LangGraph",
  "RAG",
  "AgenticAI",
  "MongoDB",
  "Mysql",
  "Docker",
  "kubernetes",
];

const currentlyBuilding = [
  "Agentic job search tool — LangGraph + Playwright that autonomously finds, scores, and applies to roles end-to-end",
  "Multimodal RAG systems for complex enterprise PDFs",
  "Fine-tuning open-source LLMs with LoRA/PEFT",
  "Evaluation frameworks for RAG system quality",
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-16 lg:grid-cols-2 lg:gap-24"
        >
          {/* Text */}
          <div className="space-y-6">
            <motion.div variants={fadeInUp}>
              <span className="font-mono text-sm text-primary">01 / about</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                About Me
              </h2>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                I&apos;m a Senior Software Engineer with 5+ years of experience
                building production systems — Python & Node.js backends, React
                frontends, and cloud-deployed APIs. Over the last two years
                I&apos;ve gone deep on applied GenAI: RAG pipelines, agentic
                workflows, and LLM-powered applications that ship to real users
                at enterprise scale.
              </p>
              <p>
                One recent project is an enterprise-grade RAG system that
                processes 10,000+ heterogeneous documents — PDFs, tables,
                charts, and equations at production scale. Another is an agentic
                job search tool built on LangGraph that uses Playwright browser
                automation to autonomously find, score, and apply to roles,
                cutting manual effort by ~80%. I care deeply about system
                reliability, latency, and the details that separate prototypes
                from production.
              </p>
              <p>
                Outside of work, I&apos;m usually reading about whatever is
                moving fast in the tech world — research papers, engineering
                blogs, release notes. I enjoy picking up new tools and ideas and
                turning them into quick prototypes. Curiosity is the habit
                I&apos;m most proud of.I&apos;m actively targeting Senior
                Software engineer / AI Engineer roles where I can drive
                architecture decisions.
              </p>
            </motion.div>

            {/* Currently building */}
            <motion.div variants={fadeInUp} className="pt-2">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Currently Exploring
              </h3>
              <ul className="space-y-2">
                {currentlyBuilding.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-0.5 text-primary shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div variants={fadeInUp} className="space-y-6 lg:pt-12">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border/60 bg-card p-6"
                >
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border/60 bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Core Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {coreStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border/60 bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                Open to Opportunities
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Actively seeking Senior Software engineer / AI Engineer roles.
                Remote or Hyderabad.
              </p>
            </div> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
