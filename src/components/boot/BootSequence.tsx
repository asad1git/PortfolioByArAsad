"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSystemStore } from "@/store/useSystemStore";

export function BootSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const systemReadyRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);
  const setBootComplete = useSystemStore((state) => state.setBootComplete);

  const finishBoot = () => {
    setBootComplete(true);
    setVisible(false);
  };

  useEffect(() => {
    // Check prefers-reduced-motion or previously booted session
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      finishBoot();
      return;
    }

    const container = containerRef.current;
    const progressBar = progressBarRef.current;
    const percentEl = percentRef.current;
    const systemReadyEl = systemReadyRef.current;
    const logLines = logsRef.current?.querySelectorAll(".log-line");

    if (!container || !progressBar || !percentEl || !logLines || !systemReadyEl) {
      finishBoot();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide up / clip-path reveal curtain transition
          gsap.to(container, {
            clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
            opacity: 0,
            duration: 0.65,
            ease: "power3.inOut",
            onComplete: finishBoot,
          });
        },
      });

      // Progress bar counter animation from 0 to 100
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          const val = Math.round(progressObj.value);
          if (percentEl) percentEl.textContent = `${val}%`;
          if (progressBar) progressBar.style.width = `${val}%`;
        },
      }, 0);

      // Stagger log items reveal
      tl.fromTo(
        logLines,
        { opacity: 0, x: -8 },
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
          stagger: 0.35,
          ease: "power1.out",
        },
        0.2
      );

      // SYSTEM READY reveal
      tl.fromTo(
        systemReadyEl,
        { opacity: 0, scale: 0.96, filter: "blur(4px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "back.out(1.5)",
        },
        1.7
      );

      // Brief hold before curtain retracts
      tl.to({}, { duration: 0.4 });
    });

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#050505] p-6 font-mono text-xs text-[#8A8A8A] md:p-12"
      role="dialog"
      aria-label="System Boot Sequence"
    >
      {/* Top Diagnostic Status Bar */}
      <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
        <div className="flex items-center space-x-3 text-xs">
          <span className="h-2 w-2 rounded-full bg-[#B6FF3B] animate-ping" />
          <span className="font-mono tracking-widest text-[#B6FF3B]">BOOTLOADER // KERNEL_INIT</span>
        </div>
        <button
          onClick={finishBoot}
          className="cursor-pointer border border-[#262626] px-3 py-1 text-[10px] tracking-widest uppercase text-[#8A8A8A] hover:border-[#B6FF3B] hover:text-[#B6FF3B]"
        >
          [SKIP BOOT]
        </button>
      </div>

      {/* Center Diagnostics & Log */}
      <div className="mx-auto my-auto w-full max-w-md space-y-6">
        <div className="text-[11px] tracking-wider text-[#F2F2F2]">
          INITIALIZING KERNEL ENVIRONMENT...
        </div>

        <div ref={logsRef} className="space-y-2 text-[11px]">
          <div className="log-line flex justify-between">
            <span>IDENTITY</span>
            <span className="text-[#B6FF3B]">.............. OK</span>
          </div>
          <div className="log-line flex justify-between">
            <span>INTERFACE</span>
            <span className="text-[#B6FF3B]">.............. OK</span>
          </div>
          <div className="log-line flex justify-between">
            <span>ENGINE</span>
            <span className="text-[#B6FF3B]">.............. OK</span>
          </div>
          <div className="log-line flex justify-between">
            <span>CREATIVE</span>
            <span className="text-[#B6FF3B]">.............. OK</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-4">
          <div className="flex justify-between text-[10px] text-[#555]">
            <span>SYSTEM_LOAD</span>
            <span ref={percentRef}>0%</span>
          </div>
          <div className="h-[2px] w-full bg-[#1A1A1A]">
            <div
              ref={progressBarRef}
              className="h-full bg-[#B6FF3B] transition-all"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* SYSTEM READY Banner */}
        <div
          ref={systemReadyRef}
          className="pt-2 text-center text-sm font-semibold tracking-widest text-[#B6FF3B] opacity-0"
        >
          ● SYSTEM READY
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="flex items-center justify-between border-t border-[#1A1A1A] pt-4 text-[10px] text-[#555]">
        <span>ARCH: x86_64-ARM64 / NEXT.JS</span>
        <span>SECURITY: VERIFIED</span>
      </div>
    </div>
  );
}
