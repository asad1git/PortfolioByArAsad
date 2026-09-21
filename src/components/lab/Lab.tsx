"use client";

import { useEffect, useRef, useState } from "react";
import { experiments, Experiment } from "@/data/experiments";
import { useSystemStore } from "@/store/useSystemStore";
import { ScrollTrigger } from "@/lib/gsap";
import { Beaker, ArrowUpRight, Terminal } from "lucide-react";

export function Lab() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedExp, setSelectedExp] = useState<Experiment | null>(null);

  const setActiveSection = useSystemStore((state) => state.setActiveSection);
  const setCursor = useSystemStore((state) => state.setCursor);
  const resetCursor = useSystemStore((state) => state.resetCursor);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      onEnter: () => setActiveSection("EXPERIMENT LAB"),
      onEnterBack: () => setActiveSection("EXPERIMENT LAB"),
    });

    return () => trigger.kill();
  }, [setActiveSection]);

  return (
    <section
      id="lab"
      ref={sectionRef}
      data-component="<Lab />"
      className="relative z-20 min-h-screen border-t border-[#1C1C1C] px-4 py-28 md:px-8"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#8A8A8A]">
        <div className="flex items-center space-x-3">
          <span className="text-[#B6FF3B]">04 / EXPERIMENT LAB</span>
          <span className="text-[#404040]">::</span>
          <span>R&D_INCUBATOR</span>
        </div>
        <div className="flex items-center space-x-2 text-[#555]">
          <Beaker className="h-3.5 w-3.5 text-[#B6FF3B]" />
          <span>BENCHMARKS & CONCEPTS</span>
        </div>
      </div>

      <div className="mt-8 max-w-3xl">
        <h2 className="font-display text-4xl font-bold tracking-tight text-[#F2F2F2] md:text-6xl">
          EXPERIMENT LAB
        </h2>
        <p className="mt-4 font-mono text-sm tracking-wide text-[#8A8A8A] md:text-base">
          &ldquo;Things I built because I wanted to know if I could.&rdquo;
        </p>
      </div>

      {/* Experiments Grid */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            onMouseEnter={() => setCursor("explore", "INSPECT")}
            onMouseLeave={resetCursor}
            onClick={() => setSelectedExp(exp)}
            className="group relative flex flex-col justify-between border border-[#1C1C1C] bg-[#0A0A0A] p-6 transition-all duration-300 hover:border-[#B6FF3B]/60 hover:bg-[#0F0F0F] cursor-pointer"
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4 font-mono text-[10px]">
                <span className="text-[#666]">{exp.codename}</span>
                <span
                  className={`px-1.5 py-0.5 font-semibold ${
                    exp.status === "ACTIVE R&D"
                      ? "bg-[#B6FF3B]/15 text-[#B6FF3B]"
                      : "bg-[#1C1C1C] text-[#8A8A8A]"
                  }`}
                >
                  {exp.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-6 font-display text-2xl font-bold text-[#F2F2F2] transition-colors group-hover:text-[#B6FF3B]">
                {exp.title}
              </h3>

              <div className="mt-1 font-mono text-[10px] text-[#7A7A7A] uppercase">
                {exp.category}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#8A8A8A]">
                {exp.description}
              </p>
            </div>

            {/* Bottom tags and action */}
            <div className="mt-8 border-t border-[#161616] pt-4">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="border border-[#222] bg-[#050505] px-2 py-0.5 font-mono text-[9px] text-[#777]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between font-mono text-[10px] text-[#B6FF3B]">
                <span>{exp.actionLabel}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Experiment Modal */}
      {selectedExp && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/85 p-4 backdrop-blur-md"
        >
          <div className="w-full max-w-lg border border-[#2A2A2A] bg-[#0D0D0D] p-6 sm:p-8 font-mono">
            <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
              <div className="flex items-center space-x-2 text-xs text-[#B6FF3B]">
                <Terminal className="h-4 w-4" />
                <span>{selectedExp.codename}</span>
              </div>
              <button
                onClick={() => setSelectedExp(null)}
                className="cursor-pointer border border-[#222] px-2 py-0.5 text-xs text-[#8A8A8A] hover:border-[#B6FF3B] hover:text-[#B6FF3B]"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="mt-6">
              <span className="text-[10px] text-[#666] uppercase">R&D PROTOTYPE SPEC</span>
              <h3 className="font-display text-3xl font-bold text-[#F2F2F2] mt-1">
                {selectedExp.title}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-[#A0A0A0]">
                {selectedExp.description}
              </p>

              <div className="mt-6 space-y-2 border-t border-[#1C1C1C] pt-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#666]">STATUS:</span>
                  <span className="text-[#B6FF3B]">{selectedExp.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">CATEGORY:</span>
                  <span className="text-[#F2F2F2]">{selectedExp.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">CORE RUNTIMES:</span>
                  <span className="text-[#F2F2F2]">{selectedExp.technologies.join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-[#1C1C1C] pt-4 text-[10px] text-[#555]">
              NOTE: Visual system ready for incoming production benchmarks and artifacts.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
