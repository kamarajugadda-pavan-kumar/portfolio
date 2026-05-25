import Image from "next/image";
import { cn } from "@/lib/utils";

// Custom callout component used in MDX like: <Callout type="warning">...</Callout>
export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip" | "danger";
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    info: "border-blue-500/40 bg-blue-500/5 text-blue-400",
    warning: "border-yellow-500/40 bg-yellow-500/5 text-yellow-400",
    tip: "border-green-500/40 bg-green-500/5 text-green-400",
    danger: "border-red-500/40 bg-red-500/5 text-red-400",
  };
  const labels: Record<string, string> = {
    info: "ℹ Info",
    warning: "⚠ Warning",
    tip: "✅ Tip",
    danger: "🚨 Danger",
  };
  return (
    <div className={cn("my-6 rounded-lg border-l-4 p-4", styles[type])}>
      <div className="mb-1 text-xs font-semibold uppercase tracking-widest opacity-70">
        {labels[type]}
      </div>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

// Architecture diagram wrapper
export function ArchDiagram({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border border-border/60 bg-muted">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={630}
          className="w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Step component for problem → approach → result
export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 space-y-4 border-l-2 border-border/60 pl-5">
      {children}
    </div>
  );
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="absolute -left-[1.625rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-border/60 bg-background text-xs text-primary">
        ›
      </span>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <div className="mt-1 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
