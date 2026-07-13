"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  Check,
  ChevronDown,
  FileCode2,
  Wand2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-16">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
        {title.toUpperCase()}
      </h2>
      {sub && (
        <p className="mt-4 max-w-xl font-mono text-xs text-muted-foreground leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}

export function UsedBySection() {
  const logos = [
    "Palantir",
    "Ramp",
    "Retool",
    "Linear",
    "Vercel",
    "Supabase",
    "Framer",
    "Raycast",
  ];
  const doubled = [...logos, ...logos];
  return (
    <section className="relative border-y border-border/40 py-16 bg-accent/5 z-10 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 2rem)); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 md:px-28">
        <p className="mb-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Loved by engineers writing at
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-16 md:gap-24">
            {doubled.map((name, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-[var(--font-bebas)] text-3xl md:text-5xl tracking-widest text-foreground/20 hover:text-accent transition-colors duration-300"
              >
                {name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyLeetWriteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Header slide in
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards slide up
      const cards = gridRef.current?.querySelectorAll(":scope > div");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const manual = [
    "Blank page for every problem",
    "Inconsistent structure & tone",
    "Manual complexity write-up",
    "Formatting the code, again",
    "45+ minutes per discussion",
  ];
  const genericAI = [
    "Requires explicit prompting",
    "Hallucinates time/space complexity",
    "Conversational filler text",
    "Weird Markdown formatting quirks",
    "15+ mins of back-and-forth",
  ];
  const withUs = [
    "Zero prompting required",
    "Consistent LeetCode-native structure",
    "Accurate complexity analysis",
    "Code formatted, syntax-perfect",
    "First draft in seconds",
  ];

  return (
    <section id="comparison" ref={sectionRef} className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 z-10">
      <div ref={headerRef}>
        <SectionHeader
          eyebrow="03 / Comparison"
          title="Why LeetWrite"
          sub="Stop fighting with generic chatbots or starting from a blank page."
        />
      </div>
      <div ref={gridRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ComparisonCard
          tone="muted"
          title="Writing Manually"
          rows={manual}
          symbol="—"
        />
        <ComparisonCard
          tone="muted"
          title="Generic Chatbots"
          rows={genericAI}
          symbol="~"
        />
        <ComparisonCard
          tone="accent"
          title="With LeetWrite"
          rows={withUs}
          symbol={<Check className="h-3 w-3" />}
        />
      </div>
    </section>
  );
}

function ComparisonCard({
  tone,
  title,
  rows,
  symbol,
}: {
  tone: "muted" | "accent";
  title: string;
  rows: string[];
  symbol: React.ReactNode;
}) {
  const isAccent = tone === "accent";
  return (
    <div
      className={cn(
        "relative border p-8 flex flex-col overflow-hidden transition-all duration-500",
        isAccent ? "border-accent/60 bg-accent/5" : "border-border/40"
      )}
    >
      <div className="relative z-10 mb-10 flex items-center justify-between">
        <h3 className={cn(
          "font-[var(--font-bebas)] text-3xl tracking-tight",
          isAccent ? "text-accent" : "text-foreground"
        )}>
          {title.toUpperCase()}
        </h3>
        {isAccent && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent border border-accent/40 px-2 py-1">
            Recommended
          </span>
        )}
      </div>
      <ul className="relative z-10 space-y-4">
        {rows.map((row) => (
          <li key={row} className="flex items-start gap-4">
            <span
              className={cn(
                "mt-0.5 grid h-4 w-4 flex-none place-items-center",
                isAccent ? "text-accent" : "text-muted-foreground/60"
              )}
            >
              {symbol}
            </span>
            <span className={cn(
              "font-mono text-sm leading-relaxed",
              isAccent ? "text-foreground" : "text-muted-foreground"
            )}>
              {row}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FAQSection() {
  const faqs = [
    {
      q: "Is LeetWrite AI free to use?",
      a: "Yes — you can generate discussions for free on the hobby tier. Pro unlocks unlimited generations, private history and Markdown export presets.",
    },
    {
      q: "Does it store my solutions?",
      a: "Solutions are processed for generation and never used for training. You can delete your history at any time.",
    },
    {
      q: "Which languages are supported?",
      a: "Python, TypeScript, JavaScript, C++, Java, Go, Rust and Swift — with syntax-aware formatting for each.",
    },
    {
      q: "Can I edit the generated writeup?",
      a: "Absolutely. The editor gives you full control over every section before you publish.",
    },
    {
      q: "Do you support all LeetCode problems?",
      a: "Yes. If a problem has a public URL, LeetWrite AI can generate a discussion for it.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 z-10">
      <SectionHeader
        eyebrow="06 / FAQ"
        title="Answers, Quietly"
        sub="Everything you might want to know before writing your first discussion."
      />
      <div className="divide-y divide-border/40 border-y border-border/40">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <button
              key={f.q}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full flex-col items-start gap-2 py-6 text-left transition-colors hover:bg-accent/5 px-4 -mx-4"
            >
              <div className="flex w-full items-center justify-between gap-4">
                <span className={cn(
                  "font-[var(--font-bebas)] text-2xl tracking-tight transition-colors duration-300",
                  isOpen ? "text-accent" : "text-foreground group-hover:text-accent"
                )}>
                  {f.q.toUpperCase()}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 flex-none transition-transform duration-300",
                    isOpen ? "rotate-180 text-accent" : "text-muted-foreground group-hover:text-accent"
                  )}
                />
              </div>
              <div
                className={cn(
                  "grid w-full overflow-hidden font-mono text-xs leading-relaxed text-muted-foreground transition-all duration-300",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="min-h-0">
                  <p className="pt-4 pr-12">{f.a}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
