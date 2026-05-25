"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const stats = [
  { label: "Years of Experience", value: "3+" },
  { label: "Projects Shipped", value: "10+" },
  { label: "Technologies Used", value: "20+" },
  { label: "Enterprise Documents Processed", value: "50K+" },
];

const currentlyBuilding = [
  "Multimodal RAG systems for complex enterprise PDFs",
  "LangGraph-powered agentic workflows with human-in-the-loop",
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
                I&apos;m a Generative AI & ML Engineer based in Hyderabad,
                India, with ~3 years of Python application development
                experience. I specialise in building intelligent systems that
                sit at the intersection of large language models and real
                enterprise data — RAG pipelines, agentic automation, and
                document AI solutions that handle production scale.
              </p>
              <p>
                My recent work includes an enterprise-grade RAG system that
                processes 10,000+ heterogeneous documents using multimodal
                extraction (tables, charts, equations) and an agentic job
                search tool built on LangGraph that orchestrates Playwright
                browser automation with persistent SQLite state. I care deeply
                about system reliability, latency, and the boring details that
                separate prototypes from production.
              </p>
              <p>
                When I&apos;m not engineering AI systems, I write about
                technical challenges I&apos;ve worked through — chunking
                strategies for complex PDFs, tradeoffs in RAG retrieval, and
                practical lessons from deploying agentic workflows. I&apos;m
                actively targeting senior GenAI / ML engineering roles (CL8/CL9
                level) where I can drive architecture decisions.
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
                {[
                  "Python",
                  "LangChain",
                  "LangGraph",
                  "LlamaIndex",
                  "PyTorch",
                  "RAG",
                  "FAISS",
                  "ChromaDB",
                  "Docling",
                  "FastAPI",
                  "SQLite",
                  "Playwright",
                  "Docker",
                  "AWS",
                  "Azure",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border/60 bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                Open to Opportunities
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Actively seeking Senior GenAI / ML Engineer roles. CL8/CL9 target. Remote or Hyderabad.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
