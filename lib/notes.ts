import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface Note {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  draft: boolean;
  content: string;
}

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

function parseNote(slug: string): Note {
  const filePath = path.join(NOTES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: rt.text,
    draft: (data.draft as boolean) ?? false,
    content,
  };
}

export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  const files = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((f) => parseNote(f.replace(/\.mdx$/, "")))
    .filter((n) => !n.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getNote(slug: string): Note | null {
  try {
    return parseNote(slug);
  } catch {
    return null;
  }
}

export function getAllNoteSlugs(): string[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
