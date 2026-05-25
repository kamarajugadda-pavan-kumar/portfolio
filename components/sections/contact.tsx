"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Calendar } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";

const socialLinks = [
  {
    href: "https://github.com/pavankumar",
    icon: GitHubIcon,
    label: "GitHub",
    handle: "@pavankumar",
  },
  {
    href: "https://linkedin.com/in/pavankumar",
    icon: LinkedInIcon,
    label: "LinkedIn",
    handle: "Pavan Kumar",
  },
  {
    href: "https://twitter.com/pavankumar",
    icon: XIcon,
    label: "Twitter / X",
    handle: "@pavankumar",
  },
  {
    href: "mailto:pavankd12@gmail.com",
    icon: Mail,
    label: "Email",
    handle: "pavankd12@gmail.com",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-16 lg:grid-cols-2"
        >
          <div>
            <motion.div variants={fadeInUp}>
              <span className="font-mono text-sm text-primary">05 / contact</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Get in Touch
              </h2>
              <p className="mt-4 text-muted-foreground">
                I&apos;m open to senior AI engineering roles and interesting
                collaborations. Whether you have a specific role in mind or just
                want to discuss AI architecture, I&apos;d love to hear from you.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 space-y-3">
              {socialLinks.map(({ href, icon: Icon, label, handle }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-lg border border-border/60 bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-muted text-muted-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {label}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {handle}
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-6">
              <Button asChild variant="outline" className="gap-2">
                <a
                  href="https://cal.com/pavankumar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="h-4 w-4" />
                  Book a 30-min chat
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp}>
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
