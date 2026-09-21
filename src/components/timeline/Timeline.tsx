"use client";

import { useEffect, useRef } from "react";
import { timelineEntries } from "@/data/timeline";
import { useSystemStore } from "@/store/useSystemStore";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { History, Calendar } from "lucide-react";

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const setActiveSection = useSystemStore((state) => state.setActiveSection);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => setActiveSection("SYSTEM LOG"),
        onEnterBack: () => setActiveSection("SYSTEM LOG"),
      });

      if (listRef.current) {
        const items = listRef.current.querySelectorAll(".timeline-entry");
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [setActiveSection]);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      data-component="<Timeline />"
      className="relative z-20 min-h-screen border-t border-[#1C1C1C] px-4 py-28 md:px-8"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#8A8A8A]">
        <div className="flex items-center space-x-3">
          <span className="text-[#B6FF3B]">SYSTEM LOG</span>
          <span className="text-[#404040]">::</span>
          <span>CHRONOLOGY</span>
        </div>
        <div className="flex items-center space-x-2 text-[#555]">
          <History className="h-3.5 w-3.5 text-[#B6FF3B]" />
          <span>VERIFIED RECORD</span>
        </div>
      </div>

      <div className="mt-8 max-w-2xl">
        <h2 className="font-display text-4xl font-bold tracking-tight text-[#F2F2F2] md:text-6xl">
          System Log
        </h2>
        <p className="mt-3 font-mono text-xs text-[#8A8A8A]">
          Factual chronology of engineering milestones, architectural transitions, and codebase developments.
        </p>
      </div>

      {/* Timeline Entries List */}
      <div ref={listRef} className="relative mt-16 border-l border-[#1C1C1C] pl-6 md:pl-10 space-y-12">
        {timelineEntries.map((entry) => (
          <div
            key={entry.id}
            className="timeline-entry relative group"
          >
            {/* Timeline node dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-3.5 w-3.5 rounded-none border border-[#333] bg-[#050505] transition-colors group-hover:border-[#B6FF3B] group-hover:bg-[#B6FF3B]" />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between font-mono text-xs">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold tracking-wider text-[#B6FF3B]">
                  {entry.year}
                </span>
                {entry.quarter && (
                  <span className="text-[#666]">[{entry.quarter}]</span>
                )}
              </div>
              <span className="text-[#888] uppercase">{entry.roleOrCategory}</span>
            </div>

            <h3 className="mt-2 font-display text-2xl font-bold text-[#F2F2F2]">
              {entry.title}
            </h3>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#A0A0A0]">
              {entry.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#222] bg-[#0A0A0A] px-2.5 py-1 font-mono text-[10px] text-[#777]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
