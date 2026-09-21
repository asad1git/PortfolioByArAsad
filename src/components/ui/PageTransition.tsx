"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export function PageTransition() {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip animation on initial page load (boot sequence handles initial reveal)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const curtain = curtainRef.current;
    const text = textRef.current;
    if (!curtain) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Black curtain expands
      tl.set(curtain, { display: "flex", yPercent: 100 })
        .to(curtain, {
          yPercent: 0,
          duration: 0.38,
          ease: "power3.inOut",
        })
        .to(
          text,
          {
            opacity: 1,
            duration: 0.15,
          },
          "-=0.1"
        )
        .to(text, {
          opacity: 0,
          duration: 0.15,
          delay: 0.1,
        })
        // Black curtain contracts/reveals new page
        .to(curtain, {
          yPercent: -100,
          duration: 0.42,
          ease: "power3.inOut",
        })
        .set(curtain, { display: "none" });
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-[99] flex items-center justify-center bg-[#050505] font-mono text-xs text-[#B6FF3B]"
    >
      <div
        ref={textRef}
        className="flex items-center space-x-3 opacity-0 tracking-widest uppercase"
      >
        <span className="h-2 w-2 rounded-full bg-[#B6FF3B] animate-pulse" />
        <span>TRANSITIONING TO: {pathname.toUpperCase()}</span>
      </div>
    </div>
  );
}
