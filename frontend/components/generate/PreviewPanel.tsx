"use client";

import React, { useState } from "react";
import { GenerateResponse, ApiError } from "@/lib/schemas";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertCircle } from "lucide-react";

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
${data.keyTakeaways.map(t => `- ${t}`).join("\\n")}
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
      <div className="h-full bg-surface border border-border-subtle rounded-lg overflow-hidden">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-surface border border-border-subtle rounded-lg p-8 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-error mb-4 opacity-80" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">That didn't go through</h3>
        <p className="text-sm text-text-secondary max-w-md">{error.message}</p>
        <p className="text-xs text-text-tertiary mt-4 uppercase tracking-wider font-mono">ERR: {error.code}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full bg-surface border border-border-subtle rounded-lg p-8 flex items-center justify-center">
        <p className="text-text-secondary text-sm">Your discussion will appear here</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-surface border border-border-subtle rounded-lg overflow-hidden relative">
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="secondary" 
          size="sm"
          onClick={handleCopy}
          className="h-8 shadow-subtle border-border-subtle bg-surface hover:bg-surface-hover"
        >
          {copied ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5 text-success" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-1.5 h-3.5 w-3.5" />
              Copy Markdown
            </>
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar pt-14">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight mb-2">{data.title}</h1>
        </div>

        <section>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Intuition</h2>
          <div className="text-base text-text-primary leading-relaxed whitespace-pre-wrap">{data.intuition}</div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Approach</h2>
          <div className="text-base text-text-primary leading-relaxed whitespace-pre-wrap">{data.approach}</div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Complexity</h2>
          <ul className="space-y-2 text-base text-text-primary">
            <li><span className="font-semibold text-text-secondary">Time:</span> {data.timeComplexity}</li>
            <li><span className="font-semibold text-text-secondary">Space:</span> {data.spaceComplexity}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Code</h2>
          <div className="bg-[#0f0f0f] border border-border-subtle rounded-md p-4 overflow-x-auto">
            <pre className="text-sm font-mono text-text-primary">
              <code>{data.formattedCode}</code>
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-base text-text-primary marker:text-text-tertiary">
            {data.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="leading-relaxed">{takeaway}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
