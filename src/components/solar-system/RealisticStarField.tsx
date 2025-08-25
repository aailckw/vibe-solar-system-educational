/**
 * Enhanced Star Field Component
 * Renders stars with improved visibility using cubic distribution for better all-direction visibility
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points } from 'three';

interface RealisticStarFieldProps {
  radius?: number;        // Radius of the star field
  maxStars?: number;      // Maximum number of stars to render (for performance)
  animated?: boolean;     // Whether stars should twinkle
}

export default function RealisticStarField({ 
  radius = 2000, 
  maxStars = 5000,
  animated = true
}: RealisticStarFieldProps) {
  const pointsRef = useRef<Points>(null);
  
  // Generate star data with enhanced visibility using cubic distribution
  const { positions, colors, sizes } = useMemo(() => {
    // Create arrays for star data
    const positionsArray = new Float32Array(maxStars * 3);
    const colorsArray = new Float32Array(maxStars * 3);
    const sizesArray = new Float32Array(maxStars);
    
    // Generate random stars distributed in a cube for better all-direction visibility
    for (let i = 0; i < maxStars; i++) {
      // Uniform distribution in a cube
      const x = (Math.random() - 0.5) * 2 * radius;
      const y = (Math.random() - 0.5) * 2 * radius;
      const z = (Math.random() - 0.5) * 2 * radius;
      
      positionsArray[i * 3] = x;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = z;
      
      // Enhanced star colors for better visibility (brighter colors)
      const colorVariation = Math.random();
      if (colorVariation < 0.6) {
        // Bright white stars
        colorsArray[i * 3] = 1.0;
        colorsArray[i * 3 + 1] = 1.0;
        colorsArray[i * 3 + 2] = 1.0;
      } else if (colorVariation < 0.8) {
        // Bright blue-white stars
        colorsArray[i * 3] = 0.9;
        colorsArray[i * 3 + 1] = 0.9;
        colorsArray[i * 3 + 2] = 1.0;
      } else {
        // Bright yellow-orange stars
        colorsArray[i * 3] = 1.0;
        colorsArray[i * 3 + 1] = 1.0;
        colorsArray[i * 3 + 2] = 0.8;
      }
      
      // Larger star sizes for better visibility
      sizesArray[i] = 2.0 + Math.random() * 3.0;
    }
    
    return {
      positions: positionsArray,
      colors: colorsArray,
      sizes: sizesArray,
    };
  }, [radius, maxStars]);
  
  // Animation for gentle rotation
  useFrame((state) => {
    if (animated && pointsRef.current) {
      const time = state.clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.02; // Slightly faster rotation for better visibility
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
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={sizes.length}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        size={5.0} // Increased size for better visibility with new scale
        sizeAttenuation={false}
        alphaTest={0.0} // Reduced alpha test for better visibility
        depthWrite={false}
        depthTest={false} // Disable depth testing for stars to ensure they're always visible
        blending={1} // Normal blending for better visibility
      />
    </points>
  );
}