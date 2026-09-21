"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import { useSystemStore } from "@/store/useSystemStore";
import { ArrowDownRight, Terminal } from "lucide-react";

// Dynamic import of HeroScene so SSR remains instant
const HeroScene = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const bootComplete = useSystemStore((state) => state.bootComplete);
  const setCursor = useSystemStore((state) => state.setCursor);
  const resetCursor = useSystemStore((state) => state.resetCursor);

  useEffect(() => {
    if (!bootComplete) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 32, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1 },
        "-=0.5"
      );

      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

      tl.fromTo(
        footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [bootComplete]);

  return (
    <section
      id="hero"
      ref={containerRef}
      data-component="<Hero />"
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col justify-between overflow-hidden px-4 pb-8 pt-16 md:px-8"
    >
      {/* Three.js 3D Particle Field background */}
      <HeroScene />

      {/* Top Section Metadata */}
      <div
        ref={kickerRef}
        className="relative z-10 flex items-center justify-between font-mono text-[11px] tracking-widest text-[#8A8A8A] opacity-0"
      >
        <div className="flex items-center space-x-2">
          <Terminal className="h-3.5 w-3.5 text-[#B6FF3B]" />
          <span className="text-[#B6FF3B]">SYSTEM / 001</span>
          <span className="text-[#404040]">::</span>
          <span>INITIAL_STATE</span>
        </div>
        <div className="hidden sm:block text-[#555]">
          LATENCY: NORMAL [LOW_OVERHEAD]
        </div>
      </div>

      {/* Central Editorial Heading */}
      <div className="relative z-10 my-auto flex flex-col justify-center py-6">
        <h1
          ref={titleRef}
          className="editorial-title w-fit cursor-default select-none font-bold text-[#F2F2F2] opacity-0"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9.5rem)", lineHeight: 0.88 }}
        >
          <span
            onMouseEnter={() => setCursor("hover", "ABDUL RAHMAN")}
            onMouseLeave={resetCursor}
            className="block w-fit transition-colors duration-200 hover:text-[#B6FF3B]"
          >
            Abdul Rahman
          </span>
          <span
            onMouseEnter={() => setCursor("hover", "ASAD")}
            onMouseLeave={resetCursor}
            className="block w-fit transition-colors duration-200 hover:text-[#B6FF3B]"
          >
            Asad
          </span>
        </h1>

        <div
          ref={subtextRef}
          className="mt-4 max-w-2xl font-mono text-xs tracking-wider text-[#8A8A8A] opacity-0 md:text-sm"
        >
          <p className="text-[#F2F2F2] font-medium tracking-wide">
            SOFTWARE ENGINEER
          </p>
          <p className="mt-1 text-[#8A8A8A]">
            DIGITAL PRODUCTS / SYSTEMS / EXPERIMENTS
          </p>
        </div>
      </div>

      {/* Bottom Exploration Cue */}
      <div
        ref={footerRef}
        className="relative z-10 flex items-end justify-between border-t border-[#1C1C1C] pt-4 font-mono text-[11px] tracking-wider text-[#8A8A8A] opacity-0"
      >
        <a
          href="#identity"
          className="group flex items-center space-x-2 text-[#8A8A8A] transition-colors hover:text-[#B6FF3B]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#B6FF3B] group-hover:scale-125 transition-transform" />
          <span>SCROLL TO EXPLORE</span>
          <ArrowDownRight className="h-3.5 w-3.5 text-[#B6FF3B] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        </a>

        <div className="hidden text-right md:block text-[#555]">
          SPEC: PRODUCTION_SYS_v2.6
        </div>
      </div>
    </section>
  );
}
