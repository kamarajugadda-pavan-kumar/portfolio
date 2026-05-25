import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { getNote, getAllNoteSlugs } from "@/lib/notes";
import { formatDate } from "@/lib/utils";
import { mdxOptions } from "@/lib/mdx";
import { Callout } from "@/components/project/mdx-components";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.description,
  };
}

const mdxComponents = { Callout };

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 pb-32 pt-28 sm:px-6">
      <Link
        href="/notes"
        className="mb-10 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All notes
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-mono text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {note.title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{note.description}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formatDate(note.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {note.readingTime}
          </span>
        </div>
      </header>

      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <MDXRemote
          source={note.content}
          // @ts-expect-error — rehype plugin types mismatch
          options={{ mdxOptions }}
          components={mdxComponents}
        />
      </article>
    </div>
  );
}
