"use client";

import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function SystemShutdown() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      data-component="<SystemShutdown />"
      className="relative z-20 border-t border-[#1C1C1C] bg-[#030303] px-4 py-24 font-mono md:px-8"
    >
      <div className="mx-auto max-w-[1920px]">
        {/* Status indicator */}
        <div className="flex items-center justify-between border-b border-[#141414] pb-6 text-xs text-[#8A8A8A]">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-[#B6FF3B] animate-pulse" />
            <span className="text-[#F2F2F2]">SYSTEM STATUS</span>
            <span className="text-[#404040]">::</span>
            <span className="text-[#B6FF3B]">ONLINE</span>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to system top"
            className="group cursor-pointer flex items-center space-x-2 text-[#7A7A7A] hover:text-[#B6FF3B]"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Minimal Terminal Farewell Message */}
        <div className="py-16">
          <div className="text-xs text-[#555]">SYSTEM / FAREWELL</div>
          <p className="mt-3 text-sm tracking-wide text-[#A0A0A0]">
            THANK YOU FOR EXPLORING.
          </p>
          <h3 className="mt-6 w-fit font-display text-4xl font-bold tracking-tight text-[#F2F2F2] transition-colors duration-300 hover:text-[#B6FF3B] cursor-default md:text-5xl">
            ABDUL RAHMAN ASAD
          </h3>
          <p className="mt-2 text-xs tracking-wider text-[#B6FF3B]">
            SOFTWARE ENGINEER
          </p>
        </div>

        {/* Social / Direct Connect Links */}
        <div className="grid grid-cols-1 gap-4 border-t border-[#141414] pt-8 sm:grid-cols-3 text-xs">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 border border-[#1A1A1A] bg-[#070707] p-4 text-[#8A8A8A] transition-colors hover:border-[#B6FF3B] hover:text-[#F2F2F2]"
          >
            <GithubIcon className="h-4 w-4 text-[#B6FF3B]" />
            <span>GITHUB</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 border border-[#1A1A1A] bg-[#070707] p-4 text-[#8A8A8A] transition-colors hover:border-[#B6FF3B] hover:text-[#F2F2F2]"
          >
            <LinkedinIcon className="h-4 w-4 text-[#B6FF3B]" />
            <span>LINKEDIN</span>
          </a>

          <a
            href="mailto:contact@domain.com"
            className="flex items-center space-x-3 border border-[#1A1A1A] bg-[#070707] p-4 text-[#8A8A8A] transition-colors hover:border-[#B6FF3B] hover:text-[#F2F2F2]"
          >
            <Mail className="h-4 w-4 text-[#B6FF3B]" />
            <span>EMAIL DIRECT</span>
          </a>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-16 flex flex-col justify-between border-t border-[#141414] pt-8 text-[10px] text-[#555] sm:flex-row">
          <span>DESIGNED + ENGINEERED BY ABDUL RAHMAN ASAD</span>
          <span className="mt-2 sm:mt-0">© 2026 // ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
}
