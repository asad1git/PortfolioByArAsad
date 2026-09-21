"use client";

import { useEffect, useRef, useState } from "react";
import { useSystemStore } from "@/store/useSystemStore";
import { ContactModal } from "./ContactModal";
import { ScrollTrigger } from "@/lib/gsap";
import { ArrowRight, Sparkles } from "lucide-react";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [buttonText, setButtonText] = useState("START A CONVERSATION →");

  const openContact = useSystemStore((state) => state.openContact);
  const setActiveSection = useSystemStore((state) => state.setActiveSection);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      onEnter: () => setActiveSection("05 / CONTACT"),
      onEnterBack: () => setActiveSection("05 / CONTACT"),
    });

    return () => trigger.kill();
  }, [setActiveSection]);

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        data-component="<Contact />"
        className="relative z-20 min-h-screen border-t border-[#1C1C1C] px-4 py-32 md:px-8 flex flex-col justify-between"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#8A8A8A]">
          <div className="flex items-center space-x-3">
            <span className="text-[#B6FF3B]">05 / CONTACT</span>
            <span className="text-[#404040]">::</span>
            <span>TRANSMISSION_DISPATCH</span>
          </div>
          <div className="flex items-center space-x-2 text-[#555]">
            <Sparkles className="h-3.5 w-3.5 text-[#B6FF3B]" />
            <span>OPEN FOR HIGH-IMPACT PROJECTS</span>
          </div>
        </div>

        {/* Central Massive Editorial Call-to-Action */}
        <div className="my-auto max-w-5xl py-12">
          <p className="font-mono text-xs tracking-widest text-[#8A8A8A] uppercase md:text-sm">
            HAVE AN IDEA?
          </p>

          <h2
            className="editorial-title mt-4 font-bold text-[#F2F2F2]"
            style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)" }}
          >
            LET&apos;S BUILD IT.
          </h2>

          <div className="mt-12">
            <button
              onClick={openContact}
              onMouseEnter={() => setButtonText("INITIALIZE PROJECT →")}
              onMouseLeave={() => setButtonText("START A CONVERSATION →")}
              className="group cursor-pointer inline-flex items-center space-x-4 border border-[#B6FF3B] bg-[#B6FF3B] px-8 py-5 font-mono text-sm font-bold tracking-wider text-[#050505] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(182,255,59,0.3)] md:px-12 md:py-6 md:text-base"
            >
              <span>{buttonText}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
          </div>
        </div>

        {/* Bottom Technical Indicator */}
        <div className="flex items-center justify-between border-t border-[#1C1C1C] pt-6 font-mono text-[11px] text-[#555]">
          <span>DIRECT TRANSMISSION CHANNEL: OPEN</span>
          <span>RESPONSE TARGET: &lt; 24H</span>
        </div>
      </section>

      {/* Fullscreen Contact Modal */}
      <ContactModal />
    </>
  );
}
