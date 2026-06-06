"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Grid background */}
      <div
        className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        aria-hidden
      />
      {/* Gradient orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-primary/20 ring-offset-2 ring-offset-background">
            <Image
              src="/projects/avatar.jpeg"
              alt="Pavan Kumar"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
            Senior SWE / AI Engineer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          Hi, I&apos;m <span className="text-primary">Pavan Kumar</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Senior Software Engineer specialising in applied AI — I build{" "}
          <span className="text-foreground font-medium">
            Python & Node.js backends
          </span>
          , <span className="text-foreground font-medium">React frontends</span>
          , and{" "}
          <span className="text-foreground font-medium">
            LLM-powered systems
          </span>{" "}
          that ship to real users at enterprise scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/#projects">
              View Projects
              <ArrowDown className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a href="/pavan_kumar_kamarajugadda_resume.pdf" download>
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg" className="gap-2">
            <a
              href="/#contact"
              onClick={(e) => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-mono text-muted-foreground"
        >
          {[
            "Python",
            "Node.js",
            "React",
            "LangGraph",
            "RAG",
            "FastAPI",
            "GenAI",
          ].map((tech) => (
            <span key={tech} className="flex items-center gap-1.5">
              <span className="text-primary">▸</span> {tech}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-4 w-4 animate-bounce text-muted-foreground" />
      </motion.div>
    </section>
  );
}
