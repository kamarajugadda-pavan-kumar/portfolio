import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

const statusColors: Record<Project["status"], string> = {
  live: "bg-green-400",
  "in-progress": "bg-yellow-400",
  archived: "bg-slate-400",
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card transition-colors hover:border-primary/40">
      {/* Image */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-video overflow-hidden bg-muted"
        tabIndex={-1}
        aria-hidden
      >
        {project.image && project.image !== "/projects/placeholder.png" ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <span className="font-mono text-4xl text-muted-foreground/20">
              {project.title[0]}
            </span>
          </div>
        )}
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 px-2 py-0.5 text-xs text-muted-foreground backdrop-blur-sm">
          <span
            className={cn("h-1.5 w-1.5 rounded-full", statusColors[project.status])}
          />
          {project.status === "in-progress" ? "In Progress" : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div>
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-semibold text-foreground transition-colors hover:text-primary">
              {project.title}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border/60 bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="rounded-md border border-border/60 bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="mt-auto flex items-center gap-3 pt-1">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            Case study <ArrowRight className="h-3 w-3" />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repo`}
              className="ml-auto text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
