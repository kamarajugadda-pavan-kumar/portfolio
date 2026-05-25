import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { getProject, getAllProjectSlugs } from "@/lib/projects";
import { formatDate } from "@/lib/utils";
import { mdxOptions } from "@/lib/mdx";
import {
  Callout,
  ArchDiagram,
  Steps,
  Step,
} from "@/components/project/mdx-components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : [],
    },
  };
}

const mdxComponents = { Callout, ArchDiagram, Steps, Step };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 pb-32 pt-28 sm:px-6">
      {/* Back */}
      <Link
        href="/projects"
        className="mb-10 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDate(project.date)}
          </span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border/60 bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Hero image */}
      {project.image && project.image !== "/projects/placeholder.png" && (
        <div className="mb-12 overflow-hidden rounded-lg border border-border/60">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={630}
            className="w-full"
            priority
          />
        </div>
      )}

      {/* MDX content */}
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <MDXRemote
          source={project.content}
          // @ts-expect-error — rehype plugin types mismatch
          options={{ mdxOptions }}
          components={mdxComponents}
        />
      </article>
    </div>
  );
}
