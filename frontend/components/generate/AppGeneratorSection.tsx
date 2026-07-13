"use client";

import React, { useState } from "react";
import { InputPanel } from "@/components/generate/InputPanel";
import { PreviewPanel } from "@/components/generate/PreviewPanel";
import { GenerateInput, GenerateResponse, ApiError } from "@/lib/schemas";
import { generateDiscussion, ApiErrorResponse } from "@/lib/api";

export function AppGeneratorSection() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [activeTab, setActiveTab] = useState<"input" | "preview">("input");

  const handleGenerate = async (data: GenerateInput) => {
    setIsGenerating(true);
    setError(null);
    setActiveTab("preview");
    
    try {
      const result = await generateDiscussion(data);
      setResponse(result);
    } catch (err: any) {
      if (err instanceof ApiErrorResponse) {
        setError(err.errorData);
      } else {
        setError({ code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="app" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 z-10">
      <div className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          01 / Interactive
        </span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          LIVE APPLICATION
        </h2>
        <p className="mt-4 max-w-xl font-mono text-xs text-muted-foreground leading-relaxed">
          Paste your problem URL and accepted solution code below to see the magic happen.
        </p>
      </div>

      <div className="flex flex-col border border-border/40 overflow-hidden bg-background">
        {/* Mobile Tabs */}
        <div className="md:hidden flex p-2 border-b border-border/40 bg-accent/5">
          <button
            onClick={() => setActiveTab("input")}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider transition-colors ${
              activeTab === "input" ? "bg-accent/10 text-accent border border-accent/40" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Input
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider transition-colors ${
              activeTab === "preview" ? "bg-accent/10 text-accent border border-accent/40" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Preview
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
          {/* Input Panel */}
          <div className={`md:col-span-5 lg:col-span-4 p-4 border-r border-border/40 ${activeTab !== "input" ? "hidden md:block" : ""}`}>
            <InputPanel onGenerate={handleGenerate} isLoading={isGenerating} />
          </div>

          {/* Preview Panel */}
          <div className={`md:col-span-7 lg:col-span-8 p-4 bg-card/10 ${activeTab !== "preview" ? "hidden md:block" : ""}`}>
            <PreviewPanel data={response} isLoading={isGenerating} error={error} />
          </div>
        </div>
      </div>
    </section>
  );
}
