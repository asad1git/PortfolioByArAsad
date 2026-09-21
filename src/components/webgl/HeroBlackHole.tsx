"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export interface BlackHoleState {
  x: number;
  y: number;
  z: number;
  horizonRadius: number;
  influenceRadius: number;
}

interface HeroBlackHoleProps {
  onPositionUpdate?: (bh: BlackHoleState) => void;
}

export function HeroBlackHole({ onPositionUpdate }: HeroBlackHoleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const diskMeshRef = useRef<THREE.Mesh>(null);
  const lensUpperRef = useRef<THREE.Mesh>(null);
  const lensLowerRef = useRef<THREE.Mesh>(null);
  const photonRingRef = useRef<THREE.Mesh>(null);
  const jetRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Compute adaptive sizing and position in upper-right quadrant
  const isMobile = viewport.width < 10;
  const horizonRadius = isMobile ? 0.45 : 0.68;
  const influenceRadius = 30.0;
  const posX = viewport.width * 0.28;
  const posY = viewport.height * 0.22;
  const posZ = 0.5;

  useEffect(() => {
    if (onPositionUpdate) {
      onPositionUpdate({
        x: posX,
        y: posY,
        z: posZ,
        horizonRadius,
        influenceRadius: 30.0,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [posX, posY, posZ, horizonRadius, onPositionUpdate]);

  // Procedural high-res relativistic accretion disk texture with Doppler beaming & plasma filaments
  const diskTexture = useMemo(() => {
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const cx = 512;
    const cy = 512;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Multi-band plasma rings
    const ringBands = 80;
    for (let r = 160; r < 490; r += 4) {
      const normR = (r - 160) / (490 - 160);
      const intensity = Math.pow(Math.sin(normR * Math.PI), 1.6);

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);

      // Inner accretion is intense white-hot, transitioning to lime plasma, then dark interstellar dust
      let colorStr: string;
      if (normR < 0.2) {
        colorStr = `rgba(255, 255, 255, ${0.85 * intensity})`;
      } else if (normR < 0.6) {
        colorStr = `rgba(182, 255, 59, ${0.75 * intensity})`;
      } else {
        colorStr = `rgba(120, 190, 40, ${0.45 * intensity})`;
      }

      ctx.strokeStyle = colorStr;
      ctx.lineWidth = 3.5 + Math.random() * 2;
      ctx.stroke();
    }

    // Swirling spiral turbulent matter filaments
    for (let i = 0; i < 320; i++) {
      const angle = (i / 320) * Math.PI * 2;
      const rStart = 160 + Math.random() * 320;
      const len = 40 + Math.random() * 90;
      const swirlFactor = 0.35;

      ctx.beginPath();
      for (let s = 0; s < len; s += 5) {
        const curR = rStart + s;
        const curAngle = angle + s * 0.008 * swirlFactor;
        const x = cx + Math.cos(curAngle) * curR;
        const y = cy + Math.sin(curAngle) * curR;
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      const alpha = Math.random() * 0.45 + 0.1;
      ctx.strokeStyle = Math.random() > 0.4 ? `rgba(182, 255, 59, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = Math.random() * 2.5 + 0.8;
      ctx.stroke();
    }

    // Relativistic Doppler Beaming Gradient (Approaching side is boosted, receding side is dimmer)
    const dopplerGrad = ctx.createLinearGradient(0, cy, canvas.width, cy);
    dopplerGrad.addColorStop(0.0, "rgba(255, 255, 255, 0.45)");
    dopplerGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.15)");
    dopplerGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.2)");
    dopplerGrad.addColorStop(1.0, "rgba(0, 0, 0, 0.65)");

    ctx.fillStyle = dopplerGrad;
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);

  useFrame((state, delta) => {
    // Parallax interpolation
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

    const currentX = posX + mouseRef.current.x * 0.22;
    const currentY = posY + mouseRef.current.y * 0.22;
    const currentZ = posZ;

    if (groupRef.current) {
      groupRef.current.position.set(currentX, currentY, currentZ);
      // Subtle tilt responsive to cursor
      groupRef.current.rotation.x = 0.28 - mouseRef.current.y * 0.08;
      groupRef.current.rotation.y = -0.15 + mouseRef.current.x * 0.1;
    }

    // Real-time position callback to feed gravitational particle physics
    if (onPositionUpdate) {
      onPositionUpdate({
        x: currentX,
        y: currentY,
        z: currentZ,
        horizonRadius,
        influenceRadius,
      });
    }

    // Relativistic accretion disk rotation
    if (diskMeshRef.current) {
      diskMeshRef.current.rotation.z += delta * 0.65;
    }
    if (lensUpperRef.current) {
      lensUpperRef.current.rotation.z -= delta * 0.45;
    }
    if (lensLowerRef.current) {
      lensLowerRef.current.rotation.z += delta * 0.45;
    }

    // High frequency photon ring pulse
    if (photonRingRef.current) {
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 4) * 0.03;
      photonRingRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const diskInner = horizonRadius * 1.28;
  const diskOuter = horizonRadius * 3.4;

  return (
    <group ref={groupRef} position={[posX, posY, posZ]}>
      {/* 1. Singularity & Event Horizon (Absorbs 100% of light, pitch-black & completely opaque) */}
      <mesh renderOrder={0}>
        <sphereGeometry args={[horizonRadius, 64, 64]} />
        <meshBasicMaterial
          color="#000000"
          depthTest={true}
          depthWrite={true}
        />
      </mesh>

      {/* 2. Intense Photon Sphere Ring (Ultra-sharp boundary where light orbits the event horizon) */}
      <mesh ref={photonRingRef} renderOrder={1}>
        <ringGeometry args={[horizonRadius * 1.01, horizonRadius * 1.09, 128]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary Accent Photon Boundary */}
      <mesh renderOrder={1}>
        <ringGeometry args={[horizonRadius * 1.08, horizonRadius * 1.22, 128]} />
        <meshBasicMaterial
          color="#B6FF3B"
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Equatorial Swirling Accretion Disk */}
      <mesh
        ref={diskMeshRef}
        rotation={[-Math.PI * 0.42, 0, 0]}
        renderOrder={2}
      >
        <ringGeometry args={[diskInner, diskOuter, 128]} />
        <meshBasicMaterial
          map={diskTexture}
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Gravitational Lensing Upper Arch (Interstellar Gargantua upper lensed disk) */}
      <mesh
        ref={lensUpperRef}
        position={[0, horizonRadius * 0.22, -horizonRadius * 0.15]}
        rotation={[Math.PI * 0.48, 0, 0]}
        renderOrder={2}
      >
        <ringGeometry args={[diskInner * 0.98, diskOuter * 0.72, 128]} />
        <meshBasicMaterial
          map={diskTexture}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 5. Gravitational Lensing Lower Arch (Gargantua lower lensed disk) */}
      <mesh
        ref={lensLowerRef}
        position={[0, -horizonRadius * 0.22, -horizonRadius * 0.15]}
        rotation={[-Math.PI * 0.48, 0, 0]}
        renderOrder={2}
      >
        <ringGeometry args={[diskInner * 0.98, diskOuter * 0.72, 128]} />
        <meshBasicMaterial
          map={diskTexture}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 6. Relativistic Magnetic Polar Jet Emission */}
      <mesh ref={jetRef} rotation={[0, 0, 0]} renderOrder={1}>
        <cylinderGeometry args={[0.015, 0.08, horizonRadius * 4.5, 16]} />
        <meshBasicMaterial
          color="#B6FF3B"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
