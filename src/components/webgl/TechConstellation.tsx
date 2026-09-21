"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { technologies, Technology } from "@/data/technologies";
import { useSystemStore } from "@/store/useSystemStore";

interface TechConstellationProps {
  onSelectTech: (tech: Technology) => void;
}

export function TechConstellation({ onSelectTech }: TechConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const setCursor = useSystemStore((state) => state.setCursor);
  const resetCursor = useSystemStore((state) => state.resetCursor);

  // Build connection line geometry between nodes
  const linePositions = useMemo(() => {
    const techMap = new Map(technologies.map((t) => [t.id, t]));
    const points: number[] = [];

    // Connect center "ASAD" to core technologies
    technologies.forEach((tech) => {
      // Line from center (0,0,0) to node
      points.push(0, 0, 0);
      points.push(...tech.coordinates);

      // Lines between connected tech
      tech.connections.forEach((connId) => {
        const target = techMap.get(connId);
        if (target) {
          points.push(...tech.coordinates);
          points.push(...target.coordinates);
        }
      });
    });

    return new Float32Array(points);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Gentle auto-rotation
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(groupRef.current.rotation.y * 0.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Node: ASAD */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#B6FF3B" wireframe />
      </mesh>
      <Text
        position={[0, 0.55, 0]}
        fontSize={0.16}
        color="#B6FF3B"
        anchorX="center"
        anchorY="middle"
      >
        ABDUL RAHMAN ASAD
      </Text>

      {/* Dynamic Network Lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={hoveredId ? "#B6FF3B" : "#2A2A2A"}
          transparent
          opacity={hoveredId ? 0.45 : 0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Orbiting Tech Nodes */}
      {technologies.map((tech) => {
        const isHovered = hoveredId === tech.id;
        const isConnectedToHovered =
          hoveredId &&
          (tech.connections.includes(hoveredId) ||
            technologies.find((t) => t.id === hoveredId)?.connections.includes(tech.id));

        return (
          <group
            key={tech.id}
            position={tech.coordinates}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(tech.id);
              setCursor("open", "INSPECT");
            }}
            onPointerOut={() => {
              setHoveredId(null);
              resetCursor();
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectTech(tech);
            }}
          >
            {/* Outer ring for hovered node */}
            {isHovered && (
              <mesh>
                <ringGeometry args={[0.26, 0.3, 32]} />
                <meshBasicMaterial
                  color="#B6FF3B"
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            )}

            {/* Satellite Node Core */}
            <mesh scale={isHovered ? 1.4 : isConnectedToHovered ? 1.2 : 1}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshBasicMaterial
                color={
                  isHovered
                    ? "#B6FF3B"
                    : isConnectedToHovered
                    ? "#E0E0E0"
                    : "#666666"
                }
              />
            </mesh>

            {/* Text label */}
            <Text
              position={[0, 0.32, 0]}
              fontSize={isHovered ? 0.22 : 0.16}
              color={isHovered ? "#B6FF3B" : isConnectedToHovered ? "#F2F2F2" : "#8A8A8A"}
              anchorX="center"
              anchorY="middle"
            >
              {tech.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
