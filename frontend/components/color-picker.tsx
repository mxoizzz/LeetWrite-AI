"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const COLORS = [
  { id: "orange", label: "Orange", hex: "#f97316" }, // Approximation for the UI
  { id: "blue", label: "Blue", hex: "#3b82f6" },
  { id: "green", label: "Green", hex: "#22c55e" },
  { id: "magenta", label: "Magenta", hex: "#d946ef" },
  { id: "yellow", label: "Yellow", hex: "#eab308" },
];

export function ColorPicker() {
  const [activeColor, setActiveColor] = useState("orange");
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme-color");
    if (saved && COLORS.some((c) => c.id === saved)) {
      setActiveColor(saved);
      document.documentElement.setAttribute("data-color", saved);
    }
  }, []);

  const handleColorChange = (colorId: string) => {
    setActiveColor(colorId);
    document.documentElement.setAttribute("data-color", colorId);
    localStorage.setItem("theme-color", colorId);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-3">
      <div 
        className="group relative flex flex-col-reverse items-center gap-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div 
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-none border border-border/50 bg-background/80 backdrop-blur transition-colors hover:border-accent"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span 
            className="block h-4 w-4 rounded-full" 
            style={{ backgroundColor: COLORS.find(c => c.id === activeColor)?.hex }}
          />
        </div>
        
        {/* Expanded Palette and Theme Toggle */}
        <div className={cn(
          "absolute bottom-12 flex flex-col gap-2 p-2 border border-border/50 bg-background/95 backdrop-blur transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center border border-transparent transition-all duration-200 hover:border-border text-foreground mb-1"
            title="Toggle Light/Dark Mode"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          
          <div className="mb-1 text-center font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
            Color
          </div>
          {COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => handleColorChange(c.id)}
              className={cn(
                "group/btn relative flex h-8 w-8 items-center justify-center border transition-all duration-200",
                activeColor === c.id ? "border-foreground" : "border-transparent hover:border-border"
              )}
              title={c.label}
            >
              <span 
                className={cn(
                  "block transition-all duration-300",
                  activeColor === c.id ? "h-4 w-4 rounded-none" : "h-3 w-3 rounded-full"
                )}
                style={{ backgroundColor: c.hex }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
