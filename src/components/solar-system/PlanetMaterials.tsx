import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide, AdditiveBlending } from 'three';
import { PlanetaryBody } from '@/types/solar-system';

// Specialized Sun material with enhanced glow effect
export function SunMaterial({ textures }: { textures: any }) {
  const materialRef = useRef<any>(null);
  
  useFrame((state) => {
    if (materialRef.current) {
      // Enhanced emissive intensity variation for a more dynamic pulsing effect
      const time = state.clock.elapsedTime;
      const pulse = 2.0 + Math.sin(time * 0.5) * 0.3;
      materialRef.current.emissiveIntensity = pulse;
      
      // Enhanced color variation for more dynamic appearance
      const colorShift = Math.sin(time * 0.3) * 0.1;
      materialRef.current.emissive.setRGB(
        1.0,
        0.85 + colorShift,
        0.0
      );
    }
  });
  
  return (
    <meshStandardMaterial
      ref={materialRef}
      map={textures.textures?.map}
      emissive="#FFD700"
      emissiveIntensity={3.0} // Increased emissive intensity
      roughness={0.0}
      metalness={1.0}
      envMapIntensity={3.0}
      emissiveMap={textures.textures?.map}
    />
  );
}

// Sun glow effect - a larger, softer glow around the Sun
export function SunGlow({ size }: { size: number }) {
  const glowRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (glowRef.current) {
      // Enhanced pulsing animation for the glow with multiple frequencies for more natural effect
      const time = state.clock.elapsedTime;
      const pulse1 = Math.sin(time * 0.4) * 0.07;
      const pulse2 = Math.sin(time * 1.1) * 0.04;
      const pulse3 = Math.sin(time * 2.3) * 0.03;
      const totalPulse = 1 + pulse1 + pulse2 + pulse3;
      glowRef.current.scale.setScalar(totalPulse);
      
      // Enhanced color shift for more dynamic appearance
      const colorShift = Math.sin(time * 0.4) * 0.08;
      (glowRef.current.material as any).color.setRGB(
        1.0 + colorShift,
        0.65 + colorShift * 0.5,
        0.0
      );
    }
  });
  
  return (
    <mesh ref={glowRef}>
      <sphereGeometry args={[size * 0.18, 32, 32]} /> // Reduced radius by 10x
      <meshBasicMaterial
        color="#FFA500"
        transparent
        opacity={0.4} // Increased opacity for more visible glow
        side={DoubleSide}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Enhanced material component for different planetary body types
export function PlanetMaterial({ body, textures, size }: { body: PlanetaryBody; textures: any; size: number }) {
  if (textures?.hasTextures && textures.textures) {
    switch (body.id) {
      case 'sun':
        return (
          <>
            <SunMaterial textures={textures} />
            <SunGlow size={size} />
          </>
        );
        
      case 'earth':
        console.log('Earth textures:', { hasTextures: textures?.hasTextures, map: !!textures?.textures?.map });
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.7} // Reduced roughness for better light reflection
            metalness={0.1} // Added slight metalness for better light reflection
            emissive="#1E4D72" // Added subtle emissive color
            emissiveIntensity={0.2} // Subtle emissive intensity
          />
        );
        
      case 'mars':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.7} // Reduced roughness
            metalness={0.1} // Added slight metalness
            emissive="#CD5C5C" // Added subtle emissive color
            emissiveIntensity={0.15} // Subtle emissive intensity
          />
        );
        
      case 'venus':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.7} // Reduced roughness
            metalness={0.1} // Added slight metalness
            emissive="#FFC649"
            emissiveIntensity={0.2} // Increased emissive intensity
          />
        );
        
      case 'jupiter':
      case 'saturn':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.7} // Reduced roughness
            metalness={0.1} // Added slight metalness
            emissive="#D8CA9D" // Added subtle emissive color for gas giants
            emissiveIntensity={0.15} // Subtle emissive intensity
          />
        );
        
      case 'uranus':
      case 'neptune':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.7} // Reduced roughness
            metalness={0.1} // Added slight metalness
            emissive={body.id === 'uranus' ? "#4FD0E7" : "#4B70DD"} // Respective emissive colors
            emissiveIntensity={0.2} // Subtle emissive intensity
          />
        );
        
      case 'moon':
        return (
          <meshStandardMaterial
            map={textures.textures.map}
            roughness={0.8}
            metalness={0.1} // Added slight metalness
            emissive="#C0C0C0" // Added subtle emissive color
            emissiveIntensity={0.1} // Very subtle emissive intensity
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
    sun: { color: '#FFD700', emissive: '#FFD700', emissiveIntensity: 1.5, roughness: 0.0, metalness: 1.0 }, // Enhanced sun properties
    mercury: { color: '#8C7853', roughness: 0.8, metalness: 0.1, emissive: '#8C7853', emissiveIntensity: 0.15 }, // Enhanced mercury
    venus: { color: '#FFC649', emissive: '#FFC649', emissiveIntensity: 0.2, roughness: 0.7, metalness: 0.1 }, // Enhanced venus
    earth: { 
      color: '#6B93D6', // Natural earth color
      roughness: 0.7, // Reduced roughness for better light reflection
      metalness: 0.1, // Added slight metalness for better light reflection
      emissive: '#1E4D72', // Added subtle emissive color
      emissiveIntensity: 0.2 // Subtle emissive intensity
    },
    mars: { color: '#CD5C5C', roughness: 0.7, metalness: 0.1, emissive: '#CD5C5C', emissiveIntensity: 0.15 }, // Enhanced mars
    jupiter: { color: '#D8CA9D', roughness: 0.7, metalness: 0.1, emissive: '#D8CA9D', emissiveIntensity: 0.15 }, // Enhanced jupiter
    saturn: { color: '#FAD5A5', roughness: 0.7, metalness: 0.1, emissive: '#FAD5A5', emissiveIntensity: 0.15 }, // Enhanced saturn
    uranus: { color: '#4FD0E7', roughness: 0.7, metalness: 0.1, emissive: '#4FD0E7', emissiveIntensity: 0.2 }, // Enhanced uranus
    neptune: { color: '#4B70DD', roughness: 0.7, metalness: 0.1, emissive: '#4B70DD', emissiveIntensity: 0.2 }, // Enhanced neptune
    moon: { color: '#C0C0C0', roughness: 0.8, metalness: 0.1, emissive: '#C0C0C0', emissiveIntensity: 0.1 } // Enhanced moon
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
      <sphereGeometry args={[size * 1.005, 64, 64]} />
      <meshStandardMaterial
        map={textures.textures.clouds}
        transparent
        opacity={0.8} // Increased opacity for more visible clouds
        side={DoubleSide}
        alphaTest={0.1}
        emissive="#E6F3FF" // Subtle cloud glow for Blue Marble effect
        emissiveIntensity={0.15} // Increased emissive intensity for brighter clouds
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
  const glowIntensity = body.id === 'earth' ? 0.4 : 0.5; // Increased intensity for more visible glow
  
  return (
    <mesh>
      <sphereGeometry args={[size * 1.025, 32, 32]} />
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
  
  // Jupiter gets specialized rings
  if (body.id === 'jupiter' && textures?.hasTextures) {
    // Check if we have a ring texture, otherwise use scientifically accurate colors
    const hasRingTexture = textures.textures?.ring !== undefined;
    
    // If texture fails to load, provide helpful console message
    if (!hasRingTexture) {
      console.info('Jupiter ring texture not found. Using fallback colors instead.');
      console.info('See JUPITER_RING_TEXTURE_SETUP.md for instructions on adding the texture.');
    }
    
    return (
      <mesh ref={ringRef} rotation={ringRotation}>
        {/* Jupiter's rings are thin and faint with a distinct inner and outer region */}
        <ringGeometry args={[size * 1.4, size * 1.8, 128]} /> {/* Higher resolution for detail */}
        <meshStandardMaterial
          map={hasRingTexture ? textures.textures.ring : null}
          color={hasRingTexture ? "#FFFFFF" : "#8A7F66"} // Dusty brown-gray if no texture
          transparent
          opacity={0.25} // Jupiter's rings are very faint
          roughness={0.9}
          metalness={0.0}
          side={DoubleSide}
          depthWrite={false} // Better transparency handling
        />
      </mesh>
    );
  }
  
  // Saturn gets special detailed rings
  if (body.id === 'saturn' && textures?.hasTextures && textures.textures?.ring) {
    return (
      <mesh ref={ringRef} rotation={ringRotation}>
        <ringGeometry args={[size * 1.2, size * 2.2, 64]} />
        <meshStandardMaterial
          map={textures.textures.ring}
          transparent
          opacity={0.95} // Maintained high opacity for visible rings
          roughness={0.9} // Added high roughness to prevent unrealistic reflections
          metalness={0.0} // Removed metalness for more realistic appearance
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
          opacity={0.6} // Maintained opacity for visible rings
          roughness={0.9} // Added high roughness to prevent unrealistic reflections
          metalness={0.0} // Removed metalness for more realistic appearance
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
        opacity={0.9} // Maintained opacity for visible rings
        roughness={0.9} // Added high roughness to prevent unrealistic reflections
        metalness={0.0} // Removed metalness for more realistic appearance
        side={DoubleSide}
      />
    </mesh>
  );
}
