'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import Planet from './Planet';
import { SimulationControls, NavigationState, PlanetaryBody } from '@/types/solar-system';
import { solarSystemData } from '@/lib/data/solar-system-data';

interface SolarSystemSceneProps {
  controls: SimulationControls;
  navigation: NavigationState;
  onBodySelect: (bodyId: string | null) => void;
  onNavigationComplete: () => void;
  orbitControlsRef: React.MutableRefObject<any>;
}

export default function SolarSystemScene({
  controls,
  navigation,
  onBodySelect,
  onNavigationComplete,
  orbitControlsRef
}: SolarSystemSceneProps) {
  const groupRef = useRef<Group>(null);
  const timeRef = useRef(0);
  const { camera } = useThree();
  
  // Store planet positions and sizes for camera following
  const planetPositions = useRef<Map<string, Vector3>>(new Map());
  const planetSizes = useRef<Map<string, number>>(new Map());
  const followOffset = useRef(new Vector3(0, 10, 25)); // Base camera offset from target
  const lastFollowedObject = useRef<string | null>(null); // Track previously followed object

  // Calculate scale factors based on scale mode
  const scaleFactors = useMemo(() => {
    switch (controls.scaleMode) {
      case 'realistic':
        // More realistic proportions but still visible
        return { distance: 1.5, size: 0.8 };
      case 'visible':
        // Enhanced visibility with good size differentiation
        return { distance: 2, size: 1.2 };
      case 'logarithmic':
        // Logarithmic scaling for realistic proportions with manageable display
        return { distance: 1.2, size: 1.1 };
      default:
        return { distance: 2, size: 1.2 };
    }
  }, [controls.scaleMode]);

  // Handle camera mode transitions
  useEffect(() => {
    if (!orbitControlsRef.current) return;

    if (navigation.cameraMode === 'free' && lastFollowedObject.current) {
      // When switching to free camera mode, set target to previously followed object
      const targetPosition = planetPositions.current.get(lastFollowedObject.current);
      if (targetPosition) {
        orbitControlsRef.current.target.copy(targetPosition);
        orbitControlsRef.current.update();
        console.log(`Free camera mode: Targeting ${lastFollowedObject.current}`);
      }
    }
  }, [navigation.cameraMode]);

  useFrame((state, delta) => {
    // Only update time if not paused - use consistent check
    const isPaused = controls.timeScale <= 0;
    if (!isPaused) {
      timeRef.current += delta * controls.timeScale;
    }
    
    // Handle camera following with dynamic distance based on object size
    if (navigation.cameraMode === 'follow' && controls.selectedBody) {
      // Track the currently followed object
      lastFollowedObject.current = controls.selectedBody;
      
      const targetPosition = planetPositions.current.get(controls.selectedBody);
      const targetSize = planetSizes.current.get(controls.selectedBody);
      
      if (targetPosition && targetSize) {
        // Enhanced distance calculation for better viewing of smaller objects
        // Different distance strategies based on object size for optimal educational viewing
        // Size categories based on rendered object size in simulation units:
        // - Large (≥6): Sun ~8, Jupiter ~4.5, Saturn ~3.8, etc.
        // - Medium (≥2): Earth ~2.0, Venus ~1.9, Mars ~1.7, etc. 
        // - Small (≥1): Mercury ~1.2, Moon ~1.1, large moons ~1.0+
        // - Very Small (<1): Small moons, asteroids ~0.7-0.9
        let baseDistance: number;
        
        if (targetSize >= 6) {
          // Large objects (Sun, Gas Giants): Standard distance for overview
          baseDistance = Math.max(targetSize * 2.5, 20);
        } else if (targetSize >= 2) {
          // Medium objects (Earth, Venus, Mars): Close but comfortable view
          baseDistance = Math.max(targetSize * 2.2, 8);
        } else if (targetSize >= 1) {
          // Small objects (Mercury, large moons): Much closer for detail
          baseDistance = Math.max(targetSize * 1.8, 4);
        } else {
          // Very small objects (small moons, asteroids): Very close for visibility
          baseDistance = Math.max(targetSize * 1.5, 2.5);
        }
        
        const followDistance = new Vector3(
          baseDistance * 0.7,  // Slightly to the side
          baseDistance * 0.5,  // Above the object
          baseDistance * 1.2   // Behind the object
        );
        
        // Calculate camera position relative to the target
        const cameraPosition = targetPosition.clone().add(followDistance);
        
        // Smoothly move camera to follow the target
        camera.position.lerp(cameraPosition, 0.02);
        camera.lookAt(targetPosition);
        
        // Update controls target if using OrbitControls (for continuous following)
        if (orbitControlsRef.current) {
          orbitControlsRef.current.target.copy(targetPosition);
        }
      }
    }
    
    // Update target for free camera mode if we're still tracking a followed object
    if (navigation.cameraMode === 'free' && lastFollowedObject.current) {
      const targetPosition = planetPositions.current.get(lastFollowedObject.current);
      if (targetPosition && orbitControlsRef.current) {
        orbitControlsRef.current.target.copy(targetPosition);
      }
    }
  });

  // Handle position updates from planets
  const handlePositionUpdate = (bodyId: string, position: [number, number, number]) => {
    planetPositions.current.set(bodyId, new Vector3(position[0], position[1], position[2]));
  };

  // Handle size updates from planets for proper camera following
  const handleSizeUpdate = (bodyId: string, size: number) => {
    planetSizes.current.set(bodyId, size);
  };

  const renderBody = (body: PlanetaryBody, isRoot = true) => {
    // Calculate distance using logarithmic scaling for the 'logarithmic' mode
    let distance: number;
    if (controls.scaleMode === 'logarithmic' && body.distanceFromSun) {
      // Use logarithmic scaling for distances: log(AU + 1) to handle Sun (0 AU)
      distance = Math.log(body.distanceFromSun + 1) * 20;
    } else {
      distance = body.distanceFromSun ? body.distanceFromSun * scaleFactors.distance * 25 : 0;
    }
    
    // Calculate size with realistic relative scaling for educational purposes
    // Size hierarchy: Sun > Gas Giants > Terrestrial Planets > Moons
    let size: number;
    
    if (body.type === 'star') {
      // Sun: Largest body - fixed size for dominance but not overwhelming
      size = 8; // Sun is clearly the largest
    } else {
      // Calculate relative size based on actual radius data
      const earthRadius = 6371; // km - Earth as reference
      const relativeToEarth = body.radius / earthRadius;
      
      if (controls.scaleMode === 'logarithmic') {
        // Use logarithmic scaling for sizes to maintain relative proportions
        // log(radius/earth_radius + 1) to handle small bodies
        size = Math.log(relativeToEarth + 1) * 2.0;
        // Ensure minimum size for visibility
        size = Math.max(size, 0.4);
      } else {
        // Apply size scaling based on planetary category
        if (body.radius > 20000) {
          // Gas giants (Jupiter: 69,911 km, Saturn: 58,232 km, etc.)
          // Scale: Jupiter ≈ 4.5, Saturn ≈ 3.8, Uranus ≈ 2.5, Neptune ≈ 2.4
          size = Math.max(relativeToEarth * 0.65, 2.2);
        } else if (body.radius > 3000) {
          // Large terrestrial planets (Earth: 6,371 km, Venus: 6,052 km)
          // Scale: Earth ≈ 2.0, Venus ≈ 1.9
          size = Math.max(relativeToEarth * 1.6, 1.2);
        } else if (body.radius > 1500) {
          // Small planets and large moons (Mars: 3,390 km, Moon: 1,737 km)
          // Scale: Mars ≈ 1.7, Moon ≈ 1.1
          size = Math.max(relativeToEarth * 2.0, 0.9);
        } else {
          // Very small bodies (Mercury: 2,440 km)
          // Scale: Mercury ≈ 1.2
          size = Math.max(relativeToEarth * 3.0, 0.7);
        }
        
        // Apply scale mode factor
        size *= scaleFactors.size;
      }
    }
    
    return (
      <Planet
        key={body.id}
        body={body}
        distance={distance}
        size={size}
        timeRef={timeRef}
        controls={controls}
        navigation={navigation}
        onSelect={() => onBodySelect(body.id)}
        showOrbit={controls.showOrbits && body.distanceFromSun !== undefined}
        showLabel={controls.showLabels}
        isSelected={controls.selectedBody === body.id}
        onPositionUpdate={handlePositionUpdate}
        onSizeUpdate={handleSizeUpdate}
      />
    );
  };

  return (
    <group ref={groupRef}>
      {solarSystemData.bodies.map(body => renderBody(body))}
    </group>
  );
}