"use client";

import { useSystemStore } from "@/store/useSystemStore";

export function GridOverlay() {
  const xrayActive = useSystemStore((state) => state.xrayActive);

  // Only show grid overlay when developer X-Ray mode is explicitly activated
  if (!xrayActive) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 mx-auto max-w-[1920px] px-4 md:px-8"
    >
      {/* 12-column desktop grid, 4-column mobile */}
      <div className="grid h-full w-full grid-cols-4 md:grid-cols-12">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className={`h-full border-r border-[#141414] ${
              index === 0 ? "border-l border-[#141414]" : ""
            } ${index >= 4 ? "hidden md:block" : ""} ${
              xrayActive ? "border-[#222222] bg-[rgba(182,255,59,0.01)]" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
