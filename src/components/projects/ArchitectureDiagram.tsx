"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ProjectArchitectureNode, ProjectArchitectureEdge } from "@/data/projects";

interface ArchitectureDiagramProps {
  nodes: ProjectArchitectureNode[];
  edges: ProjectArchitectureEdge[];
}

export function ArchitectureDiagram({ nodes, edges }: ArchitectureDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const paths = pathRefs.current.filter(Boolean);
    if (paths.length === 0) return;

    // Animated dashed pulse along the SVG connector lines
    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        gsap.to(path, {
          strokeDashoffset: -40,
          repeat: -1,
          duration: 2.2,
          ease: "none",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [edges]);

  // Visual layout coordinate mapper for Kaam architecture
  const nodePositions: Record<string, { x: number; y: number }> = {
    customer: { x: 120, y: 80 },
    provider: { x: 120, y: 200 },
    gateway: { x: 380, y: 140 },
    auth: { x: 620, y: 60 },
    db: { x: 620, y: 140 },
    payments: { x: 620, y: 220 },
    chat: { x: 620, y: 300 },
    notifications: { x: 620, y: 380 },
    // Novva fallbacks
    student: { x: 140, y: 140 },
    api: { x: 380, y: 140 },
    analytics: { x: 620, y: 240 },
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-auto rounded-none border border-[#1F1F1F] bg-[#070707] p-6"
    >
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] text-[#8A8A8A]">
        <span className="text-[#B6FF3B]">TOPOLOGY / ARCHITECTURE GRAPH</span>
        <span className="text-[#555]">EVENT-DRIVEN FLOW</span>
      </div>

      <div className="relative min-w-[760px] h-[440px]">
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none"
          viewBox="0 0 780 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {edges.map((edge, idx) => {
            const start = nodePositions[edge.from] || { x: 100, y: 100 };
            const end = nodePositions[edge.to] || { x: 400, y: 100 };

            // Draw curved bezier path
            const dx = end.x - start.x;
            const cx1 = start.x + dx * 0.5;
            const cy1 = start.y;
            const cx2 = start.x + dx * 0.5;
            const cy2 = end.y;

            const pathData = `M ${start.x} ${start.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end.x} ${end.y}`;

            return (
              <g key={idx}>
                {/* Background static line */}
                <path
                  d={pathData}
                  stroke="#1C1C1C"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Animated active pulse line */}
                <path
                  ref={(el) => {
                    if (el) pathRefs.current[idx] = el;
                  }}
                  d={pathData}
                  stroke="#B6FF3B"
                  strokeWidth="1.5"
                  strokeDasharray="6 14"
                  strokeOpacity="0.85"
                  fill="none"
                />
              </g>
            );
          })}
        </svg>

        {/* Render Node UI Badges */}
        {nodes.map((node) => {
          const pos = nodePositions[node.id] || { x: 200, y: 200 };

          return (
            <div
              key={node.id}
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translate(-50%, -50%)",
              }}
              className="absolute z-10 flex min-w-[140px] flex-col rounded-none border border-[#242424] bg-[#0E0E0E] px-3.5 py-2.5 shadow-lg transition-transform hover:scale-105 hover:border-[#B6FF3B]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-widest text-[#B6FF3B] uppercase">
                  {node.category}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#B6FF3B]/80" />
              </div>
              <span className="mt-1 font-display text-xs font-bold text-[#F2F2F2]">
                {node.label}
              </span>
              {node.sublabel && (
                <span className="mt-0.5 font-mono text-[10px] text-[#7A7A7A]">
                  {node.sublabel}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
