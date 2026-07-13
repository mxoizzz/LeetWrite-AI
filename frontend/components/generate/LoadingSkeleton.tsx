import React from "react";

export function LoadingSkeleton() {
  return (
    <div className="space-y-space-6 animate-pulse p-6">
      {/* Title */}
      <div className="h-8 bg-surface-hover rounded-md w-3/4"></div>

      {/* Intuition */}
      <div className="space-y-space-2 mt-8">
        <div className="h-5 bg-surface-hover rounded-md w-full"></div>
        <div className="h-5 bg-surface-hover rounded-md w-5/6"></div>
        <div className="h-5 bg-surface-hover rounded-md w-4/6"></div>
      </div>

      {/* Approach */}
      <div className="space-y-space-2 mt-8">
        <div className="h-5 bg-surface-hover rounded-md w-1/4 mb-4"></div>
        <div className="h-5 bg-surface-hover rounded-md w-full"></div>
        <div className="h-5 bg-surface-hover rounded-md w-full"></div>
        <div className="h-5 bg-surface-hover rounded-md w-5/6"></div>
      </div>

      {/* Complexity */}
      <div className="space-y-space-2 mt-8">
        <div className="h-5 bg-surface-hover rounded-md w-1/3"></div>
        <div className="h-5 bg-surface-hover rounded-md w-1/3"></div>
      </div>

      {/* Code Block */}
      <div className="h-48 bg-surface-hover rounded-md w-full mt-8"></div>

      {/* Key Takeaways */}
      <div className="space-y-space-2 mt-8">
        <div className="h-5 bg-surface-hover rounded-md w-1/4 mb-4"></div>
        <div className="h-5 bg-surface-hover rounded-md w-3/4"></div>
        <div className="h-5 bg-surface-hover rounded-md w-2/3"></div>
      </div>
    </div>
  );
}
