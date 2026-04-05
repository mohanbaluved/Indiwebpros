import React from "react";
import { cn } from "@/src/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
}

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Main Logo Container */}
      <div className={cn(
        "relative w-full h-full bg-indigo-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-indigo-500/20",
        iconClassName
      )}>
        {/* Abstract "W" and "P" shape using SVG */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-3/5 h-3/5 text-white"
        >
          {/* Stylized W/P path */}
          <path d="M4 8l4 8 4-8 4 8 4-8" className="opacity-90" />
          {/* The "i" dot or "Pro" accent */}
          <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
        </svg>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/10 rounded-full blur-sm" />
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-white/10 rounded-full blur-sm" />
      </div>
    </div>
  );
}
