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

  // Compute coordinate layout based on active topology
  const getNodePositions = (): Record<string, { x: number; y: number }> => {
    const ids = new Set(nodes.map((n) => n.id));

    // Portfolio AR
    if (ids.has("blackhole") || ids.has("vortex")) {
      return {
        edge: { x: 130, y: 120 },
        timeline: { x: 130, y: 210 },
        state: { x: 130, y: 300 },
        router: { x: 380, y: 210 },
        blackhole: { x: 630, y: 150 },
        vortex: { x: 630, y: 270 },
      };
    }

    // PakVista CI/CD
    if (ids.has("gha") || ids.has("devs") || ids.has("staging")) {
      return {
        devs: { x: 130, y: 210 },
        gha: { x: 320, y: 210 },
        docker: { x: 500, y: 210 },
        staging: { x: 660, y: 140 },
        prod: { x: 660, y: 280 },
      };
    }

    // Aura Real Estate
    if (ids.has("webgl") || ids.has("cms") || ids.has("inquiry")) {
      return {
        cdn: { x: 130, y: 210 },
        client: { x: 380, y: 210 },
        webgl: { x: 630, y: 80 },
        motion: { x: 630, y: 170 },
        cms: { x: 630, y: 260 },
        inquiry: { x: 630, y: 350 },
      };
    }

    // Novva LMS
    if (ids.has("frontend") || ids.has("ai") || ids.has("admin")) {
      return {
        frontend: { x: 130, y: 150 },
        admin: { x: 130, y: 290 },
        api: { x: 380, y: 150 },
        auth: { x: 380, y: 290 },
        db: { x: 630, y: 150 },
        ai: { x: 630, y: 290 },
      };
    }

    // CalculatorHub
    if (ids.has("engine")) {
      return {
        client: { x: 130, y: 210 },
        api: { x: 380, y: 210 },
        auth: { x: 630, y: 120 },
        engine: { x: 630, y: 210 },
        db: { x: 630, y: 300 },
      };
    }

    // Dynamic 3-column fallback for generic / future topologies
    const colGroups: { client: ProjectArchitectureNode[]; service: ProjectArchitectureNode[]; integration: ProjectArchitectureNode[] } = {
      client: [],
      service: [],
      integration: [],
    };

    nodes.forEach((node) => {
      if (node.category === "client") colGroups.client.push(node);
      else if (node.category === "service") colGroups.service.push(node);
      else colGroups.integration.push(node);
    });

    const colX = [130, 380, 630];
    const columns = [colGroups.client, colGroups.service, colGroups.integration];
    const positions: Record<string, { x: number; y: number }> = {};

    columns.forEach((group, colIdx) => {
      const x = colX[colIdx];
      const count = group.length;
      if (count === 0) return;
      const spacing = Math.min(110, 320 / Math.max(count, 1));
      const startY = 220 - ((count - 1) * spacing) / 2;
      group.forEach((node, i) => {
        positions[node.id] = { x, y: Math.round(startY + i * spacing) };
      });
    });

    return positions;
  };

  const nodePositions = getNodePositions();

  return (
    <div
      ref={containerRef}
      style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x pan-y" }}
      className="relative w-full overflow-x-auto rounded-none border border-[#1F1F1F] bg-[#070707] p-4 sm:p-6"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#8A8A8A]">
        <span className="text-[#B6FF3B]">TOPOLOGY / ARCHITECTURE GRAPH</span>
        <div className="flex items-center space-x-2">
          <span className="text-[#B6FF3B] sm:hidden">↔ SWIPE TO PAN</span>
          <span className="text-[#555]">EVENT-DRIVEN FLOW</span>
        </div>
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
