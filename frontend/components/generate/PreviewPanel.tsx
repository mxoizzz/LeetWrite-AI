"use client";

import React, { useState } from "react";
import { GenerateResponse, ApiError } from "@/lib/schemas";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewPanelProps {
  data: GenerateResponse | null;
  isLoading: boolean;
  error: ApiError | null;
}

export function PreviewPanel({ data, isLoading, error }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!data) return;
    
    const markdown = `
# ${data.title}

## Intuition
${data.intuition}

## Approach
${data.approach}

## Complexity
- Time complexity: ${data.timeComplexity}
- Space complexity: ${data.spaceComplexity}

## Code
${data.formattedCode}

## Key Takeaways
${data.keyTakeaways.map(t => `- ${t}`).join("\n")}
    `.trim();

    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  if (isLoading) {
    return (
      <div className="h-full bg-transparent overflow-hidden">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-transparent p-8 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-destructive mb-6" />
        <h3 className="font-[var(--font-bebas)] text-4xl text-foreground mb-4">FAILED TO GENERATE</h3>
        <p className="font-mono text-xs text-muted-foreground max-w-md leading-relaxed">{error.message}</p>
        <p className="text-[10px] text-destructive mt-6 uppercase tracking-[0.2em] font-mono border border-destructive/40 px-3 py-1 bg-destructive/10">ERR: {error.code}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full bg-transparent p-8 flex items-center justify-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">No discussion generated yet.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-transparent overflow-hidden relative">
      <div className="absolute top-6 right-6 z-10">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleCopy}
          className="h-9 rounded-none font-mono text-xs uppercase tracking-wider border-border/40 bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-3.5 w-3.5" />
              COPIED
            </>
          ) : (
            <>
              <Copy className="mr-2 h-3.5 w-3.5" />
              COPY MARKDOWN
            </>
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar pt-16">
        <div>
          <h1 className="font-[var(--font-bebas)] text-4xl md:text-5xl text-foreground tracking-tight mb-4 uppercase">{data.title}</h1>
        </div>

        <section>
          <h2 className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">01 / Intuition</h2>
          <div className="text-sm font-sans text-muted-foreground leading-relaxed whitespace-pre-wrap">{data.intuition}</div>
        </section>

        <section>
          <h2 className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">02 / Approach</h2>
          <div className="text-sm font-sans text-muted-foreground leading-relaxed whitespace-pre-wrap">{data.approach}</div>
        </section>

        <section>
          <h2 className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">03 / Complexity</h2>
          <ul className="space-y-3 font-mono text-sm text-foreground">
            <li className="flex items-center"><span className="text-muted-foreground w-16">TIME:</span> {data.timeComplexity}</li>
            <li className="flex items-center"><span className="text-muted-foreground w-16">SPACE:</span> {data.spaceComplexity}</li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">04 / Code</h2>
          <div className="bg-secondary/30 border border-border/40 p-6 overflow-x-auto relative group">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <pre className="text-xs font-mono text-foreground leading-loose">
              <code>{data.formattedCode}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-[10px] text-accent uppercase tracking-[0.2em] mb-4">05 / Takeaways</h2>
          <ul className="space-y-3 font-sans text-sm text-muted-foreground">
            {data.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-4 leading-relaxed">
                <span className="text-accent mt-1 text-xs">◆</span>
                {takeaway}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
