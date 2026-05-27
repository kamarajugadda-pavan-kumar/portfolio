import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ProjectTag =
  | "RAG"
  | "Agents"
  | "ML"
  | "Tooling"
  | "Document AI"
  | "LLM"
  | "Automation";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: ProjectTag[];
  stack: string[];
  image: string;
  github?: string;
  demo?: string;
  featured: boolean;
  date: string;
  status: "live" | "in-progress" | "archived";
  displayPriority: number;
  content: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function parseProject(slug: string): Project {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    longDescription: data.longDescription as string,
    tags: (data.tags as ProjectTag[]) ?? [],
    stack: (data.stack as string[]) ?? [],
    image: (data.image as string) ?? "/projects/placeholder.png",
    github: data.github as string | undefined,
    demo: data.demo as string | undefined,
    featured: (data.featured as boolean) ?? false,
    date: data.date as string,
    status: (data.status as Project["status"]) ?? "live",
    displayPriority: (data.displayPriority as number) ?? 999,
    content,
  };
}

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  const slugs = files.map((f) => f.replace(/\.mdx$/, ""));
  return slugs
    .map(parseProject)
    .sort((a, b) => a.displayPriority - b.displayPriority);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | null {
  try {
    return parseProject(slug);
  } catch {
    return null;
  }
}

export function getAllProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
