"use client";

import { useEffect, useRef, useState } from "react";
import { Technology } from "@/data/technologies";
import { TechSpaceLauncher } from "./TechSpaceLauncher";
import { TechDetailPanel } from "./TechDetailPanel";
import { useSystemStore } from "@/store/useSystemStore";
import { ScrollTrigger } from "@/lib/gsap";

export function TechCore() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const setActiveSection = useSystemStore((state) => state.setActiveSection);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      onEnter: () => setActiveSection("TECH CORE"),
      onEnterBack: () => setActiveSection("TECH CORE"),
    });

    return () => trigger.kill();
  }, [setActiveSection]);

  return (
    <section
      id="tech-core"
      ref={sectionRef}
      data-component="<TechCore />"
      className="relative z-20 min-h-screen border-t border-[#1C1C1C] px-4 py-28 md:px-8"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#8A8A8A]">
        <div className="flex items-center space-x-3">
          <span className="text-[#B6FF3B]">TECH CORE</span>
          <span className="text-[#404040]">::</span>
          <span>SYSTEM_PRIMITIVES</span>
        </div>
        <div className="hidden sm:inline text-[#555]">
          INTERACTIVE 2D LAUNCHER [HOVER / CLICK PLANETS TO TARGET & FIRE]
        </div>
      </div>

      <div className="mt-8 max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-[#F2F2F2] md:text-5xl">
          Core Technologies
        </h2>
        <p className="mt-3 font-mono text-xs text-[#8A8A8A]">
          Mothership (Abdul Rahman Asad) on the left firing plasma probes with green trailing tails into specialized skill planets on the right. Hover or click any planet to target and inspect specifications.
        </p>
      </div>

      {/* 2D Space Launcher Canvas */}
      <div className="mt-12">
        <TechSpaceLauncher
          selectedTechId={selectedTech?.id}
          onSelectTech={(tech) =>
            setSelectedTech((prev) => (prev?.id === tech.id ? null : tech))
          }
        />
      </div>

      {/* Side detail modal */}
      <TechDetailPanel
        technology={selectedTech}
        onClose={() => setSelectedTech(null)}
      />
    </section>
  );
}
