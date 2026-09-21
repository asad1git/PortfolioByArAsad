"use client";

import { useEffect, useRef, useState } from "react";
import { Technology } from "@/data/technologies";
import { X, Cpu, CheckCircle2 } from "lucide-react";

interface TechDetailPanelProps {
  technology: Technology | null;
  onClose: () => void;
}

export function TechDetailPanel({ technology, onClose }: TechDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [displayedTech, setDisplayedTech] = useState<Technology | null>(technology);

  useEffect(() => {
    if (technology) {
      setDisplayedTech(technology);
    }
  }, [technology]);

  // Handle dismissal via ESC, Page Scroll, Wheel, or Touch
  useEffect(() => {
    if (!technology) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const initialY = window.scrollY;
    let initialTouchY: number | null = null;

    const handleScroll = () => {
      if (Math.abs(window.scrollY - initialY) > 15) {
        onClose();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Allow internal scrolling if inside panel
      if (panelRef.current && panelRef.current.contains(e.target as Node)) {
        return;
      }
      if (Math.abs(e.deltaY) > 4) {
        onClose();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        initialTouchY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (panelRef.current && panelRef.current.contains(e.target as Node)) {
        return;
      }
      if (initialTouchY !== null && e.touches[0]) {
        const diff = Math.abs(e.touches[0].clientY - initialTouchY);
        if (diff > 20) {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [technology, onClose]);

  if (!displayedTech) return null;

  const isOpen = Boolean(technology);

  return (
    <>
      {/* Click-outside backdrop overlay strictly below top header (top-12) */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-x-0 bottom-0 top-12 z-30 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in Panel positioned strictly below top header (top-12) from the left */}
      <div
        ref={panelRef}
        role="dialog"
        aria-labelledby="tech-panel-title"
        aria-modal="true"
        className={`fixed bottom-0 left-0 top-12 z-40 flex w-full max-w-md flex-col justify-between overflow-y-auto border-r border-[#1F1F1F] bg-[#0A0A0A]/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out md:p-8 ${
          isOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
        }`}
      >
        <div>
          {/* Top bar with close button */}
          <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
            <div className="flex items-center space-x-2 font-mono text-[11px] text-[#B6FF3B]">
              <Cpu className="h-4 w-4" />
              <span>NODE_SPECIFICATION</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close tech details panel"
              className="cursor-pointer border border-[#222] p-1.5 text-[#8A8A8A] hover:border-[#B6FF3B] hover:text-[#B6FF3B]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Header */}
          <div className="mt-8">
            <span className="font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
              TECHNOLOGY
            </span>
            <h3
              id="tech-panel-title"
              className="font-display text-3xl font-bold tracking-tight text-[#F2F2F2] mt-1"
            >
              {displayedTech.name}
            </h3>
          </div>

          {/* Spec Grid */}
          <div className="mt-8 space-y-6 font-mono text-xs">
            <div>
              <div className="text-[10px] text-[#555] uppercase">CATEGORY</div>
              <div className="mt-1 text-[#F2F2F2]">{displayedTech.category}</div>
            </div>

            <div>
              <div className="text-[10px] text-[#555] uppercase">STATUS</div>
              <div className="mt-1 flex items-center space-x-2 text-[#B6FF3B]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{displayedTech.status}</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] text-[#555] uppercase">USED IN PRODUCTION</div>
              <div className="mt-2 space-y-1.5">
                {displayedTech.usedIn.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 rounded-sm bg-[#121212] px-3 py-1.5 text-[#E0E0E0]"
                  >
                    <span className="h-1 w-1 bg-[#B6FF3B]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-[#555] uppercase">ARCHITECTURAL ROLE</div>
              <p className="mt-2 font-body text-sm leading-relaxed text-[#A0A0A0]">
                {displayedTech.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Dismissal Instructions */}
        <div className="border-t border-[#1A1A1A] pt-4 font-mono text-[10px] text-[#555] flex items-center justify-between">
          <span>PRESS [ESC], SCROLL, OR CLICK OUTSIDE</span>
          <button
            onClick={onClose}
            className="cursor-pointer text-[#8A8A8A] underline hover:text-[#B6FF3B]"
          >
            DISMISS
          </button>
        </div>
      </div>
    </>
  );
}
