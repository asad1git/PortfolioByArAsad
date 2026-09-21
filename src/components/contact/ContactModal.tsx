"use client";

import { useState, useEffect } from "react";
import { useSystemStore } from "@/store/useSystemStore";
import { X, Send, CheckCircle2, Terminal } from "lucide-react";

export function ContactModal() {
  const { contactOpen, closeContact } = useSystemStore();
  const [projectType, setProjectType] = useState<string>("WEB APP");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "transmitting" | "received">("idle");

  const projectTypes = ["WEBSITE", "WEB APP", "MOBILE APP", "AI PRODUCT", "OTHER"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeContact();
    };
    if (contactOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [contactOpen, closeContact]);

  if (!contactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate realistic transmission pipeline states
    setStatus("sending");
    setTimeout(() => {
      setStatus("transmitting");
      setTimeout(() => {
        setStatus("received");
      }, 900);
    }, 800);
  };

  const handleReset = () => {
    setStatus("idle");
    setName("");
    setEmail("");
    setMessage("");
    closeContact();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 p-4 backdrop-blur-2xl md:p-10"
    >
      <div className="relative flex max-h-[92svh] w-full max-w-2xl flex-col justify-between overflow-y-auto overscroll-contain border border-[#242424] bg-[#0A0A0A] p-5 font-mono sm:p-8 md:p-10">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-4">
          <div className="flex items-center space-x-2 text-xs text-[#B6FF3B]">
            <Terminal className="h-4 w-4" />
            <span>TRANSMISSION_PROTOCOL // INITIATE</span>
          </div>
          <button
            onClick={closeContact}
            aria-label="Close contact modal"
            className="cursor-pointer border border-[#222] p-1.5 text-[#8A8A8A] hover:border-[#B6FF3B] hover:text-[#B6FF3B]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === "received" ? (
          <div className="my-12 flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-[#B6FF3B]" />
            <h3 className="font-display text-3xl font-bold text-[#F2F2F2]">
              MESSAGE RECEIVED
            </h3>
            <p className="max-w-md font-mono text-xs text-[#8A8A8A]">
              Transmission buffer stored. Abdul Rahman Asad will review your project parameters and respond shortly.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 cursor-pointer border border-[#B6FF3B] bg-[#B6FF3B] px-6 py-2.5 font-mono text-xs font-semibold text-[#050505] uppercase hover:bg-white"
            >
              ACKNOWLEDGE & CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-xs">
            <div>
              <label className="block text-[10px] uppercase text-[#666]">
                PROJECT TYPE
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`cursor-pointer border px-3 py-1.5 font-mono text-[10px] uppercase transition-colors ${
                      projectType === type
                        ? "border-[#B6FF3B] bg-[#B6FF3B]/10 text-[#B6FF3B] font-semibold"
                        : "border-[#222] text-[#8A8A8A] hover:border-[#444] hover:text-[#F2F2F2]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block text-[10px] uppercase text-[#666]">
                  NAME *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="mt-2 w-full border border-[#222] bg-[#0E0E0E] px-3.5 py-2.5 text-base sm:text-xs text-[#F2F2F2] placeholder-[#444] focus:border-[#B6FF3B] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[10px] uppercase text-[#666]">
                  EMAIL *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@domain.com"
                  className="mt-2 w-full border border-[#222] bg-[#0E0E0E] px-3.5 py-2.5 text-base sm:text-xs text-[#F2F2F2] placeholder-[#444] focus:border-[#B6FF3B] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[10px] uppercase text-[#666]">
                PROJECT SCOPE & OBJECTIVES *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your technical requirements, goals, or architecture needs..."
                className="mt-2 w-full border border-[#222] bg-[#0E0E0E] p-3.5 text-base sm:text-xs text-[#F2F2F2] placeholder-[#444] focus:border-[#B6FF3B] focus:outline-none"
              />
            </div>

            <div className="border-t border-[#1A1A1A] pt-6 flex items-center justify-between">
              <span className="text-[10px] text-[#555]">
                {status === "sending"
                  ? "SENDING..."
                  : status === "transmitting"
                  ? "TRANSMITTING..."
                  : "READY TO TRANSMIT"}
              </span>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="flex items-center space-x-2 border border-[#B6FF3B] bg-[#B6FF3B] px-6 py-2.5 font-mono text-xs font-semibold text-[#050505] uppercase transition-all hover:bg-white disabled:opacity-50"
              >
                <span>TRANSMIT MESSAGE</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
