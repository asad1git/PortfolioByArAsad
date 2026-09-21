"use client";

import { useRef } from "react";
import Link from "next/link";
import { ProjectData } from "@/data/projects";
import { useSystemStore } from "@/store/useSystemStore";
import { ArrowUpRight, ExternalLink, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

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
      className="group relative border border-[#1A1A1A] bg-[#0A0A0A] p-5 transition-all duration-300 hover:border-[#B6FF3B]/50 hover:bg-[#0E0E0E] sm:p-6 md:p-10"
    >
      {/* Clickable Header & Blueprint Section */}
      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={() => setCursor("view", "VIEW")}
        onMouseLeave={resetCursor}
        className="block"
      >
        {/* Top Row: Index & Category */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4 md:pb-6 font-mono text-[11px] tracking-widest text-[#8A8A8A]">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-[#B6FF3B]">0{index + 1}</span>
            <span className="text-[#333]">/</span>
            <span className="truncate max-w-[200px] sm:max-w-none">{project.category}</span>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span>{project.year}</span>
            <ArrowUpRight className="h-4 w-4 text-[#8A8A8A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#B6FF3B]" />
          </div>
        </div>

        {/* Hero Visual Blueprint / Simulated Viewport */}
        <div className="relative mt-6 md:mt-8 min-h-[290px] sm:min-h-[320px] md:h-96 w-full overflow-hidden border border-[#1C1C1C] bg-[#060606] transition-transform duration-500 group-hover:scale-[1.01]">
          {/* Blueprint grid background */}
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Abstract System UI Wireframe */}
          <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#7A7A7A]">
              <span className="truncate max-w-[180px] sm:max-w-none">APP_SHELL: {project.slug.toUpperCase()}_v1.0</span>
              <span className="flex items-center space-x-1.5 text-[#B6FF3B] shrink-0">
                <Layers className="h-3 w-3" />
                <span>ACTIVE SPEC</span>
              </span>
            </div>

            <div className="my-auto max-w-lg py-3">
              <div className="font-mono text-xs tracking-widest text-[#B6FF3B] uppercase">
                {project.category}
              </div>
              <h3 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight text-[#F2F2F2]">
                {project.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A0A0A0] md:text-sm line-clamp-2">
                {project.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-4">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="border border-[#222] bg-[#0E0E0E] px-2 sm:px-2.5 py-1 font-mono text-[9px] sm:text-[10px] text-[#8A8A8A] group-hover:border-[#333] group-hover:text-[#F2F2F2]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {/* Project Metadata & Action Footer */}
      <div className="mt-8 flex flex-col justify-between gap-4 border-t border-[#161616] pt-6 font-mono text-xs sm:flex-row sm:items-center">
        <div>
          <span className="text-[10px] text-[#555] uppercase">ENGINEERING ROLE</span>
          <div className="mt-0.5 text-[#F2F2F2]">{project.role}</div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 border border-[#B6FF3B]/40 bg-[#B6FF3B]/10 px-3 py-1.5 text-[11px] font-semibold text-[#B6FF3B] transition-colors hover:border-[#B6FF3B] hover:bg-[#B6FF3B] hover:text-[#050505]"
            >
              <span>LIVE DEMO</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 border border-[#262626] bg-[#0E0E0E] px-3 py-1.5 text-[11px] text-[#A0A0A0] transition-colors hover:border-[#444] hover:text-[#F2F2F2]"
            >
              <GithubIcon className="h-3 w-3 text-[#B6FF3B]" />
              <span>GITHUB</span>
              <ExternalLink className="h-2.5 w-2.5 text-[#666]" />
            </a>
          )}

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center space-x-1.5 border border-[#222] bg-[#0E0E0E] px-3 py-1.5 text-[11px] font-semibold text-[#F2F2F2] transition-colors hover:border-[#B6FF3B] hover:text-[#B6FF3B]"
          >
            <span>CASE STUDY</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
