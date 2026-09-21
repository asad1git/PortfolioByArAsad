"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "@/components/webgl/ParticleField";

interface TechParticleSceneProps {
  count?: number;
  opacity?: number;
  className?: string;
}

export function TechParticleScene({
  count,
  opacity = 0.85,
  className,
}: TechParticleSceneProps) {
  const [particleCount, setParticleCount] = useState(count ?? 2600);

  useEffect(() => {
    if (count) {
      setParticleCount(count);
      return;
    }
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? 1000 : 2600);
  }, [count]);

  return (
    <div
      className={
        className ??
        "absolute inset-0 z-0 pointer-events-none overflow-hidden"
      }
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <ambientLight intensity={0.15} />
        <ParticleField count={particleCount} />
      </Canvas>
    </div>
  );
}
