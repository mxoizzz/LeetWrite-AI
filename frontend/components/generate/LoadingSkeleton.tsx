import React from "react";

export function LoadingSkeleton() {
  return (
    <div className="h-full p-8 animate-pulse bg-transparent flex flex-col space-y-12">
      {/* Title */}
      <div>
        <div className="h-10 bg-accent/20 w-3/4 mb-4"></div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <div className="h-3 bg-border/40 w-24 mb-6"></div>
        <div className="h-4 bg-border/20 w-full"></div>
        <div className="h-4 bg-border/20 w-5/6"></div>
        <div className="h-4 bg-border/20 w-4/6"></div>
      </div>

      <div className="space-y-4">
        <div className="h-3 bg-border/40 w-24 mb-6"></div>
        <div className="h-4 bg-border/20 w-full"></div>
        <div className="h-4 bg-border/20 w-full"></div>
        <div className="h-4 bg-border/20 w-5/6"></div>
      </div>

      {/* Complexity */}
      <div className="space-y-4">
        <div className="h-3 bg-border/40 w-32 mb-6"></div>
        <div className="h-4 bg-border/20 w-1/3"></div>
        <div className="h-4 bg-border/20 w-1/3"></div>
      </div>

      {/* Code block */}
      <div className="space-y-4">
        <div className="h-3 bg-border/40 w-24 mb-6"></div>
        <div className="h-48 bg-secondary/30 border border-border/40 w-full"></div>
      </div>
    </div>
  );
}
