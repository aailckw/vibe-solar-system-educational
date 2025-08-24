'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group, Vector3 } from 'three';
import { Text, Billboard } from '@react-three/drei';
import { PlanetaryBody, SimulationControls } from '@/types/solar-system';
import { usePlanetTextures } from '@/lib/textures/planetaryTextures';
import { PlanetMaterial, CloudLayer, AtmosphereGlow, PlanetRings } from './PlanetMaterials';

interface PlanetProps {
  body: PlanetaryBody;
  distance: number;
  size: number;
  timeRef: React.MutableRefObject<number>;
  controls: SimulationControls;
  navigation?: { cameraMode?: string }; // Add navigation prop to disable pulsing in follow mode
  onSelect: () => void;
  showOrbit: boolean;
  showLabel: boolean;
  isSelected: boolean;
  onPositionUpdate?: (bodyId: string, position: [number, number, number]) => void;
  onSizeUpdate?: (bodyId: string, size: number) => void;
}

export default function Planet({
  body,
  distance,
  size,
  timeRef,
  controls,
  navigation,
  onSelect,
  showOrbit,
  showLabel,
  isSelected,
  onPositionUpdate,
  onSizeUpdate
}: PlanetProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const orbitGroupRef = useRef<Group>(null);
  
  // Track orbital position separately for proper pause functionality
  // Initialize with random position to avoid all planets being aligned
  const orbitalPositionRef = useRef(Math.random() * Math.PI * 2);

  // Load planetary textures using the enhanced system
  const planetTextures = usePlanetTextures(body.id);

  // Calculate orbital speed with scientifically accurate relative timing
  const orbitalSpeed = useMemo(() => {
    if (!body.orbitalPeriod) return 0;
    // timeScale represents days per second in simulation
    // orbital period is in Earth days
    // We want: (2π radians) / (orbital_period_in_earth_days / days_per_second * 60fps)
    // Simplified: (2π * timeScale * 60) / orbital_period_in_earth_days
    return (2 * Math.PI * 60) / body.orbitalPeriod; // Base calculation for timeScale=1 (1 day per second)
  }, [body.orbitalPeriod]);

  // Calculate rotation speed with scientifically accurate relative timing
  const rotationSpeed = useMemo(() => {
    // timeScale represents days per second in simulation
    // rotation period is in hours, convert to days
    const rotationPeriodInDays = body.rotationPeriod / 24;
    // Same formula as orbital speed but using rotation period in days
    return (2 * Math.PI * 60) / rotationPeriodInDays; // Base calculation for timeScale=1
  }, [body.rotationPeriod]);

  useFrame((state, delta) => {
    if (!meshRef.current || !orbitGroupRef.current || !groupRef.current) return;
    
    // Report current world position and size for camera following
    if (onPositionUpdate) {
      const worldPosition = new Vector3();
      groupRef.current.getWorldPosition(worldPosition);
      onPositionUpdate(body.id, [worldPosition.x, worldPosition.y, worldPosition.z]);
    }
    
    // Report object size for camera following calculations
    if (onSizeUpdate) {
      onSizeUpdate(body.id, size);
    }
    
    // Explicit pause check - if timeScale is 0 or less than a tiny threshold, stop all animation
    const isPaused = controls.timeScale <= 0;
    if (isPaused) {
      // Still report position even when paused for camera following
      return;
    }

    // Apply scientifically accurate motion with timeScale
    // timeScale represents how many days pass per second in the simulation
    const effectiveTimeScale = controls.timeScale / 60; // Convert from days/second to days/frame at 60fps

    // Planet rotation - scientifically accurate relative to orbital motion
    meshRef.current.rotation.y += rotationSpeed * effectiveTimeScale * delta;

    // Orbital motion - scientifically accurate relative to other planets
    if (body.distanceFromSun && orbitalSpeed > 0) {
      orbitalPositionRef.current += orbitalSpeed * effectiveTimeScale * delta;
      orbitGroupRef.current.rotation.y = orbitalPositionRef.current;
    }

    // Pulsing effect for selected planet (independent of time scale)
    // Disable pulsing when in follow mode to prevent expansion/contraction while following
    const isInFollowMode = navigation?.cameraMode === 'follow' && controls.selectedBody === body.id;
    
    if (isSelected && meshRef.current && !isInFollowMode) {
      const pulseScale = 1 + Math.sin(Date.now() * 0.004) * 0.1;
      meshRef.current.scale.setScalar(pulseScale);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  // Enhanced orbit ring component
  const OrbitRing = () => {
    if (!showOrbit || distance === 0) return null;
    
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[distance - 0.1, distance + 0.1, 128]} />
        <meshBasicMaterial 
          color="#666666" 
          transparent 
          opacity={0.2}
          side={2} // DoubleSide
        />
      </mesh>
    );
  };

  // Label component that always faces the camera
  const Label = () => {
    if (!showLabel) return null;
    
    return (
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <Text
          position={[0, size + 1, 0]}
          fontSize={Math.max(size * 0.3, 0.5)}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {body.name}
        </Text>
      </Billboard>
    );
  };

  return (
    <>
      {/* Orbit ring */}
      <OrbitRing />
      
      {/* Orbital group for planetary motion */}
      <group ref={orbitGroupRef}>
        <group position={[distance, 0, 0]} ref={groupRef}>
          {/* Planet mesh with enhanced materials */}
          <Suspense fallback={null}>
            <mesh
              ref={meshRef}
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default';
              }}
            >
              <sphereGeometry args={[size, 64, 64]} />
              <PlanetMaterial body={body} textures={planetTextures} />
            </mesh>
            
            {/* Atmospheric glow for gas giants */}
            <AtmosphereGlow size={size} body={body} />
            
            {/* Enhanced ring systems */}
            <PlanetRings size={size} body={body} textures={planetTextures} controls={controls} />
          </Suspense>

          {/* Planet label */}
          <Label />

          {/* Render moons */}
          {body.moons?.map((moon, index) => {
            const moonDistance = size * (2 + index * 1.5);
            const moonSize = size * 0.2;
            return (
              <Planet
                key={moon.id}
                body={moon}
                distance={moonDistance}
                size={moonSize}
                timeRef={timeRef}
                controls={controls}
                navigation={navigation}
                onSelect={() => onSelect()}
                showOrbit={false}
                showLabel={showLabel}
                isSelected={false}
                onPositionUpdate={onPositionUpdate}
                onSizeUpdate={onSizeUpdate}
              />
            );
          })}
        </group>
      </group>
    </>
  );
}