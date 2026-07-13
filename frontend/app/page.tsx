"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { InputPanel } from "@/components/generate/InputPanel";
import { PreviewPanel } from "@/components/generate/PreviewPanel";
import { GenerateInput, GenerateResponse, ApiError } from "@/lib/schemas";
import { generateDiscussion, ApiErrorResponse } from "@/lib/api";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [activeTab, setActiveTab] = useState<"input" | "preview">("input"); // for mobile

  const handleGenerate = async (data: GenerateInput) => {
    setIsGenerating(true);
    setError(null);
    setActiveTab("preview"); // auto-switch to preview on mobile
    
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
    <div className="min-h-full flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 max-w-[1120px] w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* Mobile Tabs */}
        <div className="md:hidden flex space-x-1 mb-4 p-1 bg-surface border border-border-subtle rounded-lg">
          <button
            onClick={() => setActiveTab("input")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "input" ? "bg-background text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Input
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "preview" ? "bg-background text-text-primary shadow-sm" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Preview
          </button>
        </div>

        {/* Desktop Two-Panel / Mobile Tabbed Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">
          
          {/* Input Panel */}
          <div className={`md:col-span-5 lg:col-span-4 h-[calc(100vh-180px)] md:h-[calc(100vh-100px)] ${activeTab !== "input" ? "hidden md:block" : ""}`}>
            <InputPanel onGenerate={handleGenerate} isLoading={isGenerating} />
          </div>

          {/* Preview Panel */}
          <div className={`md:col-span-7 lg:col-span-8 h-[calc(100vh-180px)] md:h-[calc(100vh-100px)] ${activeTab !== "preview" ? "hidden md:block" : ""}`}>
            <PreviewPanel data={response} isLoading={isGenerating} error={error} />
          </div>

        </div>
      </main>
    </div>
  );
}
