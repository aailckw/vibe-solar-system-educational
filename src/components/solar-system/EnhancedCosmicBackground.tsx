/**
 * Enhanced Cosmic Background using Three.js SkyBox
 * Optimized for 360° astronomical panorama imagery
 */

'use client';

import React, { useMemo, useRef, Suspense } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, CubeTextureLoader, BackSide, EquirectangularReflectionMapping, AdditiveBlending, Mesh, Points } from 'three';

interface EnhancedCosmicBackgroundProps {
  radius?: number;
  useEquirectangular?: boolean;
  useCubeMap?: boolean;
  showDeepSpace?: boolean;
  brightness?: number;
}

// Professional SkyBox implementation for astronomical panoramas
function AstronomicalSkyBox({ 
  radius, 
  useEquirectangular = true, 
  brightness = 1.0 
}: { 
  radius: number; 
  useEquirectangular: boolean;
  brightness?: number;
}) {
  const { scene } = useThree();
  const meshRef = useRef<Mesh>(null);

  // Load equirectangular panorama (best for astronomy)
  const panoramaTexture = useMemo(() => {
    const imagePaths = [
      '/textures/backgrounds/milky_way_gaia.jpg',           // ESA Gaia - BEST
      '/textures/backgrounds/eso_milky_way_panorama.jpg',   // ESO panorama
      '/textures/backgrounds/wise_all_sky.jpg',             // NASA WISE
      '/textures/backgrounds/planck_cmb.jpg'                // Planck CMB map
    ];

    for (const path of imagePaths) {
      try {
        const texture = useLoader(TextureLoader, path);
        
        // Configure for seamless 360° panoramic mapping
        texture.mapping = EquirectangularReflectionMapping;
        texture.colorSpace = 'srgb'; // Updated for newer Three.js versions
        texture.flipY = false;
        texture.wrapS = texture.wrapT = 1000; // ClampToEdgeWrapping equivalent
        texture.generateMipmaps = false; // Prevent seam artifacts
        
        return texture;
      } catch (error) {
        console.log(`Astronomical panorama not found: ${path}`);
        continue;
      }
    }
    return null;
  }, []);

  // Alternative: Cube map for 6-sided cosmic imagery
  const cubeTexture = useMemo(() => {
    if (!useEquirectangular) {
      try {
        const loader = new CubeTextureLoader();
        return loader.load([
          '/textures/backgrounds/cosmic_px.jpg', // positive x
          '/textures/backgrounds/cosmic_nx.jpg', // negative x
          '/textures/backgrounds/cosmic_py.jpg', // positive y
          '/textures/backgrounds/cosmic_ny.jpg', // negative y
          '/textures/backgrounds/cosmic_pz.jpg', // positive z
          '/textures/backgrounds/cosmic_nz.jpg', // negative z
        ]);
      } catch (error) {
        console.log('Cube map cosmic textures not found');
        return null;
      }
    }
    return null;
  }, [useEquirectangular]);

  // Set scene background if we have a texture - this provides seamless spherical panorama
  if (panoramaTexture || cubeTexture) {
    scene.background = cubeTexture || panoramaTexture;
  }

  // For equirectangular panoramas, use ONLY scene.background to avoid cube rotation effect
  if (useEquirectangular && panoramaTexture) {
    // Return null - scene.background handles the spherical display properly
    return null;
  }

  // Fallback gradient sky
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius * 3, 64, 32]} />
      <meshBasicMaterial
        color="#0a0a1a"
        side={BackSide}
      />
    </mesh>
  );
}

// High-quality star field using point sprites
function HighQualityStars({ radius }: { radius: number }) {
  const pointsRef = useRef<Points>(null);
  
  // Load star sprite texture for better quality
  const starTexture = useMemo(() => {
    try {
      const texture = useLoader(TextureLoader, '/textures/backgrounds/star_sprite.png');
      return texture;
    } catch (error) {
      return null;
    }
  }, []);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 5000;
    const positionsArray = new Float32Array(count * 3);
    const colorsArray = new Float32Array(count * 3);
    const sizesArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const phi = Math.random() * Math.PI * 2;
      const costheta = Math.random() * 2 - 1;
      const sintheta = Math.sqrt(1 - costheta * costheta);
      
      positionsArray[i * 3] = radius * sintheta * Math.cos(phi);
      positionsArray[i * 3 + 1] = radius * costheta;
      positionsArray[i * 3 + 2] = radius * sintheta * Math.sin(phi);

      // Realistic star colors and sizes
      const temperature = Math.random();
      if (temperature < 0.76) {
        // M-class (red)
        colorsArray[i * 3] = 1.0;
        colorsArray[i * 3 + 1] = 0.6;
        colorsArray[i * 3 + 2] = 0.3;
        sizesArray[i] = 0.5;
      } else if (temperature < 0.88) {
        // K-class (orange)
        colorsArray[i * 3] = 1.0;
        colorsArray[i * 3 + 1] = 0.8;
        colorsArray[i * 3 + 2] = 0.6;
        sizesArray[i] = 0.7;
      } else if (temperature < 0.96) {
        // G-class (yellow, like Sun)
        colorsArray[i * 3] = 1.0;
        colorsArray[i * 3 + 1] = 1.0;
        colorsArray[i * 3 + 2] = 0.9;
        sizesArray[i] = 1.0;
      } else {
        // A, B, O-class (blue-white)
        colorsArray[i * 3] = 0.8;
        colorsArray[i * 3 + 1] = 0.9;
        colorsArray[i * 3 + 2] = 1.0;
        sizesArray[i] = 1.5;
      }
    }

    return {
      positions: positionsArray,
      colors: colorsArray,
      sizes: sizesArray,
    };
  }, [radius]);

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
        map={starTexture}
        vertexColors
        transparent
        size={2}
        sizeAttenuation={false}
        alphaTest={0.1}
      />
    </points>
  );
}

// Volumetric nebula effects
function VolumetricNebulae({ radius }: { radius: number }) {
  const nebulaData = [
    {
      position: [radius * 0.7, radius * 0.3, -radius * 0.5] as [number, number, number],
      color: '#ff6b9d',
      size: 50,
    },
    {
      position: [-radius * 0.6, -radius * 0.4, radius * 0.7] as [number, number, number],
      color: '#4ecdc4',
      size: 40,
    }
  ];

  return (
    <group>
      {nebulaData.map((nebula, index) => (
        <mesh key={index} position={nebula.position}>
          <sphereGeometry args={[nebula.size, 32, 32]} />
          <meshBasicMaterial
            color={nebula.color}
            transparent
            opacity={0.1}
            fog={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Enhanced Cosmic Background
export default function EnhancedCosmicBackground({
  radius = 1000,
  useEquirectangular = true,
  useCubeMap = false,
  showDeepSpace = true,
  brightness = 1.0
}: EnhancedCosmicBackgroundProps) {
  return (
    <Suspense fallback={null}>
      <group>
        {/* Professional SkyBox for astronomical panoramas */}
        <AstronomicalSkyBox 
          radius={radius} 
          useEquirectangular={useEquirectangular}
          brightness={brightness}
        />
        
        {/* High-quality star field (fallback if no panorama) */}
        <HighQualityStars radius={radius * 0.9} />
        
        {/* Volumetric nebulae effects */}
        {showDeepSpace && <VolumetricNebulae radius={radius} />}
      </group>
    </Suspense>
  );
}

// Specialized astronomical viewing modes
export const astronomicalModes = {
  gaia: {
    useEquirectangular: true,
    useCubeMap: false,
    showDeepSpace: false,
    description: 'ESA Gaia all-sky survey view'
  },
  hubble: {
    useEquirectangular: true,
    useCubeMap: false,
    showDeepSpace: true,
    description: 'Enhanced with Hubble deep space objects'
  },
  professional: {
    useEquirectangular: true,
    useCubeMap: true,
    showDeepSpace: true,
    description: 'Professional observatory setup'
  }
};