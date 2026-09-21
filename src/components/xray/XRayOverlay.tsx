"use client";

import { useEffect, useState, useRef } from "react";
import { useSystemStore } from "@/store/useSystemStore";
import { gsap } from "@/lib/gsap";

export function XRayOverlay() {
  const xrayActive = useSystemStore((state) => state.xrayActive);
  const scrollVelocity = useSystemStore((state) => state.scrollVelocity);
  const [fps, setFps] = useState<number>(60);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [domCount, setDomCount] = useState<number>(0);
  const [activeTweens, setActiveTweens] = useState<number>(0);
  const [memoryMb, setMemoryMb] = useState<number | null>(null);

  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Toggle html class
    if (xrayActive) {
      document.documentElement.classList.add("xray-active");
    } else {
      document.documentElement.classList.remove("xray-active");
    }

    const updateDimensions = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      setDomCount(document.getElementsByTagName("*").length);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Real FPS loop
    const measureFps = (now: number) => {
      frameCountRef.current++;
      const delta = now - lastTimeRef.current;

      if (delta >= 500) {
        const currentFps = Math.round((frameCountRef.current * 1000) / delta);
        setFps(currentFps);
        frameCountRef.current = 0;
        lastTimeRef.current = now;

        // Active GSAP tweens
        const tweens = gsap.globalTimeline.getChildren(true, true, false).length;
        setActiveTweens(tweens);

        // Memory if available
        const perf = window.performance as unknown as { memory?: { usedJSHeapSize: number } };
        if (perf && perf.memory) {
          setMemoryMb(Math.round(perf.memory.usedJSHeapSize / (1024 * 1024)));
        }
      }

      rafIdRef.current = requestAnimationFrame(measureFps);
    };

    rafIdRef.current = requestAnimationFrame(measureFps);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      document.documentElement.classList.remove("xray-active");
    };
  }, [xrayActive]);

  if (!xrayActive) return null;

  return (
    <aside
      aria-label="X-Ray Runtime Diagnostics"
      className="fixed bottom-6 right-6 z-50 border border-[#B6FF3B]/40 bg-[#050505]/95 p-4 font-mono text-[10px] text-[#8A8A8A] shadow-[0_0_24px_rgba(0,0,0,0.8)] backdrop-blur-md"
    >
      <div className="mb-3 flex items-center justify-between border-b border-[#1F1F1F] pb-2">
        <span className="font-semibold tracking-wider text-[#B6FF3B]">DIAGNOSTICS / X-RAY</span>
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#B6FF3B] animate-ping" />
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        <div>
          <span className="text-[#404040]">FPS:</span>{" "}
          <span className={`font-semibold ${fps < 45 ? "text-red-400" : "text-[#F2F2F2]"}`}>
            {fps}
          </span>
        </div>

        <div>
          <span className="text-[#404040]">TWEENS:</span>{" "}
          <span className="text-[#F2F2F2]">{activeTweens}</span>
        </div>

        <div>
          <span className="text-[#404040]">VIEWPORT:</span>{" "}
          <span className="text-[#F2F2F2]">{viewport.w}x{viewport.h}</span>
        </div>

        <div>
          <span className="text-[#404040]">DOM NODES:</span>{" "}
          <span className="text-[#F2F2F2]">{domCount}</span>
        </div>

        <div>
          <span className="text-[#404040]">SCROLL VEL:</span>{" "}
          <span className="text-[#F2F2F2]">{Math.abs(Math.round(scrollVelocity * 100)) / 100}</span>
        </div>

        {memoryMb !== null && (
          <div>
            <span className="text-[#404040]">HEAP:</span>{" "}
            <span className="text-[#F2F2F2]">{memoryMb} MB</span>
          </div>
        )}
      </div>

      <div className="mt-3 border-t border-[#1F1F1F] pt-2 text-[9px] text-[#555555]">
        MODE: LIVE DEV INSPECTION
      </div>
    </aside>
  );
}
