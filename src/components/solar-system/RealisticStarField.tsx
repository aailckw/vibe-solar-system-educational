/**
 * Realistic Star Field Component
 * Renders stars based on real astronomical data from star catalogs
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Points, PointsMaterial, BufferGeometry, TextureLoader, AdditiveBlending, Vector3 } from 'three';
import { 
  getStarCatalog, 
  deepSpaceObjects, 
  raDecToCartesian, 
  getStarColor, 
  getStarSize,
  type StarData,
  type DeepSpaceObject 
} from '@/lib/data/star-catalog';

interface RealisticStarFieldProps {
  radius?: number;
  animated?: boolean;
}

// Individual star point component
function StarPoint({ star, radius }: { star: StarData; radius: number }) {
  const position = useMemo(() => {
    const [x, y, z] = raDecToCartesian(star.ra, star.dec, radius);
    return new Vector3(x, y, z);
  }, [star.ra, star.dec, radius]);

  const size = useMemo(() => getStarSize(star.magnitude), [star.magnitude]);
  const color = useMemo(() => getStarColor(star.spectralClass), [star.spectralClass]);

  return (
    <points position={position}>
      <pointsGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array([0, 0, 0])}
          count={1}
          itemSize={3}
        />
      </pointsGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={Math.max(0.3, 1.0 - star.magnitude / 6.0)}
        blending={AdditiveBlending}
        sizeAttenuation={false}
      />
    </points>
  );
}

// Deep space object component (nebulae, galaxies, etc.)
function DeepSpaceObjectMesh({ object, radius }: { object: DeepSpaceObject; radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const position = useMemo(() => {
    const [x, y, z] = raDecToCartesian(object.ra, object.dec, radius * 0.95);
    return [x, y, z] as [number, number, number];
  }, [object.ra, object.dec, radius]);

  const size = object.size * 2; // Scale up for visibility

  useFrame((state) => {
    if (meshRef.current && object.type === 'nebula') {
      // Gentle pulsing animation for nebulae
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.9;
      meshRef.current.material.opacity = object.brightness * pulse * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        color={object.color}
        transparent
        opacity={object.brightness * 0.3}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

// Main star field component using real astronomical data
export default function RealisticStarField({ radius = 800, animated = true }: RealisticStarFieldProps) {
  const pointsRef = useRef<Points>(null);
  
  // Get the complete star catalog
  const starCatalog = useMemo(() => getStarCatalog(), []);
  
  // Prepare star data for efficient rendering
  const { positions, colors, sizes, opacities } = useMemo(() => {
    const positionsArray: number[] = [];
    const colorsArray: number[] = [];
    const sizesArray: number[] = [];
    const opacitiesArray: number[] = [];
    
    starCatalog.forEach((star) => {
      const [x, y, z] = raDecToCartesian(star.ra, star.dec, radius);
      positionsArray.push(x, y, z);
      
      // Convert hex color to RGB
      const color = getStarColor(star.spectralClass);
      const r = parseInt(color.slice(1, 3), 16) / 255;
      const g = parseInt(color.slice(3, 5), 16) / 255;
      const b = parseInt(color.slice(5, 7), 16) / 255;
      colorsArray.push(r, g, b);
      
      sizesArray.push(getStarSize(star.magnitude));
      
      // Opacity based on magnitude (brighter stars more visible)
      const opacity = Math.max(0.2, Math.min(1.0, 1.5 - star.magnitude / 4.0));
      opacitiesArray.push(opacity);
    });
    
    return {
      positions: new Float32Array(positionsArray),
      colors: new Float32Array(colorsArray),
      sizes: new Float32Array(sizesArray),
      opacities: new Float32Array(opacitiesArray),
    };
  }, [starCatalog, radius]);

  // Gentle rotation animation
  useFrame((state) => {
    if (pointsRef.current && animated) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.00005; // Very slow rotation
    }
  });

  return (
    <group>
      {/* Main star field */}
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
          <bufferAttribute
            attach="attributes-opacity"
            array={opacities}
            count={opacities.length}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          transparent
          blending={AdditiveBlending}
          sizeAttenuation={false}
          alphaTest={0.01}
        />
      </points>

      {/* Deep space objects */}
      {deepSpaceObjects.map((object) => (
        <DeepSpaceObjectMesh
          key={object.id}
          object={object}
          radius={radius}
        />
      ))}

      {/* Milky Way background glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.2, 64, 32]} />
        <meshBasicMaterial
          color="#1a1a2e"
          transparent
          opacity={0.1}
          side={2} // DoubleSide
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Named star component for educational purposes
export function NamedStarLabels({ radius = 800 }: { radius?: number }) {
  const starCatalog = useMemo(() => getStarCatalog(), []);
  const namedStars = starCatalog.filter(star => star.name && star.magnitude < 1.5);

  return (
    <group>
      {namedStars.map((star) => {
        const [x, y, z] = raDecToCartesian(star.ra, star.dec, radius * 1.05);
        return (
          <mesh key={star.id} position={[x, y, z]}>
            <planeGeometry args={[8, 2]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.7}
            />
            {/* Note: In a real implementation, you'd want to use HTML overlays or a text geometry library */}
          </mesh>
        );
      })}
    </group>
  );
}