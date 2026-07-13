"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only run on desktop/devices with hover
    if (window.matchMedia("(hover: none)").matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15, // quick response but slight trail
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  return (
    <div
      ref={cursorRef}
      className={cn(
        "pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[9999] hidden md:block dark:mix-blend-difference",
        "w-8 h-8 rounded-full border-2 border-accent bg-accent/20",
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    />
  )
}
