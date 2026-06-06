"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  {
    href: "https://github.com/kamarajugadda-pavan-kumar",
    icon: GitHubIcon,
    label: "GitHub",
    handle: "kamarajugadda-pavan-kumar",
  },
  {
    href: "https://www.linkedin.com/in/pavan-kumar-kamarajugadda/",
    icon: LinkedInIcon,
    label: "LinkedIn",
    handle: "Pavan Kumar kamarajugadda",
  },
  {
    href: "https://x.com/lollapalooza_00",
    icon: XIcon,
    label: "Twitter / X",
    handle: "@lollapalooza_00",
  },
  {
    href: "mailto:kamarajugaddapavankumar@gmail.com",
    icon: Mail,
    label: "Email",
    handle: "kamarajugaddapavankumar@gmail.com",
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
        >
          <motion.div variants={fadeInUp}>
            <span className="font-mono text-sm text-primary">05 / contact</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Building something interesting? Let&apos;s talk — whether it&apos;s
              a technical deep-dive, an AI architecture discussion, or just an
              idea worth exploring.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {socialLinks.map(({ href, icon: Icon, label, handle }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-border/60 bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {label}
                  </div>
                  <div className="truncate font-mono text-xs text-muted-foreground">
                    {handle}
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
