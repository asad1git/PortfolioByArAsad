"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { technologies, Technology } from "@/data/technologies";
import { useSystemStore } from "@/store/useSystemStore";
import { Crosshair, Zap } from "lucide-react";

const TechParticleScene = dynamic(
  () => import("@/components/webgl/TechParticleScene").then((mod) => mod.TechParticleScene),
  { ssr: false }
);

interface Projectile {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  targetId: string;
  speed: number;
  progress: number;
  arcHeight: number;
  history: Array<{ x: number; y: number }>;
}

interface Impact {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface PlanetPosition {
  tech: Technology;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  orbitAngle: number;
}

interface TechSpaceLauncherProps {
  onSelectTech: (tech: Technology) => void;
  selectedTechId?: string | null;
}

export function TechSpaceLauncher({ onSelectTech, selectedTechId }: TechSpaceLauncherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  const setCursor = useSystemStore((state) => state.setCursor);
  const resetCursor = useSystemStore((state) => state.resetCursor);

  const selectedTechIdRef = useRef<string | null | undefined>(selectedTechId);
  useEffect(() => {
    selectedTechIdRef.current = selectedTechId;
  }, [selectedTechId]);

  const hoveredTechIdRef = useRef<string | null>(null);
  const lastHoverFireRef = useRef<number>(0);
  const shipAngleRef = useRef<number>(0);

  const mousePosRef = useRef({ x: -1, y: -1 });
  const projectilesRef = useRef<Projectile[]>([]);
  const impactsRef = useRef<Impact[]>([]);
  const planetsRef = useRef<PlanetPosition[]>([]);
  const lastAutoFireRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Palette mapping for skill planets
  const planetColors: Record<string, { base: string; glow: string }> = {
    react: { base: "#00D8FF", glow: "rgba(0, 216, 255, 0.4)" },
    nextjs: { base: "#FFFFFF", glow: "rgba(255, 255, 255, 0.3)" },
    typescript: { base: "#3178C6", glow: "rgba(49, 120, 198, 0.4)" },
    nodejs: { base: "#5FA04E", glow: "rgba(95, 160, 78, 0.4)" },
    mongodb: { base: "#47A248", glow: "rgba(71, 162, 72, 0.4)" },
    docker: { base: "#2496ED", glow: "rgba(36, 150, 237, 0.4)" },
    postgresql: { base: "#336791", glow: "rgba(51, 103, 145, 0.4)" },
    "react-native": { base: "#61DAFB", glow: "rgba(97, 218, 251, 0.4)" },
    expo: { base: "#C4C4C4", glow: "rgba(196, 196, 196, 0.3)" },
    python: { base: "#FFD43B", glow: "rgba(255, 212, 59, 0.4)" },
    ai: { base: "#B6FF3B", glow: "rgba(182, 255, 59, 0.5)" },
    gsap: { base: "#88CE02", glow: "rgba(136, 206, 2, 0.5)" },
    threejs: { base: "#FF6B6B", glow: "rgba(255, 107, 107, 0.4)" },
  };

  // Compute 2D organic galaxy coordinates for planets (randomized & not aligned)
  const updatePlanetLayout = (w: number, h: number) => {
    const isSmall = w < 768;
    const startX = isSmall ? w * 0.34 : w * 0.28;
    const availableW = w - startX - (isSmall ? 25 : 60);
    const availableH = h - 120;

    // Organic scattered coordinates across space (non-aligned, varied depths)
    const planetCoords: Record<string, { u: number; v: number; sizeBonus?: number }> = {
      react: { u: 0.08, v: 0.28, sizeBonus: 4 },
      typescript: { u: 0.16, v: 0.74, sizeBonus: 2 },
      nextjs: { u: 0.32, v: 0.15, sizeBonus: 3 },
      mongodb: { u: 0.36, v: 0.84, sizeBonus: 2 },
      postgresql: { u: 0.36, v: 0.84 },
      nodejs: { u: 0.44, v: 0.48 },
      docker: { u: 0.58, v: 0.22, sizeBonus: 2 },
      "react-native": { u: 0.58, v: 0.22 },
      python: { u: 0.62, v: 0.72 },
      ai: { u: 0.72, v: 0.44, sizeBonus: 4 },
      expo: { u: 0.84, v: 0.16 },
      gsap: { u: 0.80, v: 0.88 },
      threejs: { u: 0.92, v: 0.60, sizeBonus: 2 },
    };

    const list: PlanetPosition[] = [];

    technologies.forEach((tech) => {
      const cfg = planetCoords[tech.id] || { u: 0.5, v: 0.5 };
      const posX = startX + cfg.u * availableW;
      const posY = 55 + cfg.v * availableH;

      const colorSet = planetColors[tech.id] || { base: "#B6FF3B", glow: "rgba(182,255,59,0.3)" };
      const baseRadius = isSmall ? 18 : 22;
      const radius = baseRadius + (cfg.sizeBonus ?? 0);

      list.push({
        tech,
        baseX: posX,
        baseY: posY,
        x: posX,
        y: posY,
        radius,
        color: colorSet.base,
        glowColor: colorSet.glow,
        orbitAngle: Math.random() * Math.PI * 2,
      });
    });

    planetsRef.current = list;
  };

  // Launch a projectile from ship to target planet
  const fireProjectile = (target: PlanetPosition, isTargetLocked = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isSmall = canvas.width < 768;
    const shipX = isSmall ? 65 : 120;
    const shipY = canvas.height * 0.5;

    // Calculate nozzle position using current ship angle
    const nozzleDist = 34;
    const curAngle = shipAngleRef.current;
    const startX = shipX + Math.cos(curAngle) * nozzleDist;
    const startY = shipY + Math.sin(curAngle) * nozzleDist;

    // Ballistic arc
    const dy = target.y - startY;
    const arcHeight = isTargetLocked
      ? (Math.random() - 0.5) * 14 // Tight, focused laser trajectory when locked
      : (Math.random() - 0.5) * Math.min(50, Math.abs(dy) * 0.35);

    projectilesRef.current.push({
      x: startX,
      y: startY,
      startX,
      startY,
      targetX: target.x,
      targetY: target.y,
      targetId: target.tech.id,
      speed: isTargetLocked ? 0.034 : 0.022 + Math.random() * 0.008,
      progress: 0,
      arcHeight,
      history: [{ x: startX, y: startY }],
    });
  };

  // Fire a barrage to all planets
  const fireAllProbes = () => {
    planetsRef.current.forEach((p, idx) => {
      setTimeout(() => {
        fireProjectile(p, false);
      }, idx * 75);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      updatePlanetLayout(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mousePosRef.current = { x: mx, y: my };

      // Check planet hover
      let found: string | null = null;
      for (const p of planetsRef.current) {
        const dist = Math.hypot(p.x - mx, p.y - my);
        if (dist <= p.radius + 16) {
          found = p.tech.id;
          break;
        }
      }

      hoveredTechIdRef.current = found;

      if (found !== hoveredTechId) {
        setHoveredTechId(found);
        if (found) {
          const matched = planetsRef.current.find((p) => p.tech.id === found);
          setCursor("open", "INSPECT");
          if (matched) {
            // Immediately fire targeted projectile
            fireProjectile(matched, true);
            lastHoverFireRef.current = performance.now();
          }
        } else {
          resetCursor();
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (const p of planetsRef.current) {
        const dist = Math.hypot(p.x - mx, p.y - my);
        if (dist <= p.radius + 16) {
          fireProjectile(p, true);
          onSelectTech(p.tech);
          break;
        }
      }
    };

    canvas.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("click", onClick);

    // Initial volley on mount
    setTimeout(() => {
      if (planetsRef.current.length > 0) {
        fireProjectile(planetsRef.current[0], false);
        fireProjectile(planetsRef.current[2], false);
      }
    }, 400);

    // Animation Render Loop
    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const isSmall = w < 768;
      const shipX = isSmall ? 65 : 120;
      const shipY = h * 0.5;

      // Update organic floating positions for planets
      planetsRef.current.forEach((p, idx) => {
        p.orbitAngle += 0.012;
        p.x = p.baseX + Math.sin(time * 0.8 + idx * 1.6) * 4.5;
        p.y = p.baseY + Math.cos(time * 0.6 + idx * 1.8) * 4.5;
      });

      // Ship rotation towards active target
      const currentHoveredId = hoveredTechIdRef.current;
      const activeAimTarget = currentHoveredId
        ? planetsRef.current.find((p) => p.tech.id === currentHoveredId)
        : null;

      let targetShipAngle = 0;
      if (activeAimTarget) {
        targetShipAngle = Math.atan2(activeAimTarget.y - shipY, activeAimTarget.x - shipX);
      }
      shipAngleRef.current += (targetShipAngle - shipAngleRef.current) * 0.14;

      // 1. Only draw targeting laser trajectory when aiming at an active/hovered target
      if (activeAimTarget) {
        ctx.beginPath();
        ctx.moveTo(shipX, shipY);
        ctx.lineTo(activeAimTarget.x, activeAimTarget.y);
        ctx.strokeStyle = "rgba(182, 255, 59, 0.4)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2. Firing Logic:
      // WHEN HOVERED: ONLY fire to that planet continuously, NO OTHERS!
      const now = performance.now();
      if (currentHoveredId) {
        const hoveredPlanet = planetsRef.current.find((p) => p.tech.id === currentHoveredId);
        if (hoveredPlanet && now - lastHoverFireRef.current > 360) {
          lastHoverFireRef.current = now;
          fireProjectile(hoveredPlanet, true);
        }
        // Suppress random auto-fire
        lastAutoFireRef.current = now;
      } else {
        // Only fire random ambient probes when NOT hovering any planet
        if (now - lastAutoFireRef.current > 2200 && planetsRef.current.length > 0) {
          lastAutoFireRef.current = now;
          const randomTarget =
            planetsRef.current[Math.floor(Math.random() * planetsRef.current.length)];
          fireProjectile(randomTarget, false);
        }
      }

      // 3. Update and render Projectiles with GREEN DOT & PHYSICS TAIL
      const activeProjectiles: Projectile[] = [];
      for (const proj of projectilesRef.current) {
        proj.progress += proj.speed;

        // Current coordinates with organic curved ballistic path
        const curX = proj.startX + (proj.targetX - proj.startX) * proj.progress;
        const baseY = proj.startY + (proj.targetY - proj.startY) * proj.progress;
        const curY = baseY + Math.sin(proj.progress * Math.PI) * proj.arcHeight;

        proj.x = curX;
        proj.y = curY;

        // Save history for trailing tail
        proj.history.push({ x: curX, y: curY });
        if (proj.history.length > 14) {
          proj.history.shift();
        }

        // Draw projectile's fluid green physics tail
        if (proj.history.length > 1) {
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          for (let i = 0; i < proj.history.length - 1; i++) {
            const p1 = proj.history[i];
            const p2 = proj.history[i + 1];
            const progress = i / proj.history.length;
            const alpha = progress * 0.9;
            const thickness = Math.max(1, 4.5 * progress);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(182, 255, 59, ${alpha})`;
            ctx.lineWidth = thickness;
            ctx.stroke();
          }
        }

        // Draw glowing green projectile head dot
        ctx.save();
        ctx.shadowColor = "#B6FF3B";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(curX, curY, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = "#B6FF3B";
        ctx.fill();
        ctx.restore();

        // White energetic center
        ctx.beginPath();
        ctx.arc(curX, curY, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        // Target Impact Check
        if (proj.progress >= 1) {
          impactsRef.current.push({
            x: proj.targetX,
            y: proj.targetY,
            radius: 4,
            maxRadius: 36,
            alpha: 0.9,
          });
        } else {
          activeProjectiles.push(proj);
        }
      }
      projectilesRef.current = activeProjectiles;

      // 4. Update and render Impacts (plasma shockwave ripples)
      const activeImpacts: Impact[] = [];
      for (const imp of impactsRef.current) {
        imp.radius += 1.4;
        imp.alpha -= 0.038;

        if (imp.alpha > 0) {
          ctx.save();
          ctx.strokeStyle = `rgba(182, 255, 59, ${imp.alpha})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(imp.x, imp.y, imp.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
          activeImpacts.push(imp);
        }
      }
      impactsRef.current = activeImpacts;

      // 5. Draw Skill Planets
      planetsRef.current.forEach((p) => {
        const isHovered = hoveredTechId === p.tech.id;
        const isSelected = selectedTechIdRef.current === p.tech.id;
        const isHighlighted = isHovered || isSelected;
        const r = isHighlighted ? p.radius * 1.15 : p.radius;

        // Faint atmospheric glow
        const glowGrad = ctx.createRadialGradient(p.x, p.y, r * 0.4, p.x, p.y, r * 2.2);
        glowGrad.addColorStop(0, isHighlighted ? "rgba(182, 255, 59, 0.45)" : p.glowColor);
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Active targeting brackets when selected
        if (isSelected) {
          ctx.save();
          ctx.strokeStyle = "#B6FF3B";
          ctx.lineWidth = 1.6;
          const boxSize = r * 1.5;
          const bLen = 7;
          // Top-left
          ctx.beginPath();
          ctx.moveTo(p.x - boxSize, p.y - boxSize + bLen);
          ctx.lineTo(p.x - boxSize, p.y - boxSize);
          ctx.lineTo(p.x - boxSize + bLen, p.y - boxSize);
          ctx.stroke();
          // Top-right
          ctx.beginPath();
          ctx.moveTo(p.x + boxSize - bLen, p.y - boxSize);
          ctx.lineTo(p.x + boxSize, p.y - boxSize);
          ctx.lineTo(p.x + boxSize, p.y - boxSize + bLen);
          ctx.stroke();
          // Bottom-left
          ctx.beginPath();
          ctx.moveTo(p.x - boxSize, p.y + boxSize - bLen);
          ctx.lineTo(p.x - boxSize, p.y + boxSize);
          ctx.lineTo(p.x - boxSize + bLen, p.y + boxSize);
          ctx.stroke();
          // Bottom-right
          ctx.beginPath();
          ctx.moveTo(p.x + boxSize - bLen, p.y + boxSize);
          ctx.lineTo(p.x + boxSize, p.y + boxSize);
          ctx.lineTo(p.x + boxSize, p.y + boxSize - bLen);
          ctx.stroke();
          ctx.restore();
        }

        // Orbital target ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 1.45, 0, Math.PI * 2);
        ctx.strokeStyle = isHighlighted ? "#B6FF3B" : "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = isHighlighted ? 1.5 : 1;
        ctx.stroke();

        // Planet body gradient
        const bodyGrad = ctx.createRadialGradient(
          p.x - r * 0.35,
          p.y - r * 0.35,
          r * 0.1,
          p.x,
          p.y,
          r
        );
        bodyGrad.addColorStop(0, isHighlighted ? "#B6FF3B" : p.color);
        bodyGrad.addColorStop(0.7, "#141414");
        bodyGrad.addColorStop(1, "#070707");

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = bodyGrad;
        ctx.fill();
        ctx.strokeStyle = isHighlighted ? "#B6FF3B" : "#242424";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Small satellite moon orbiting planet
        const satDist = r * 1.5;
        const satX = p.x + Math.cos(p.orbitAngle) * satDist;
        const satY = p.y + Math.sin(p.orbitAngle) * satDist * 0.5;
        ctx.beginPath();
        ctx.arc(satX, satY, 2, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? "#B6FF3B" : "#888";
        ctx.fill();

        // Planet Text Label
        ctx.font = isHighlighted
          ? "bold 12px var(--font-jetbrains-mono), monospace"
          : "11px var(--font-jetbrains-mono), monospace";
        ctx.fillStyle = isHighlighted ? "#B6FF3B" : "#E2E2E2";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(p.tech.name, p.x, p.y + r + 10);

        // Category Sublabel
        ctx.font = "9px var(--font-jetbrains-mono), monospace";
        ctx.fillStyle = isHighlighted ? "#F2F2F2" : "#666666";
        ctx.fillText(p.tech.category.toUpperCase(), p.x, p.y + r + 24);
      });

      // 6. Draw Spaceship on the Left (Abdul Rahman Asad / Core Command)
      ctx.save();
      ctx.translate(shipX, shipY);
      ctx.rotate(shipAngleRef.current);

      // Thruster engine exhaust particles
      for (let i = 0; i < 5; i++) {
        const exhaustLen = 18 + Math.sin(time * 18 + i) * 12;
        const exhaustY = ((i - 2) * 5) + Math.sin(time * 10 + i) * 2;
        ctx.beginPath();
        ctx.moveTo(-28, exhaustY);
        ctx.lineTo(-28 - exhaustLen, exhaustY);
        ctx.strokeStyle = i % 2 === 0 ? "rgba(182, 255, 59, 0.7)" : "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Spaceship Hull Silhouette (Technical arrow-wing craft)
      ctx.beginPath();
      ctx.moveTo(34, 0); // Emitter nose
      ctx.lineTo(8, -14);
      ctx.lineTo(-18, -26); // Left wingtip
      ctx.lineTo(-12, -10);
      ctx.lineTo(-28, -8); // Engine pod left
      ctx.lineTo(-28, 8); // Engine pod right
      ctx.lineTo(-12, 10);
      ctx.lineTo(-18, 26); // Right wingtip
      ctx.lineTo(8, 14);
      ctx.closePath();

      ctx.fillStyle = "#0F0F0F";
      ctx.fill();
      ctx.strokeStyle = "#B6FF3B";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Cockpit core
      ctx.beginPath();
      ctx.ellipse(2, 0, 10, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#1E1E1E";
      ctx.fill();
      ctx.strokeStyle = "#8A8A8A";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Glowing emitter cannon at the tip
      ctx.shadowColor = "#B6FF3B";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(34, 0, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#B6FF3B";
      ctx.fill();

      ctx.restore();

      // Spaceship Label Banner (kept horizontal and crisp)
      ctx.font = "bold 10px var(--font-jetbrains-mono), monospace";
      ctx.fillStyle = "#B6FF3B";
      ctx.textAlign = "center";
      ctx.fillText("ABDUL RAHMAN ASAD", shipX, shipY + 46);

      ctx.font = "8px var(--font-jetbrains-mono), monospace";
      ctx.fillStyle = "#777777";
      ctx.fillText(
        activeAimTarget
          ? `LOCK // ${activeAimTarget.tech.name.toUpperCase()}`
          : "CORE CRAFT // EMITTER",
        shipX,
        shipY + 58
      );

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("click", onClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hoveredTechId, onSelectTech, setCursor, resetCursor]);

  return (
    <div className="relative w-full">
      {/* Top Controls & Telemetry */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[#8A8A8A]">
        <div className="flex items-center space-x-2">
          <Crosshair className="h-3.5 w-3.5 text-[#B6FF3B]" />
          <span>ORIGIN: ABDUL RAHMAN ASAD [MOTHERSHIP]</span>
          <span className="text-[#444]">→</span>
          <span className="text-[#B6FF3B]">DESTINATION: SKILL PLANETS</span>
        </div>

        <button
          onClick={fireAllProbes}
          className="group cursor-pointer flex items-center space-x-2 border border-[#262626] bg-[#0A0A0A] px-3 py-1.5 text-[10px] tracking-wider uppercase text-[#F2F2F2] transition-colors hover:border-[#B6FF3B] hover:text-[#B6FF3B]"
        >
          <Zap className="h-3 w-3 text-[#B6FF3B] transition-transform group-hover:scale-125" />
          <span>FIRE ALL PROBES</span>
        </button>
      </div>

      {/* 2D Interactive Space Canvas */}
      <div
        ref={containerRef}
        className="relative h-[560px] w-full overflow-hidden border border-[#1C1C1C] bg-[#050505] shadow-[0_0_30px_rgba(0,0,0,0.8)] md:h-[620px]"
      >
        {/* 3D Particle Field dots from Hero section strictly inside radar projection section */}
        <TechParticleScene opacity={0.85} count={2600} />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 h-full w-full cursor-crosshair"
        />

        {/* Technical Corner Overlays */}
        <div className="pointer-events-none absolute left-4 top-4 z-20 font-mono text-[10px] text-[#444]">
          RADAR_PROJECTION: 2D_PLANETARY_VECTOR
        </div>
        <div className="pointer-events-none absolute right-4 bottom-4 z-20 font-mono text-[10px] text-[#444]">
          CLICK OR HOVER PLANET TO TARGET & FIRE
        </div>
      </div>
    </div>
  );
}
