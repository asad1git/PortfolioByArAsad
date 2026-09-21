"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSystemStore } from "@/store/useSystemStore";
import { Code2, Cpu, Compass } from "lucide-react";

export function Identity() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const setCursor = useSystemStore((state) => state.setCursor);
  const resetCursor = useSystemStore((state) => state.resetCursor);
  const setActiveSection = useSystemStore((state) => state.setActiveSection);

  const blocks = [
    {
      num: "01",
      title: "ENGINEER",
      subtitle: "SYSTEM ARCHITECTURE & TYPE CONTRACTS",
      desc: "Designing resilient backends, reliable data models, and deterministic state pipelines that scale gracefully under real-world conditions.",
      icon: Cpu,
      details: ["Type Safety Contracts", "Scalable Micro-APIs", "Database Geometries"],
    },
    {
      num: "02",
      title: "BUILDER",
      subtitle: "FULL-STACK PRODUCTION CRAFTSMANSHIP",
      desc: "Translating conceptual product roadmaps into high-throughput mobile and web interfaces with relentless attention to tactile latency and finish.",
      icon: Code2,
      details: ["Next.js App Router", "React Native Ecosystems", "Micro-Interactions"],
    },
    {
      num: "03",
      title: "EXPLORER",
      subtitle: "INTERACTION LABS & EXPERIMENTAL 3D",
      desc: "Pushing the boundaries of the browser canvas with WebGL, procedural shaders, and fluid physics simulations to discover novel interfaces.",
      icon: Compass,
      details: ["Three.js / Shaders", "GSAP Choreography", "Generative Prototypes"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => setActiveSection("01 / IDENTITY"),
        onEnterBack: () => setActiveSection("01 / IDENTITY"),
      });

      // Animate statement
      gsap.fromTo(
        statementRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statementRef.current,
            start: "top 80%",
          },
        }
      );

      // Stagger cards in
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [setActiveSection]);

  return (
    <section
      id="identity"
      ref={sectionRef}
      data-component="<Identity />"
      className="relative z-20 min-h-screen border-t border-[#1C1C1C] px-4 py-28 md:px-8"
    >
      {/* Section Header */}
      <div className="mb-16 flex items-center justify-between font-mono text-[11px] tracking-widest text-[#8A8A8A]">
        <div className="flex items-center space-x-3">
          <span className="text-[#B6FF3B]">01 / IDENTITY</span>
          <span className="text-[#404040]">::</span>
          <span>CORE_THESIS</span>
        </div>
        <span className="hidden sm:inline text-[#555]">MOD: 01_PERSPECTIVE</span>
      </div>

      {/* Main Editorial Statement */}
      <div className="max-w-5xl">
        <h2
          ref={statementRef}
          className="font-display text-3xl font-medium leading-[1.12] tracking-[-0.02em] text-[#F2F2F2] md:text-5xl lg:text-6xl"
        >
          &ldquo;I build software that turns ideas into{" "}
          <span className="text-[#B6FF3B] underline underline-offset-8 decoration-1 decoration-[#B6FF3B]/50">
            usable systems
          </span>
          .&rdquo;
        </h2>
      </div>

      {/* Three Interactive Blocks */}
      <div
        ref={cardsRef}
        className="mt-20 grid grid-cols-1 gap-px bg-[#1C1C1C] md:grid-cols-3"
      >
        {blocks.map((block, idx) => {
          const Icon = block.icon;
          const isHovered = activeBlock === idx;

          return (
            <div
              key={block.num}
              onMouseEnter={() => {
                setActiveBlock(idx);
                setCursor("open", "READ");
              }}
              onMouseLeave={() => {
                setActiveBlock(null);
                resetCursor();
              }}
              className={`group relative flex flex-col justify-between bg-[#0A0A0A] p-8 transition-colors duration-300 md:p-10 ${
                isHovered ? "bg-[#101010]" : "hover:bg-[#0E0E0E]"
              }`}
            >
              {/* Top Row: Number & Icon */}
              <div>
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-6">
                  <span className="font-mono text-xs font-semibold tracking-widest text-[#B6FF3B]">
                    {block.num}
                  </span>
                  <Icon
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isHovered ? "text-[#B6FF3B] scale-110" : "text-[#4A4A4A]"
                    }`}
                  />
                </div>

                {/* Title */}
                <h3 className="mt-8 font-display text-2xl font-bold tracking-tight text-[#F2F2F2] md:text-3xl">
                  {block.title}
                </h3>

                <p className="mt-2 font-mono text-[10px] tracking-widest text-[#8A8A8A] uppercase">
                  {block.subtitle}
                </p>

                {/* Description */}
                <p className="mt-6 text-sm leading-relaxed text-[#A0A0A0]">
                  {block.desc}
                </p>
              </div>

              {/* Sub-list details revealed on hover */}
              <div className="mt-10 border-t border-[#161616] pt-6 font-mono text-[11px] text-[#6A6A6A]">
                <div className="space-y-1.5">
                  {block.details.map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="h-1 w-1 bg-[#B6FF3B]" />
                      <span className={isHovered ? "text-[#F2F2F2]" : ""}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtle accent corner tick */}
              <div
                className={`absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#B6FF3B] transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
