import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { getAllNotes } from "@/lib/notes";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Technical writing by Pavan Kumar on GenAI, RAG systems, and ML engineering.",
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
      <div className="mb-12">
        <span className="font-mono text-sm text-primary">notes</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Writing
        </h1>
        <p className="mt-3 text-muted-foreground">
          Technical deep-dives on GenAI engineering — things I&apos;ve learned
          the hard way.
        </p>
      </div>

      {notes.length === 0 ? (
        <p className="text-muted-foreground">Posts coming soon.</p>
      ) : (
        <div className="space-y-1">
          {notes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="group flex flex-col gap-2 rounded-lg border border-transparent px-4 py-5 transition-colors hover:border-border/60 hover:bg-card sm:flex-row sm:items-start sm:gap-6"
            >
              <span className="shrink-0 font-mono text-xs text-muted-foreground sm:pt-0.5">
                {formatDate(note.date)}
              </span>
              <div>
                <h2 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                  {note.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {note.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {note.readingTime}
                  </span>
                  {note.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-mono text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
