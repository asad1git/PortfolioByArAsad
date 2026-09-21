"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSystemStore } from "@/store/useSystemStore";
import { formatSystemTime } from "@/lib/utils";

export function SystemHeader() {
  const [timeStr, setTimeStr] = useState<string>("00:00:00");
  const pathname = usePathname();
  const { bootComplete, xrayActive, toggleXray, activeSection, openContact } = useSystemStore();

  const isHomePage = pathname === "/";
  const isVisible = !isHomePage || bootComplete;

  useEffect(() => {
    setTimeStr(formatSystemTime());
    const interval = setInterval(() => {
      setTimeStr(formatSystemTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-[#1A1A1A] bg-[#050505]/90 backdrop-blur-md transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative mx-auto flex h-12 max-w-[1920px] items-center justify-between px-4 font-mono text-[11px] tracking-wider text-[#8A8A8A] md:px-8">
        {/* Left: Brand / System identifier */}
        <div className="flex items-center space-x-4">
          <a
            href="#hero"
            className="flex items-center space-x-2 text-[#F2F2F2] transition-colors hover:text-[#B6FF3B]"
          >
            <span className="h-2 w-2 bg-[#B6FF3B] inline-block animate-pulse shrink-0" />
            <span className="font-semibold tracking-widest text-[#F2F2F2] truncate">
              <span className="hidden sm:inline">ABDUL RAHMAN ASAD / SYSTEM</span>
              <span className="sm:hidden">AR ASAD / SYS</span>
            </span>
          </a>
          <span className="hidden text-[#404040] md:inline">|</span>
          <span className="hidden text-[#8A8A8A] md:inline">{activeSection}</span>
        </div>

        {/* Center: Live clock & node ping (Strictly centered on screen) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden items-center space-x-6 md:flex">
          <div className="flex items-center space-x-2">
            <span className="text-[#404040]">TIME:</span>
            <span className="text-[#F2F2F2]">{timeStr} UTC+5</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#404040]">NODE:</span>
            <span className="text-[#B6FF3B]">ONLINE</span>
          </div>
        </div>

        {/* Right: Quick actions & X-RAY Toggle */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <button
            onClick={toggleXray}
            aria-pressed={xrayActive}
            aria-label="Toggle X-Ray developer inspection mode"
            className={`cursor-pointer px-2.5 py-1 text-[10px] tracking-widest uppercase transition-all duration-200 border ${
              xrayActive
                ? "border-[#B6FF3B] bg-[#B6FF3B] text-[#050505] font-semibold shadow-[0_0_12px_rgba(182,255,59,0.3)]"
                : "border-[#2A2A2A] text-[#8A8A8A] hover:border-[#8A8A8A] hover:text-[#F2F2F2]"
            }`}
          >
            [X-RAY]
          </button>

          <button
            onClick={openContact}
            className="cursor-pointer border border-[#2A2A2A] px-3 py-1 text-[10px] tracking-widest uppercase text-[#F2F2F2] transition-all duration-200 hover:border-[#B6FF3B] hover:text-[#B6FF3B]"
          >
            INITIATE
          </button>
        </div>
      </div>
    </header>
  );
}
