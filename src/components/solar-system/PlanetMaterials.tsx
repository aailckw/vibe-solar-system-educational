import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide } from 'three';
import { PlanetaryBody } from '@/types/solar-system';

interface PlanetMaterialProps {
  body: PlanetaryBody;
  textures: any;
  size: number;
}

// Enhanced material component for different planetary body types
export function PlanetMaterial({ body, textures }: { body: PlanetaryBody; textures: any }) {
  if (textures?.hasTextures && textures.textures) {
    switch (body.id) {
      case 'sun':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            emissive="#FDB813"
            emissiveIntensity={0.3}
            roughness={1.0}
            metalness={0.0}
          />
        );
        
      case 'earth':
        console.log('Earth textures:', { hasTextures: textures?.hasTextures, map: !!textures?.textures?.map });
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.8} // Natural surface roughness like Mars
            metalness={0.0} // No metallic properties for natural appearance
          />
        );
        
      case 'mars':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.9}
            metalness={0.0}
          />
        );
        
      case 'venus':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.1}
            metalness={0.0}
            emissive="#FFC649"
            emissiveIntensity={0.1}
          />
        );
        
      case 'jupiter':
      case 'saturn':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.8}
            metalness={0.1}
          />
        );
        
      case 'uranus':
      case 'neptune':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.6}
            metalness={0.2}
          />
        );
        
      case 'moon':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.9}
            metalness={0.0}
          />
        );
        
      default:
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.8}
            metalness={0.2}
          />
        );
    }
  }
  
  // Fallback material with enhanced colors and properties - Blue Marble inspired
  const fallbackProperties = {
    sun: { color: '#FDB813', emissive: '#FDB813', emissiveIntensity: 0.3, roughness: 1.0, metalness: 0.0 },
    mercury: { color: '#8C7853', roughness: 0.9, metalness: 0.1 },
    venus: { color: '#FFC649', emissive: '#FFC649', emissiveIntensity: 0.05, roughness: 0.1, metalness: 0.0 },
    earth: { 
      color: '#6B93D6', // Natural earth color like Mars approach
      roughness: 0.8, // Natural surface roughness like Mars
      metalness: 0.0 // No metallic properties like Mars
    },
    mars: { color: '#CD5C5C', roughness: 0.9, metalness: 0.0 },
    jupiter: { color: '#D8CA9D', roughness: 0.8, metalness: 0.1 },
    saturn: { color: '#FAD5A5', roughness: 0.8, metalness: 0.1 },
    uranus: { color: '#4FD0E7', roughness: 0.6, metalness: 0.2 },
    neptune: { color: '#4B70DD', roughness: 0.6, metalness: 0.2 },
    moon: { color: '#C0C0C0', roughness: 0.9, metalness: 0.0 }
  };
  
  const props = fallbackProperties[body.id as keyof typeof fallbackProperties] || 
                { color: textures?.fallbackColor || '#888888', roughness: 0.8, metalness: 0.2 };
  
  return (
    <meshStandardMaterial
      color={props.color}
      emissive={(props as any).emissive || '#000000'}
      emissiveIntensity={(props as any).emissiveIntensity || 0}
      roughness={props.roughness}
      metalness={props.metalness}
    />
  );
}

// Enhanced cloud layer component for Earth
export function CloudLayer({ size, textures, controls }: { size: number; textures: any; controls: any }) {
  const cloudRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (cloudRef.current) {
      const isPaused = controls.timeScale <= 0;
      if (!isPaused) {
        // Clouds rotate slightly faster than Earth's surface for realism
        // Using a slow rotation that's scientifically proportional
        const effectiveTimeScale = controls.timeScale / 60; // Convert to days/frame
        cloudRef.current.rotation.y += 0.3 * effectiveTimeScale * delta; // Slightly faster than surface
      }
    }
  });
  
  // Only render if we have actual cloud textures
  if (!textures?.hasTextures || !textures.textures?.clouds) {
    return null;
  }
  
  return (
    <mesh ref={cloudRef}>
      <sphereGeometry args={[size * 1.005, 32, 32]} />
      <meshStandardMaterial
        map={textures.textures.clouds}
        transparent
        opacity={0.5} // Enhanced cloud opacity for Blue Marble effect
        side={DoubleSide}
        alphaTest={0.1}
        emissive="#E6F3FF" // Subtle cloud glow for Blue Marble effect
        emissiveIntensity={0.05} // Very subtle cloud illumination
      />
    </mesh>
  );
}

// Atmospheric glow effect for planets with thick atmospheres (gas giants only)
export function AtmosphereGlow({ size, body }: { size: number; body: PlanetaryBody }) {
  if (!['venus', 'jupiter', 'saturn', 'uranus', 'neptune'].includes(body.id)) return null;
  
  const glowColors = {
    earth: '#1E4D72', // Subtle blue atmospheric glow for Blue Marble effect
    venus: '#FFC649',
    jupiter: '#D8CA9D', 
    saturn: '#FAD5A5',
    uranus: '#4FD0E7',
    neptune: '#4B70DD'
  };
  
  const glowColor = glowColors[body.id as keyof typeof glowColors];
  const glowIntensity = body.id === 'earth' ? 0.15 : 0.1; // Enhanced intensity for Blue Marble Earth
  
  return (
    <mesh>
      <sphereGeometry args={[size * 1.02, 32, 32]} />
      <meshBasicMaterial
        color={glowColor}
        transparent
        opacity={glowIntensity}
        side={DoubleSide}
      />
    </mesh>
  );
}

// Enhanced ring system for gas giants
export function PlanetRings({ size, body, textures, controls }: { size: number; body: PlanetaryBody; textures: any; controls: any }) {
  if (!body.hasRings) return null;
  
  const ringRef = useRef<Mesh>(null);
  
  // Calculate ring rotation based on planet's axial tilt
  const getRingRotation = (): [number, number, number] => {
    const axialTiltRad = (body.axialTilt * Math.PI) / 180; // Convert to radians
    
    // For most planets, rings are aligned with the equatorial plane
    // Uranus is special - its rings are nearly perpendicular to its orbital plane
    if (body.id === 'uranus') {
      // Uranus rings are aligned with its rotational axis (97.77° tilt)
      return [axialTiltRad - Math.PI / 2, 0, 0];
    } else {
      // Other planets: rings aligned with equatorial plane
      return [-Math.PI / 2 + axialTiltRad, 0, 0];
    }
  };
  
  useFrame((state, delta) => {
    if (ringRef.current) {
      const isPaused = controls.timeScale <= 0;
      if (!isPaused) {
        // Ring particles have their own orbital periods, typically faster than planet rotation
        // Using a scientifically inspired rotation speed
        const effectiveTimeScale = controls.timeScale / 60; // Convert to days/frame
        ringRef.current.rotation.z += 0.1 * effectiveTimeScale * delta; // Ring particle orbital motion
      }
    }
  });
  
  const ringRotation = getRingRotation();
  
  // Saturn gets special detailed rings
  if (body.id === 'saturn' && textures?.hasTextures && textures.textures?.ring) {
    return (
      <mesh ref={ringRef} rotation={ringRotation}>
        <ringGeometry args={[size * 1.2, size * 2.2, 64]} />
        <meshStandardMaterial
          map={textures.textures.ring}
          transparent
          opacity={0.8}
          side={DoubleSide}
        />
      </mesh>
    );
  }
  
  // Uranus gets thinner, darker rings
  if (body.id === 'uranus') {
    return (
      <mesh ref={ringRef} rotation={ringRotation}>
        <ringGeometry args={[size * 1.6, size * 2.1, 32]} />
        <meshStandardMaterial
          color="#444444"
          transparent
          opacity={0.3}
          side={DoubleSide}
        />
      </mesh>
    );
  }
  
  // Default ring system for other planets
  return (
    <mesh ref={ringRef} rotation={ringRotation}>
      <ringGeometry args={[size * 1.2, size * 2, 32]} />
      <meshStandardMaterial
        color="#cccccc"
        transparent
        opacity={0.6}
        side={DoubleSide}
      />
    </mesh>
  );
}