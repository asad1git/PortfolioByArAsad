"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSystemStore } from "@/store/useSystemStore";

export interface BlackHolePhysicsConfig {
  x: number;
  y: number;
  z: number;
  horizonRadius: number;
  influenceRadius?: number;
}

interface ParticleFieldProps {
  count?: number;
  blackHole?: BlackHolePhysicsConfig | null;
  blackHoleRef?: React.RefObject<BlackHolePhysicsConfig | null>;
  clearMoon?: boolean;
}

export function ParticleField({
  count = 5000,
  blackHole = null,
  blackHoleRef,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const scrollVelocity = useSystemStore((state) => state.scrollVelocity);

  // Mouse position in normalized 3D space
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Compute camera & boundary constants
  const camZ = 7;
  const baseW = Math.max(viewport.width, 14);
  const baseH = Math.max(viewport.height, 8);
  const maxR = Math.max(baseW, baseH) * 1.35;

  // Estimated baseline black hole position at posZ = 0.5
  const defaultBhX = viewport.width * 0.28;
  const defaultBhY = viewport.height * 0.22;
  const defaultBhZ = 0.5;

  // Polar coordinate buffers for circular accretion vortex (angle & radius)
  const polarAngles = useMemo(() => new Float32Array(count), [count]);
  const polarRadii = useMemo(() => new Float32Array(count), [count]);

  // Generate buffer geometry attributes with 360-degree uniform area distribution
  const [positions, colors, originalPositions, originalColors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const origCols = new Float32Array(count * 3);

    const cWhite = new THREE.Color("#F2F2F2");
    const cDim = new THREE.Color("#555555");
    const cAccent = new THREE.Color("#B6FF3B");

    const minR = 0.8;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Uniform 360-degree angle around the black hole (right, top, left, bottom)
      const angle = Math.random() * Math.PI * 2;
      // Uniform 2D area distribution (r = sqrt(u) * maxR)
      const radius = minR + Math.sqrt(Math.random()) * (maxR - minR);

      polarAngles[i] = angle;
      polarRadii[i] = radius;

      // Depth strictly placed in the background layer behind the black hole (z <= -0.7)
      const z = -0.7 - Math.random() * 3.6;

      // Perspective correction so the line of sight from camera (0,0,7) through (defaultBhX, defaultBhY, defaultBhZ)
      // aligns perfectly with the center of the particle vortex at depth z
      const perspectiveScale = (camZ - z) / (camZ - defaultBhZ);
      const initCenterX = defaultBhX * perspectiveScale;
      const initCenterY = defaultBhY * perspectiveScale;

      const x = initCenterX + Math.cos(angle) * radius;
      const y = initCenterY + Math.sin(angle) * radius;

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      orig[i3] = x;
      orig[i3 + 1] = y;
      orig[i3 + 2] = z;

      // 88% monochrome stars, 12% signature accent
      const rand = Math.random();
      let color: THREE.Color;
      if (rand < 0.12) {
        color = cAccent;
      } else if (rand < 0.6) {
        color = cWhite;
      } else {
        color = cDim;
      }

      cols[i3] = color.r;
      cols[i3 + 1] = color.g;
      cols[i3 + 2] = color.b;

      origCols[i3] = color.r;
      origCols[i3 + 1] = color.g;
      origCols[i3 + 2] = color.b;
    }

    return [pos, cols, orig, origCols];
  }, [count, maxR, defaultBhX, defaultBhY, defaultBhZ, polarAngles, polarRadii]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Smooth cursor interpolation
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

    // Do NOT apply independent rotation to pointsRef when black hole is active,
    // so particles and black hole remain in 100% unified world space
    const activeBlackHole = blackHoleRef ? blackHoleRef.current : blackHole;
    if (!activeBlackHole) {
      pointsRef.current.rotation.y = mouseRef.current.x * 0.035;
      pointsRef.current.rotation.x = -mouseRef.current.y * 0.025;
    } else {
      pointsRef.current.rotation.set(0, 0, 0);
    }

    const time = state.clock.getElapsedTime();
    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const colorAttribute = pointsRef.current.geometry.attributes.color;
    const posArr = positionAttribute.array as Float32Array;
    const colArr = colorAttribute.array as Float32Array;

    const velInfluence = Math.min(Math.abs(scrollVelocity) * 0.04, 1.2);
    let colorsModified = false;

    if (activeBlackHole) {
      const bhX = activeBlackHole.x;
      const bhY = activeBlackHole.y;
      const bhZ = activeBlackHole.z;
      const rHoriz = activeBlackHole.horizonRadius;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        let r = polarRadii[i];
        let a = polarAngles[i];
        const pz = posArr[i3 + 2];

        // 1. EXACT CAMERA PERSPECTIVE LINE-OF-SIGHT ALIGNMENT:
        // Camera is at (0, 0, camZ). Line of sight through black hole (bhX, bhY, bhZ)
        // intersects plane at depth pz at (centerX, centerY)
        const perspectiveScale = (camZ - pz) / (camZ - bhZ);
        const centerX = bhX * perspectiveScale;
        const centerY = bhY * perspectiveScale;

        // Visual horizon scaled to this particle's depth in perspective
        const visualHorizon = rHoriz * perspectiveScale;
        const rConsume = visualHorizon * 0.95;

        // 2. EVENT HORIZON CONSUMPTION & 360-DEGREE REPLENISHMENT:
        // Inside the event horizon, particle is swallowed directly into the center
        if (r < rConsume) {
          // Respawn at outer boundary in all 360 degrees (right, top, bottom, left)
          a = Math.random() * Math.PI * 2;
          r = maxR * (0.85 + Math.random() * 0.25);

          polarAngles[i] = a;
          polarRadii[i] = r;

          posArr[i3] = centerX + Math.cos(a) * r;
          posArr[i3 + 1] = centerY + Math.sin(a) * r;

          // Restore original color
          colArr[i3] = originalColors[i3];
          colArr[i3 + 1] = originalColors[i3 + 1];
          colArr[i3 + 2] = originalColors[i3 + 2];
          colorsModified = true;
          continue;
        }

        // 3. CIRCULAR ACCRETION VORTEX (Tangential Orbital Motion):
        // Keplerian angular velocity spins particles in circles around the black hole center
        const omega = 0.038 / (Math.pow(Math.max(r, 0.4), 0.58) + 0.35);
        a += omega;

        // 4. INWARD SPIRAL GRAVITATIONAL PULL:
        // Draws particles steadily inward along the circular spiral path
        const vIn = 0.008 + 0.048 / (Math.pow(Math.max(r, 0.4), 0.75) + 0.45);
        r -= vIn;

        polarAngles[i] = a;
        polarRadii[i] = r;

        // Exactly centered on the perspective line of sight of the black hole
        posArr[i3] = centerX + Math.cos(a) * r;
        posArr[i3 + 1] = centerY + Math.sin(a) * r;

        // 5. ACCRETION PLASMA ENERGIZATION & HORIZON LIGHT ABSORPTION:
        // As particles near the event horizon, heat them into bright green/white plasma
        if (r < visualHorizon * 3.6) {
          const heat = 1 - (r - visualHorizon) / (visualHorizon * 2.6);
          const clampedHeat = Math.max(0, Math.min(1, heat));

          // Near event horizon rim (r < visualHorizon * 1.15): light gets swallowed, fading to black
          if (r < visualHorizon * 1.15) {
            const fade = (r - rConsume) / (visualHorizon * 1.15 - rConsume);
            const clampedFade = Math.max(0, Math.min(1, fade));
            colArr[i3] = clampedFade * 0.8;
            colArr[i3 + 1] = clampedFade;
            colArr[i3 + 2] = clampedFade * 0.3;
          } else {
            // Brilliant glowing plasma
            colArr[i3] = THREE.MathUtils.lerp(originalColors[i3], 0.71, clampedHeat);
            colArr[i3 + 1] = THREE.MathUtils.lerp(originalColors[i3 + 1], 1.0, clampedHeat);
            colArr[i3 + 2] = THREE.MathUtils.lerp(originalColors[i3 + 2], 0.23, clampedHeat);
          }
          colorsModified = true;
        }
      }
    } else {
      // Standard organic cosmic wave when no black hole is active
      for (let i = 0; i < count; i += 2) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const wave = Math.sin(time * 0.5 + ox * 0.35 + oy * 0.25) * (0.12 + velInfluence * 0.08);
        posArr[i3 + 1] = oy + wave;
      }
    }

    positionAttribute.needsUpdate = true;
    if (colorsModified) {
      colorAttribute.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} renderOrder={1}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.048}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthTest={true}
        depthWrite={false}
      />
    </points>
  );
}
