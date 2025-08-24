/**
 * Astronomical Background Component
 * Combines realistic star field with astronomical imagery
 */

'use client';

import React, { useMemo, useRef, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, AdditiveBlending, BackSide } from 'three';
import RealisticStarField from './RealisticStarField';

interface AstronomicalBackgroundProps {
  radius?: number;
  showMilkyWay?: boolean;
  showNebulae?: boolean;
  animated?: boolean;
}

// Milky Way background component
function MilkyWayBackground({ radius }: { radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // In a real implementation, load actual Milky Way panorama from NASA
  // For now, create a gradient effect
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.00002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius * 1.5, 64, 32]} />
      <meshBasicMaterial
        color="#0f0f2e"
        transparent
        opacity={0.3}
        side={BackSide}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

// Nebula fields component
function NebulaFields({ radius }: { radius: number }) {
  const nebulae = useMemo(() => [
    { 
      position: [radius * 0.8, radius * 0.3, -radius * 0.5] as [number, number, number],
      color: '#ff6b9d',
      scale: 0.3,
      opacity: 0.15
    },
    { 
      position: [-radius * 0.6, -radius * 0.4, radius * 0.7] as [number, number, number],
      color: '#4ecdc4',
      scale: 0.25,
      opacity: 0.12
    },
    { 
      position: [radius * 0.2, -radius * 0.8, -radius * 0.3] as [number, number, number],
      color: '#ffe66d',
      scale: 0.2,
      opacity: 0.1
    },
    { 
      position: [-radius * 0.9, radius * 0.1, radius * 0.2] as [number, number, number],
      color: '#a8e6cf',
      scale: 0.35,
      opacity: 0.08
    }
  ], [radius]);

  return (
    <group>
      {nebulae.map((nebula, index) => (
        <NebulaCloud
          key={index}
          position={nebula.position}
          color={nebula.color}
          scale={nebula.scale}
          opacity={nebula.opacity}
          animationOffset={index * Math.PI * 0.5}
        />
      ))}
    </group>
  );
}

// Individual nebula cloud
function NebulaCloud({ 
  position, 
  color, 
  scale, 
  opacity,
  animationOffset = 0
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  opacity: number;
  animationOffset?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + animationOffset;
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(time * 0.2) * 5;
      meshRef.current.rotation.z = time * 0.1;
      
      // Subtle opacity variation
      const opacityVariation = Math.sin(time * 0.3) * 0.02;
      (meshRef.current.material as any).opacity = opacity + opacityVariation;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[50, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

// Distant galaxy component
function DistantGalaxies({ radius }: { radius: number }) {
  const galaxies = useMemo(() => [
    {
      position: [radius * 0.95, 0, 0] as [number, number, number],
      size: 8,
      color: '#f8f8ff',
      opacity: 0.4
    },
    {
      position: [-radius * 0.85, radius * 0.4, -radius * 0.3] as [number, number, number],
      size: 6,
      color: '#ffd700',
      opacity: 0.3
    },
    {
      position: [0, -radius * 0.9, radius * 0.2] as [number, number, number],
      size: 5,
      color: '#e6e6fa',
      opacity: 0.35
    }
  ], [radius]);

  return (
    <group>
      {galaxies.map((galaxy, index) => (
        <mesh key={index} position={galaxy.position}>
          <sphereGeometry args={[galaxy.size, 8, 8]} />
          <meshBasicMaterial
            color={galaxy.color}
            transparent
            opacity={galaxy.opacity}
            blending={AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main astronomical background component
export default function AstronomicalBackground({
  radius = 800,
  showMilkyWay = true,
  showNebulae = true,
  animated = true
}: AstronomicalBackgroundProps) {
  return (
    <Suspense fallback={null}>
      <group>
        {/* Realistic star field with actual star catalog data */}
        <RealisticStarField radius={radius} animated={animated} />
        
        {/* Milky Way background */}
        {showMilkyWay && <MilkyWayBackground radius={radius} />}
        
        {/* Nebula fields for visual enhancement */}
        {showNebulae && <NebulaFields radius={radius} />}
        
        {/* Distant galaxies */}
        <DistantGalaxies radius={radius} />
        
        {/* Cosmic dust and gas clouds */}
        <CosmicDust radius={radius} />
      </group>
    </Suspense>
  );
}

// Cosmic dust component for added realism
function CosmicDust({ radius }: { radius: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, opacities } = useMemo(() => {
    const count = 1000;
    const positionsArray = new Float32Array(count * 3);
    const opacitiesArray = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Random spherical distribution
      const phi = Math.random() * Math.PI * 2;
      const costheta = Math.random() * 2 - 1;
      const sintheta = Math.sqrt(1 - costheta * costheta);
      const r = radius * (0.7 + Math.random() * 0.3); // Between 70-100% of radius
      
      positionsArray[i * 3] = r * sintheta * Math.cos(phi);
      positionsArray[i * 3 + 1] = r * costheta;
      positionsArray[i * 3 + 2] = r * sintheta * Math.sin(phi);
      
      opacitiesArray[i] = Math.random() * 0.1; // Very faint
    }
    
    return {
      positions: positionsArray,
      opacities: opacitiesArray
    };
  }, [radius]);

  useFrame((state) => {
    if (pointsRef.current && state.clock.elapsedTime) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.00001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-opacity"
          array={opacities}
          count={opacities.length}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#444466"
        transparent
        opacity={0.3}
        blending={AdditiveBlending}
        sizeAttenuation={false}
      />
    </points>
  );
}

// Configuration for different sky modes
export const skyModes = {
  scientific: {
    showMilkyWay: true,
    showNebulae: false,
    animated: false,
  },
  enhanced: {
    showMilkyWay: true,
    showNebulae: true,
    animated: true,
  },
  minimal: {
    showMilkyWay: false,
    showNebulae: false,
    animated: false,
  }
};