"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimatedNoise } from "@/components/animated-noise";
import { ScrambleTextOnHover } from "@/components/scramble-text";

export default function DocsPage() {
  const steps = [
    {
      number: "01",
      title: "Provide Your Code",
      content:
        "Start by pasting your successfully accepted LeetCode solution into the input editor. LeetWrite AI automatically detects the programming language, but you can explicitly set it using the dropdown if needed. It's recommended to include any helper functions your code relies on.",
    },
    {
      number: "02",
      title: "Configure Generation",
      content:
        "Select your desired explanation complexity. 'Detailed' is perfect for beginners and includes step-by-step walkthroughs, while 'Concise' is better for competitive programmers who just want the high-level intuition and complexity bounds. No complex prompting is required—our system handles the heavy lifting.",
    },
    {
      number: "03",
      title: "Review & Refine",
      content:
        "Click Generate. In seconds, LeetWrite AI produces a LeetCode-native Markdown document. The output is structured into standard sections: Intuition, Approach, Complexity (Time & Space), and the formatted Code block. You can manually edit the markdown in the preview panel to add your own personal flair.",
    },
    {
      number: "04",
      title: "Publish",
      content:
        "Once you're satisfied with the write-up, click 'Copy Markdown'. Navigate to the LeetCode discussion tab for the problem, click 'New Post', and paste your clipboard. The formatting is strictly tested to render perfectly in LeetCode's Markdown engine.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden pt-24 pb-32 px-6 md:px-28">
      <AnimatedNoise opacity={0.03} />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-sm px-6 md:px-12 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back to Application
        </Link>
        <span className="font-[var(--font-bebas)] text-xl tracking-widest text-foreground">
          LEETWRITE <span className="text-accent">DOCS</span>
        </span>
      </nav>

      <div className="max-w-4xl mx-auto mt-16">
        {/* Header */}
        <div className="mb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Documentation
          </span>
          <h1 className="mt-4 font-[var(--font-bebas)] text-6xl md:text-8xl tracking-tight uppercase">
            How to use LeetWrite
          </h1>
          <p className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl">
            A comprehensive guide to transforming your raw code into professional, 
            highly-readable LeetCode discussions. Follow these steps to maximize the quality of your output.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-12">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="relative border border-border/40 p-8 md:p-12 group hover:border-accent/40 transition-colors duration-500"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-accent transition-all duration-700 ease-out group-hover:w-full" />
              
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <div className="flex-none">
                  <span className="font-[var(--font-bebas)] text-6xl text-muted-foreground/20 group-hover:text-accent transition-colors duration-500">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-[var(--font-bebas)] text-3xl tracking-tight text-foreground mb-4">
                    {step.title.toUpperCase()}
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                    {step.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-32 border-t border-border/30 pt-16 flex flex-col items-center text-center">
          <h3 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-8">
            READY TO START WRITING?
          </h3>
          <Link
            href="/#app"
            className="group inline-flex items-center justify-center border border-accent bg-accent/10 px-8 py-4 font-mono text-xs uppercase tracking-widest text-accent hover:bg-accent hover:text-black transition-all duration-300"
          >
            <ScrambleTextOnHover text="Launch Generator" as="span" duration={0.6} />
          </Link>
        </div>
      </div>
    </main>
  );
}
