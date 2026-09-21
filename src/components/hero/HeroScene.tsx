"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField, BlackHolePhysicsConfig } from "@/components/webgl/ParticleField";
import { HeroBlackHole } from "@/components/webgl/HeroBlackHole";

export function HeroScene() {
  const [particleCount, setParticleCount] = useState(5000);
  const blackHoleRef = useRef<BlackHolePhysicsConfig | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? 1600 : 5200);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-85 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          depth: true,
        }}
      >
        <ambientLight intensity={0.15} />
        <HeroBlackHole
          onPositionUpdate={(bh) => {
            blackHoleRef.current = bh;
          }}
        />
        <ParticleField
          count={particleCount}
          blackHoleRef={blackHoleRef}
        />
      </Canvas>
    </div>
  );
}
