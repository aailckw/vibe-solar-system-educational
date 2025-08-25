import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Mesh, DoubleSide, AdditiveBlending } from 'three';

interface EnhancedSunProps {
  size: number;
  position?: [number, number, number];
}

// Sun core with enhanced material properties
export function SunCore({ size }: { size: number }) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle pulsing animation for the sun core
      const time = state.clock.elapsedTime;
      const pulse = 1 + Math.sin(time * 0.3) * 0.02;
      meshRef.current.scale.setScalar(pulse);
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFA500"
        emissiveIntensity={3.0}
        roughness={0.0}
        metalness={1.0}
        envMapIntensity={2.0}
      />
    </mesh>
  );
}

// Sun corona with dynamic animation
export function SunCorona({ size }: { size: number }) {
  const coronaRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (coronaRef.current) {
      // Multi-frequency pulsing for more natural appearance
      const time = state.clock.elapsedTime;
      const pulse1 = Math.sin(time * 0.2) * 0.1;
      const pulse2 = Math.sin(time * 0.5) * 0.05;
      const pulse3 = Math.sin(time * 1.0) * 0.03;
      const totalPulse = 1 + pulse1 + pulse2 + pulse3;
      coronaRef.current.scale.setScalar(totalPulse);
    }
  });
  
  return (
    <mesh ref={coronaRef}>
      <sphereGeometry args={[size * 2.5, 32, 32]} />
      <meshBasicMaterial
        color="#FF8C00"
        transparent={true}
        opacity={0.15}
        side={DoubleSide}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Solar flares with dynamic behavior
export function SolarFlares({ size }: { size: number }) {
  const flaresGroupRef = useRef<THREE.Group>(null);
  
  // Create multiple flares with different properties
  const flareData = useMemo(() => {
    const count = 15;
    const positions: [number, number, number][] = [];
    const sizes: number[] = [];
    const delays: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];
    
    for (let i = 0; i < count; i++) {
      // Random positions on the sphere surface
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      const x = size * 1.2 * Math.sin(theta) * Math.cos(phi);
      const y = size * 1.2 * Math.cos(theta);
      const z = size * 1.2 * Math.sin(theta) * Math.sin(phi);
      
      positions.push([x, y, z]);
      sizes.push(0.1 + Math.random() * 0.5);
      delays.push(Math.random() * Math.PI * 2);
      speeds.push(0.3 + Math.random() * 1.5);
      
      // Different colors for variety
      const colorOptions = ['#FFD700', '#FFA500', '#FF8C00', '#FF6347'];
      colors.push(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    }
    
    return { positions, sizes, delays, speeds, colors };
  }, [size]);
  
  useFrame((state) => {
    if (flaresGroupRef.current) {
      const time = state.clock.elapsedTime;
      flaresGroupRef.current.children.forEach((flare: THREE.Object3D, index: number) => {
        const delay = flareData.delays[index];
        const speed = flareData.speeds[index];
        
        // Dynamic opacity changes
        const opacity = 0.1 + Math.sin(time * speed + delay) * 0.2;
        ((flare as THREE.Mesh).material as THREE.Material).opacity = Math.max(0, opacity);
        
        // Gentle scaling animation
        const scale = 0.7 + Math.sin(time * speed * 0.6 + delay) * 0.3;
        (flare as THREE.Mesh).scale.setScalar(scale);
      });
    }
  });
  
  return (
    <group ref={flaresGroupRef}>
      {flareData.positions.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[flareData.sizes[index] * size * 0.5, 16, 16]} />
          <meshBasicMaterial
            color={flareData.colors[index]}
            transparent={true}
            opacity={0.3}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main enhanced sun component
export default function EnhancedSun({ size, position = [0, 0, 0] }: EnhancedSunProps) {
  return (
    <group position={position}>
      <SunCore size={size} />
      <SunCorona size={size} />
      <SolarFlares size={size} />
    </group>
  );
}