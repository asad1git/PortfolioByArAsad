"use client";

import { useEffect, useRef } from "react";
import { useSystemStore } from "@/store/useSystemStore";

const TAIL_LENGTH = 18;

export function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const { cursorText } = useSystemStore();

  const mousePosRef = useRef({ x: -100, y: -100, active: false });
  const pointsRef = useRef<Array<{ x: number; y: number }>>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion or touch devices
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize tail points
    pointsRef.current = Array.from({ length: TAIL_LENGTH }, () => ({
      x: -100,
      y: -100,
    }));

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      // Filter out simulated touch events if any
      if ("pointerType" in e && e.pointerType === "touch") return;

      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;

      if (!mousePosRef.current.active) {
        mousePosRef.current.active = true;
        document.documentElement.classList.add("custom-cursor-active");

        // Teleport all tail joints to current mouse position to prevent streak across screen
        for (let i = 0; i < TAIL_LENGTH; i++) {
          pointsRef.current[i].x = e.clientX;
          pointsRef.current[i].y = e.clientY;
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Physics render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const points = pointsRef.current;
      const target = mousePosRef.current;

      if (target.active && points.length > 0) {
        // Head smoothly snaps to mouse position
        points[0].x += (target.x - points[0].x) * 0.78;
        points[0].y += (target.y - points[0].y) * 0.78;

        // Trailing joints follow with organic spring momentum
        for (let i = 1; i < points.length; i++) {
          const prev = points[i - 1];
          const curr = points[i];

          // Decreasing follow factor creates natural tail whip and wave dynamics
          const followFactor = 0.46 - (i / points.length) * 0.16;
          curr.x += (prev.x - curr.x) * followFactor;
          curr.y += (prev.y - curr.y) * followFactor;
        }

        // Draw the fluid trailing tail ribbon
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          // Progress along the tail (0 at head, 1 at tail tip)
          const progress = i / points.length;
          const alpha = (1 - progress) * 0.85;
          const thickness = Math.max(1, 5 * (1 - progress));

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(182, 255, 59, ${alpha})`;
          ctx.lineWidth = thickness;
          ctx.stroke();
        }

        // Draw the lead glowing green dot
        const head = points[0];

        // Outer glow
        ctx.save();
        ctx.shadowColor = "#B6FF3B";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#B6FF3B";
        ctx.fill();
        ctx.restore();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(head.x, head.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        // Update floating label position
        if (labelRef.current) {
          labelRef.current.style.transform = `translate3d(${head.x + 14}px, ${head.y + 14}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      document.documentElement.classList.remove("custom-cursor-active");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Highest z-index canvas so the tail is always on top */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[999] h-full w-full"
      />

      {/* Contextual Action Label for interactive hover states */}
      {cursorText && (
        <div
          ref={labelRef}
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-[1000] flex items-center border border-[#B6FF3B]/60 bg-[#050505]/95 px-2 py-0.5 font-mono text-[9px] tracking-widest text-[#B6FF3B] uppercase shadow-[0_0_12px_rgba(0,0,0,0.9)] backdrop-blur-xs"
        >
          {cursorText}
        </div>
      )}
    </>
  );
}
