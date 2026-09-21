"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSystemStore } from "@/store/useSystemStore";

export function Philosophy() {
  const outerSectionRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<HTMLSpanElement>(null);

  const setActiveSection = useSystemStore((state) => state.setActiveSection);

  const principles = [
    {
      num: "01",
      title: "MAKE IT SIMPLE",
      subtitle: "REDUCTION AS DISCIPLINE",
      text: "Complexity is an easy trap; clarity takes relentless editing. The strongest systems are those where every line of code, parameter, and interaction has justified its existence.",
    },
    {
      num: "02",
      title: "QUESTION THE DEFAULT",
      subtitle: "FIRST PRINCIPLES THINKING",
      text: "Standard templates and inherited conventions often mask outdated assumptions. Re-evaluating default decisions from fundamentals leads to faster architectures and sharper interfaces.",
    },
    {
      num: "03",
      title: "DETAILS MATTER",
      subtitle: "THE SUM OF INVISIBLE CHOICES",
      text: "True craft lives in the margins: 16ms frame budgets, deterministic focus states, tactile keyboard navigation, and optimistic UI transitions that render lag obsolete.",
    },
    {
      num: "04",
      title: "BUILD → TEST → LEARN → REBUILD",
      subtitle: "THE SCIENTIFIC CYCLE",
      text: "Speculation produces debate; working software produces answers. Rapid iteration backed by rigorous testing and benchmarked metrics is the only reliable path to excellence.",
    },
  ];

  useGSAP(
    () => {
      const pinTarget = pinContentRef.current;
      const outerTrigger = outerSectionRef.current;
      const cards = cardsRef.current;
      if (!pinTarget || !outerTrigger || cards.length === 0) return;

      ScrollTrigger.create({
        trigger: outerTrigger,
        start: "top 60%",
        onEnter: () => setActiveSection("02 / HOW I THINK"),
        onEnterBack: () => setActiveSection("02 / HOW I THINK"),
      });

      // Pin the inner wrapper while outerSection serves as scroll distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerTrigger,
          start: "top top",
          end: `+=${principles.length * 100}%`,
          pin: pinTarget,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
            const currentIdx = Math.min(
              principles.length - 1,
              Math.floor(self.progress * principles.length)
            );
            if (activeIndexRef.current) {
              activeIndexRef.current.textContent = `0${currentIdx + 1} / 04`;
            }
          },
        },
      });

      // Initially show first card
      gsap.set(cards[0], { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 });
      gsap.set(cards.slice(1), { opacity: 0, y: 60, filter: "blur(10px)", scale: 0.96 });

      // Animate transitions between cards
      for (let i = 0; i < cards.length - 1; i++) {
        tl.to(
          cards[i],
          {
            opacity: 0,
            y: -50,
            filter: "blur(10px)",
            scale: 0.96,
            duration: 1,
            ease: "power2.inOut",
          },
          `step-${i}`
        );

        tl.to(
          cards[i + 1],
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          `step-${i}+=0.3`
        );
      }
    },
    { scope: outerSectionRef, dependencies: [principles.length] }
  );

  return (
    <section
      id="philosophy"
      ref={outerSectionRef}
      data-component="<Philosophy />"
      className="relative z-20 border-t border-[#1C1C1C] bg-[#050505]"
    >
      {/* Inner container that gets pinned */}
      <div
        ref={pinContentRef}
        className="flex h-[100svh] w-full flex-col justify-between overflow-hidden px-4 py-6 md:px-8 md:py-8"
      >
        {/* Top Header & Indicator */}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#8A8A8A]">
          <div className="flex items-center space-x-3">
            <span className="text-[#B6FF3B]">02 / HOW I THINK</span>
            <span className="text-[#404040]">::</span>
            <span>OPERATING_PRINCIPLES</span>
          </div>
          <div className="flex items-center space-x-4">
            <span ref={activeIndexRef} className="font-semibold text-[#F2F2F2]">
              01 / 04
            </span>
            <div className="h-[2px] w-24 bg-[#1C1C1C]">
              <div
                ref={progressBarRef}
                className="h-full bg-[#B6FF3B] transition-all"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>

        {/* Central Pinned Content Cards Area */}
        <div
          ref={containerRef}
          className="relative my-auto flex h-[480px] w-full items-center justify-center"
        >
          {principles.map((p, i) => (
            <div
              key={p.num}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-center max-w-4xl mx-auto pointer-events-none"
            >
              <div className="font-mono text-xs sm:text-sm tracking-widest text-[#B6FF3B] mb-2 sm:mb-4">
                PRINCIPLE_{p.num}
              </div>

              <h2 className="font-display text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F2F2F2]">
                {p.title}
              </h2>

              <div className="mt-2 sm:mt-4 font-mono text-[10px] sm:text-xs tracking-widest text-[#8A8A8A] uppercase">
                {p.subtitle}
              </div>

              <p className="mt-4 sm:mt-8 max-w-2xl text-xs sm:text-base leading-relaxed text-[#A0A0A0] md:text-lg">
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Technical Status */}
        <div className="flex items-center justify-between border-t border-[#1C1C1C] pt-3 md:pt-4 font-mono text-[10px] sm:text-[11px] text-[#555]">
          <span>
            <span className="hidden sm:inline">SCROLL DOWN </span>TO CYCLE PRINCIPLES
          </span>
          <span>INDEX: RIGOROUS_DEFAULTS</span>
        </div>
      </div>
    </section>
  );
}
