import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { projects } from "@/data/projects";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { ArrowLeft, ExternalLink, Terminal, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found | ASAD / SYSTEM" };
  }

  return {
    title: `${project.title} — Case Study | ASAD / SYSTEM`,
    description: project.tagline,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative mx-auto min-h-screen max-w-5xl px-4 py-16 md:px-8">
      {/* Top Breadcrumb & Navigation */}
      <div className="mb-12 flex items-center justify-between border-b border-[#1F1F1F] pb-6 font-mono text-xs text-[#8A8A8A]">
        <Link
          href="/#projects"
          className="group flex items-center space-x-2 text-[#8A8A8A] transition-colors hover:text-[#B6FF3B]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>RETURN TO SYSTEM</span>
        </Link>
        <span className="text-[#B6FF3B]">{project.category}</span>
      </div>

      {/* Project Title Header */}
      <header className="mb-16">
        <div className="flex items-center space-x-3 font-mono text-xs text-[#B6FF3B]">
          <Terminal className="h-4 w-4" />
          <span>SYSTEM_CASE_STUDY // {project.slug.toUpperCase()}</span>
        </div>

        <h1 className="editorial-title mt-4 font-bold text-[#F2F2F2]">
          {project.title}
        </h1>

        <p className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-[#A0A0A0] md:text-base">
          {project.tagline}
        </p>

        {/* Quick Metadata Bar */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-y border-[#1A1A1A] py-6 font-mono text-xs sm:grid-cols-4">
          <div>
            <div className="text-[10px] text-[#555] uppercase">TIMELINE</div>
            <div className="mt-1 text-[#F2F2F2]">{project.year}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#555] uppercase">ROLE</div>
            <div className="mt-1 text-[#F2F2F2]">{project.role}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#555] uppercase">CATEGORY</div>
            <div className="mt-1 text-[#F2F2F2]">{project.category}</div>
          </div>
          <div>
            <div className="text-[10px] text-[#555] uppercase">REPOSITORY / URL</div>
            <div className="mt-1 text-[#B6FF3B]">CONFIDENTIAL PRODUCTION</div>
          </div>
        </div>
      </header>

      {/* 8-Part Case Study Content */}
      <div className="space-y-24">
        {/* 01 / OVERVIEW */}
        <section className="border-t border-[#1C1C1C] pt-10">
          <div className="mb-4 font-mono text-xs tracking-widest text-[#B6FF3B]">
            01 / OVERVIEW
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F2F2F2] md:text-3xl">
            Context & Purpose
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#A0A0A0]">
            {project.overview}
          </p>
        </section>

        {/* 02 / PROBLEM */}
        <section className="border-t border-[#1C1C1C] pt-10">
          <div className="mb-4 font-mono text-xs tracking-widest text-[#B6FF3B]">
            02 / PROBLEM
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F2F2F2] md:text-3xl">
            The Structural Challenge
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#A0A0A0]">
            {project.problem}
          </p>
        </section>

        {/* 03 / PRODUCT */}
        <section className="border-t border-[#1C1C1C] pt-10">
          <div className="mb-4 font-mono text-xs tracking-widest text-[#B6FF3B]">
            03 / PRODUCT
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F2F2F2] md:text-3xl">
            System Design & Solution
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#A0A0A0]">
            {project.product}
          </p>
        </section>

        {/* 04 / ARCHITECTURE */}
        <section className="border-t border-[#1C1C1C] pt-10">
          <div className="mb-4 font-mono text-xs tracking-widest text-[#B6FF3B]">
            04 / ARCHITECTURE
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F2F2F2] md:text-3xl">
            Distributed Topology
          </h2>
          <p className="mt-4 mb-8 max-w-3xl text-base leading-relaxed text-[#A0A0A0]">
            End-to-end event topology connecting client runtimes through an API gateway down to persistent spatial storage and push webhooks.
          </p>

          <ArchitectureDiagram
            nodes={project.architectureNodes}
            edges={project.architectureEdges}
          />
        </section>

        {/* 05 / INTERFACE */}
        <section className="border-t border-[#1C1C1C] pt-10">
          <div className="mb-4 font-mono text-xs tracking-widest text-[#B6FF3B]">
            05 / INTERFACE
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F2F2F2] md:text-3xl">
            Tactile Interactions & Craft
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.interfaceHighlights.map((item, i) => (
              <div
                key={i}
                className="border border-[#1F1F1F] bg-[#0A0A0A] p-6 text-sm text-[#A0A0A0]"
              >
                <div className="font-mono text-xs text-[#B6FF3B] mb-2">0{i + 1}</div>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* 06 / ENGINEERING */}
        <section className="border-t border-[#1C1C1C] pt-10">
          <div className="mb-4 font-mono text-xs tracking-widest text-[#B6FF3B]">
            06 / ENGINEERING
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F2F2F2] md:text-3xl">
            Technical Constraints & Solutions
          </h2>
          <div className="mt-6 space-y-3">
            {project.engineeringHighlights.map((item, i) => (
              <div
                key={i}
                className="flex items-start space-x-3 border border-[#1A1A1A] bg-[#080808] p-4 text-sm text-[#CCCCCC]"
              >
                <CheckCircle2 className="h-5 w-5 text-[#B6FF3B] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 07 / RESULT */}
        <section className="border-t border-[#1C1C1C] pt-10">
          <div className="mb-4 font-mono text-xs tracking-widest text-[#B6FF3B]">
            07 / RESULT
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F2F2F2] md:text-3xl">
            Verification & Production State
          </h2>
          <div className="mt-6 space-y-3">
            {project.results.map((res, i) => (
              <div
                key={i}
                className="border-l-2 border-[#B6FF3B] bg-[#0C0C0C] py-3 px-4 font-mono text-xs text-[#F2F2F2]"
              >
                {res}
              </div>
            ))}
          </div>
        </section>

        {/* 08 / NEXT */}
        <section className="border-t border-[#1C1C1C] pt-10">
          <div className="mb-4 font-mono text-xs tracking-widest text-[#B6FF3B]">
            08 / NEXT
          </div>
          <h2 className="font-display text-2xl font-semibold text-[#F2F2F2] md:text-3xl">
            Planned Technical Roadmap
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-[#8A8A8A]">
            {project.nextSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Return Navigation Footer */}
      <footer className="mt-28 border-t border-[#1F1F1F] pt-10">
        <Link
          href="/#projects"
          className="flex items-center justify-between border border-[#242424] bg-[#0C0C0C] p-6 font-mono text-xs text-[#F2F2F2] transition-colors hover:border-[#B6FF3B] hover:text-[#B6FF3B]"
        >
          <span>← BACK TO ALL SYSTEMS</span>
          <span>SYSTEM_ROOT</span>
        </Link>
      </footer>
    </div>
  );
}
