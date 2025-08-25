import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide, AdditiveBlending } from 'three';

interface SunEffectsProps {
  size: number;
}

// Solar flares - dynamic, bright emissions from the Sun's surface
export function SolarFlares({ size }: SunEffectsProps) {
  const flaresRef = useRef<any>(null);
  
  // Create multiple flares at different positions
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
      
      const x = size * 1.1 * Math.sin(theta) * Math.cos(phi);
      const y = size * 1.1 * Math.cos(theta);
      const z = size * 1.1 * Math.sin(theta) * Math.sin(phi);
      
      positions.push([x, y, z]);
      sizes.push(0.15 + Math.random() * 0.85);
      delays.push(Math.random() * Math.PI * 2);
      speeds.push(0.3 + Math.random() * 2.0);
      
      // Different colors for variety
      const colorOptions = ['#FFD700', '#FFA500', '#FF8C00', '#FF6347'];
      colors.push(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    }
    
    return { positions, sizes, delays, speeds, colors };
  }, [size]);
  
  useFrame((state) => {
    if (flaresRef.current) {
      // Update flare opacities based on time for dynamic effect
      const time = state.clock.elapsedTime;
      flaresRef.current.children.forEach((flare: any, index: number) => {
        const delay = flareData.delays[index];
        const speed = flareData.speeds[index];
        const opacity = 0.1 + Math.sin(time * speed + delay) * 0.4;
        flare.material.opacity = Math.max(0, opacity);
        
        // Add subtle scaling animation
        const scale = 0.7 + Math.sin(time * speed * 0.7 + delay) * 0.5;
        flare.scale.setScalar(scale);
      });
    }
  });
  
  const flareElements = flareData.positions.map((position, index) => 
    React.createElement('mesh', { key: index, position: position },
      React.createElement('sphereGeometry', { args: [flareData.sizes[index] * size * 0.05, 16, 16] }), // Reduced radius by 10x
      React.createElement('meshBasicMaterial', {
        color: flareData.colors[index],
        transparent: true,
        opacity: 0.6,
        blending: AdditiveBlending,
        depthWrite: false
      })
    )
  );
  
  return React.createElement('group', { ref: flaresRef }, ...flareElements);
}

// Lens flare effect for additional radiance
export function SunLensFlare({ size }: SunEffectsProps) {
  const flareRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (flareRef.current) {
      // Gentle pulsing and rotation for the lens flare
      const time = state.clock.elapsedTime;
      const pulse1 = 0.6 + Math.sin(time * 0.4) * 0.4;
      const pulse2 = 0.7 + Math.sin(time * 1.0) * 0.3;
      const pulse3 = 0.8 + Math.sin(time * 2.2) * 0.2;
      const totalPulse = pulse1 * pulse2 * pulse3;
      flareRef.current.scale.setScalar(totalPulse);
      flareRef.current.rotation.z = time * 0.3;
      
      // Color shift for dynamic appearance
      const colorShift = Math.sin(time * 0.5) * 0.15;
      const material = flareRef.current.material as any;
      material.color.setRGB(
        1.0,
        0.6 + colorShift,
        0.0
      );
    }
  });
  
  return React.createElement('mesh', { ref: flareRef },
    React.createElement('sphereGeometry', { args: [size * 0.4, 32, 32] }), // Reduced radius by 10x
    React.createElement('meshBasicMaterial', {
      color: "#FF8C00",
      transparent: true,
      opacity: 0.15,
      side: DoubleSide,
      blending: AdditiveBlending,
      depthWrite: false
    })
  );
}

// Main Sun effects component that combines all effects
export default function SunEffects({ size }: SunEffectsProps) {
  return React.createElement('group', null,
    React.createElement(SolarFlares, { size }),
    React.createElement(SunLensFlare, { size })
  );
}