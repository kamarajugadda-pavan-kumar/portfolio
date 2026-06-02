"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  function handleCopy() {
    const text = preRef.current?.querySelector("code")?.innerText ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="relative group my-6">
      <pre {...props} ref={preRef}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-muted/80 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}
