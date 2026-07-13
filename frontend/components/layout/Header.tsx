import React from "react";

export function Header() {
  return (
    <header className="border-b border-border-subtle bg-background">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo icon representation */}
          <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-xs font-mono">LW</span>
          </div>
          <span className="font-semibold text-text-primary text-base tracking-tight">LeetWrite AI</span>
        </div>
        <nav>
          <a
            href="https://github.com/mxoizzz/LeetWrite-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
