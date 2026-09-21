"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { useSystemStore } from "@/store/useSystemStore";
import { ScrollTrigger } from "@/lib/gsap";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const setActiveSection = useSystemStore((state) => state.setActiveSection);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      onEnter: () => setActiveSection("03 / SELECTED WORK"),
      onEnterBack: () => setActiveSection("03 / SELECTED WORK"),
    });

    return () => trigger.kill();
  }, [setActiveSection]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      data-component="<Projects />"
      className="relative z-20 min-h-screen border-t border-[#1C1C1C] px-4 py-28 md:px-8"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#8A8A8A]">
        <div className="flex items-center space-x-3">
          <span className="text-[#B6FF3B]">03 / SELECTED WORK</span>
          <span className="text-[#404040]">::</span>
          <span>PRODUCTION_DEPLOYMENTS</span>
        </div>
        <div className="hidden sm:inline text-[#555]">
          FULL ARCHITECTURAL CASE STUDIES AVAILABLE
        </div>
      </div>

      <div className="mt-8 max-w-3xl">
        <h2 className="font-display text-4xl font-bold tracking-tight text-[#F2F2F2] md:text-6xl">
          Selected Systems & Products
        </h2>
        <p className="mt-4 text-base text-[#8A8A8A]">
          Engineered for scale, resilience, and tactile responsiveness. Each project highlights real architectural trade-offs, schemas, and interface engineering.
        </p>
      </div>

      {/* Projects Stack */}
      <div className="mt-16 space-y-12">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
