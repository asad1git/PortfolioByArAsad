"use client";

import { useRef } from "react";
import Link from "next/link";
import { ProjectData } from "@/data/projects";
import { useSystemStore } from "@/store/useSystemStore";
import { ArrowUpRight, Layers } from "lucide-react";

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const setCursor = useSystemStore((state) => state.setCursor);
  const resetCursor = useSystemStore((state) => state.resetCursor);

  return (
    <article
      ref={cardRef}
      className="group relative border border-[#1A1A1A] bg-[#0A0A0A] p-6 transition-all duration-300 hover:border-[#B6FF3B]/50 hover:bg-[#0E0E0E] md:p-10"
    >
      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={() => setCursor("view", "VIEW")}
        onMouseLeave={resetCursor}
        className="block"
      >
        {/* Top Row: Index & Category */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-6 font-mono text-[11px] tracking-widest text-[#8A8A8A]">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-[#B6FF3B]">0{index + 1}</span>
            <span className="text-[#333]">/</span>
            <span>{project.category}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{project.year}</span>
            <ArrowUpRight className="h-4 w-4 text-[#8A8A8A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#B6FF3B]" />
          </div>
        </div>

        {/* Hero Visual Blueprint / Simulated Viewport */}
        <div className="relative mt-8 h-64 w-full overflow-hidden border border-[#1C1C1C] bg-[#060606] transition-transform duration-500 group-hover:scale-[1.01] sm:h-80 md:h-96">
          {/* Blueprint grid background */}
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Abstract System UI Wireframe */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#7A7A7A]">
              <span>APP_SHELL: {project.slug.toUpperCase()}_v1.0</span>
              <span className="flex items-center space-x-1.5 text-[#B6FF3B]">
                <Layers className="h-3 w-3" />
                <span>ACTIVE SPEC</span>
              </span>
            </div>

            <div className="my-auto max-w-lg">
              <div className="font-mono text-xs tracking-widest text-[#B6FF3B] uppercase">
                {project.category}
              </div>
              <h3 className="font-display text-4xl font-bold tracking-tight text-[#F2F2F2] md:text-6xl">
                {project.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A0A0A0] md:text-sm line-clamp-2">
                {project.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="border border-[#222] bg-[#0E0E0E] px-2.5 py-1 font-mono text-[10px] text-[#8A8A8A] group-hover:border-[#333] group-hover:text-[#F2F2F2]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Project Metadata Footer */}
        <div className="mt-8 flex flex-col justify-between gap-4 font-mono text-xs sm:flex-row sm:items-center">
          <div>
            <span className="text-[10px] text-[#555] uppercase">ENGINEERING ROLE</span>
            <div className="mt-0.5 text-[#F2F2F2]">{project.role}</div>
          </div>

          <div className="flex items-center space-x-2 text-[#B6FF3B]">
            <span className="text-[11px] font-semibold tracking-wider">
              EXPLORE CASE STUDY
            </span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </Link>
    </article>
  );
}
