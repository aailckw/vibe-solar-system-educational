/**
 * NASA Astronomical Background with Real Space Imagery
 * Uses actual NASA and ESA images for realistic space environment
 */

'use client';

import React, { useMemo, useRef, Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, AdditiveBlending, BackSide, RepeatWrapping } from 'three';
import { getStarCatalog, raDecToCartesian, getStarColor, getStarSize } from '@/lib/data/star-catalog';

interface NASAStarFieldProps {
  radius?: number;
  useRealImages?: boolean;
  animated?: boolean;
}

// NASA Milky Way Background using real astronomical imagery
function MilkyWayPanorama({ radius, useRealImages }: { radius: number; useRealImages: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Try to load real NASA Milky Way image, fallback to procedural
  let milkyWayTexture = null;
  try {
    if (useRealImages) {
      // Load NASA/ESA Gaia all-sky survey image
      milkyWayTexture = useLoader(TextureLoader, '/textures/backgrounds/milky_way_gaia.jpg');
      milkyWayTexture.wrapS = RepeatWrapping;
      milkyWayTexture.wrapT = RepeatWrapping;
    }
  } catch (error) {
    console.log('NASA Milky Way image not found, using procedural background');
  }

  useFrame((state) => {
    if (meshRef.current) {
      // Very slow rotation to simulate Earth's rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.00001;
    }
  });

  if (milkyWayTexture) {
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius * 1.8, 128, 64]} />
        <meshBasicMaterial
          map={milkyWayTexture}
          side={BackSide}
          transparent
          opacity={0.6}
        />
      </mesh>
    );
  }

  // Fallback procedural Milky Way
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius * 1.5, 64, 32]} />
      <meshBasicMaterial
        color="#0a0a2e"
        transparent
        opacity={0.3}
        side={BackSide}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

// Real Nebula using NASA Hubble images
function HubbleNebula({ 
  position, 
  imagePath, 
  size = 20, 
  color = '#ff69b4',
  name = 'Nebula' 
}: {
  position: [number, number, number];
  imagePath: string;
  size?: number;
  color?: string;
  name?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  let nebulaTexture = null;
  try {
    nebulaTexture = useLoader(TextureLoader, imagePath);
  } catch (error) {
    console.log(`${name} image not found at ${imagePath}, using procedural`);
  }

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing for nebulae
      const pulse = Math.sin(state.clock.elapsedTime * 0.3) * 0.1 + 0.9;
      (meshRef.current.material as any).opacity = 0.4 * pulse;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={nebulaTexture}
        color={nebulaTexture ? '#ffffff' : color}
        transparent
        opacity={0.4}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

// Deep Space Field using Hubble Deep Field imagery
function HubbleDeepField({ radius }: { radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  let deepFieldTexture = null;
  try {
    deepFieldTexture = useLoader(TextureLoader, '/textures/backgrounds/hubble_deep_field.jpg');
  } catch (error) {
    console.log('Hubble Deep Field image not found');
  }

  if (!deepFieldTexture) return null;

  return (
    <mesh ref={meshRef} position={[radius * 0.9, 0, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial
        map={deepFieldTexture}
        transparent
        opacity={0.3}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

// Star field with real star catalog data (enhanced)
function EnhancedStarField({ radius }: { radius: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const starCatalog = useMemo(() => getStarCatalog(), []);

  const { positions, colors, sizes } = useMemo(() => {
    const positionsArray: number[] = [];
    const colorsArray: number[] = [];
    const sizesArray: number[] = [];

    starCatalog.forEach((star) => {
      const [x, y, z] = raDecToCartesian(star.ra, star.dec, radius);
      positionsArray.push(x, y, z);

      const color = getStarColor(star.spectralClass);
      const r = parseInt(color.slice(1, 3), 16) / 255;
      const g = parseInt(color.slice(3, 5), 16) / 255;
      const b = parseInt(color.slice(5, 7), 16) / 255;
      colorsArray.push(r, g, b);

      sizesArray.push(getStarSize(star.magnitude) * 1.5); // Slightly larger for visibility
    });

    return {
      positions: new Float32Array(positionsArray),
      colors: new Float32Array(colorsArray),
      sizes: new Float32Array(sizesArray),
    };
  }, [starCatalog, radius]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.00002;
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
        blending={AdditiveBlending}
        sizeAttenuation={false}
        alphaTest={0.01}
      />
    </points>
  );
}

// Main NASA Star Field Component
export default function NASAStarField({
  radius = 800,
  useRealImages = true,
  animated = true
}: NASAStarFieldProps) {
  return (
    <Suspense fallback={null}>
      <group>
        {/* Real star field with astronomical data */}
        <EnhancedStarField radius={radius} />

        {/* NASA Milky Way background */}
        <MilkyWayPanorama radius={radius} useRealImages={useRealImages} />

        {/* Real NASA Hubble nebulae */}
        <HubbleNebula
          position={[radius * 0.6, radius * 0.3, -radius * 0.4]}
          imagePath="/textures/backgrounds/orion_nebula_hubble.jpg"
          size={25}
          name="Orion Nebula"
        />

        <HubbleNebula
          position={[-radius * 0.7, -radius * 0.2, radius * 0.5]}
          imagePath="/textures/backgrounds/eagle_nebula_hubble.jpg"
          size={20}
          name="Eagle Nebula"
        />

        <HubbleNebula
          position={[radius * 0.2, -radius * 0.8, -radius * 0.1]}
          imagePath="/textures/backgrounds/rosette_nebula.jpg"
          size={18}
          color="#ff6b9d"
          name="Rosette Nebula"
        />

        <HubbleNebula
          position={[-radius * 0.8, radius * 0.4, radius * 0.2]}
          imagePath="/textures/backgrounds/horsehead_nebula.jpg"
          size={15}
          color="#8B4513"
          name="Horsehead Nebula"
        />

        {/* Hubble Deep Field showing distant galaxies */}
        <HubbleDeepField radius={radius} />

        {/* Andromeda Galaxy */}
        <HubbleNebula
          position={[radius * 0.8, radius * 0.1, radius * 0.3]}
          imagePath="/textures/backgrounds/andromeda_galaxy.jpg"
          size={35}
          color="#f8f8ff"
          name="Andromeda Galaxy"
        />
      </group>
    </Suspense>
  );
}

// Image download guide component
export function ImageDownloadGuide() {
  return (
    <div className="p-4 bg-blue-900/20 border border-blue-400/30 rounded-lg">
      <h3 className="text-white font-bold mb-2">🌌 Download Real Space Images</h3>
      <p className="text-blue-200 text-sm mb-3">
        To see the full NASA star field, download these images and place them in /public/textures/backgrounds/:
      </p>
      <div className="space-y-2 text-xs">
        <div>
          <strong className="text-green-400">milky_way_gaia.jpg</strong> - ESA Gaia all-sky survey
        </div>
        <div>
          <strong className="text-green-400">orion_nebula_hubble.jpg</strong> - Hubble Orion Nebula
        </div>
        <div>
          <strong className="text-green-400">eagle_nebula_hubble.jpg</strong> - Hubble Eagle Nebula
        </div>
        <div>
          <strong className="text-green-400">hubble_deep_field.jpg</strong> - Hubble Ultra Deep Field
        </div>
        <div>
          <strong className="text-green-400">andromeda_galaxy.jpg</strong> - Andromeda Galaxy image
        </div>
      </div>
      <p className="text-yellow-300 text-xs mt-2">
        Visit: https://images.nasa.gov/ and https://hubblesite.org/images
      </p>
    </div>
  );
}