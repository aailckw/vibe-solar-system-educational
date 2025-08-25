/**
 * Realistic Asteroid Belt Component
 * Renders the main asteroid belt between Mars and Jupiter using real astronomical data
 */

'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, BufferGeometry, Float32BufferAttribute, AdditiveBlending } from 'three';
import { PlanetaryBody } from '@/types/solar-system';

interface AsteroidBeltProps {
  innerRadius?: number;      // Inner edge of the belt (AU)
  outerRadius?: number;      // Outer edge of the belt (AU)
  asteroidCount?: number;    // Number of asteroids to render
  maxHeight?: number;        // Maximum height above/below ecliptic plane (AU)
  sizeScale?: number;        // Scale factor for asteroid sizes
}

// Real data for major asteroids in the belt
const majorAsteroids: PlanetaryBody[] = [
  {
    id: 'ceres',
    name: 'Ceres',
    type: 'dwarf-planet',
    radius: 473, // km
    mass: 9.393e20, // kg
    density: 2.161, // g/cm³
    gravity: 0.27, // m/s²
    escapeVelocity: 0.51, // km/s
    distanceFromSun: 2.77, // AU
    orbitalPeriod: 1682, // Earth days
    rotationPeriod: 9.1, // hours
    axialTilt: 4, // degrees
    eccentricity: 0.076,
    description: 'Ceres is the largest object in the asteroid belt between Mars and Jupiter, and the only dwarf planet in the inner solar system.',
    keyFacts: [
      'Largest object in the asteroid belt',
      'Only dwarf planet in the inner solar system',
      'Contains about 25% of the asteroid belt\'s total mass',
      'Discovered in 1801 by Giuseppe Piazzi',
      'Visited by NASA\'s Dawn spacecraft (2015-2018)'
    ],
    discovery: {
      discoveredBy: 'Giuseppe Piazzi',
      discoveryDate: '1801',
      method: 'Telescope observation'
    },
    images: ['/textures/asteroids/ceres.jpg'],
    texture: '/textures/asteroids/ceres.jpg',
    funFacts: [
      'Named after the Roman goddess of agriculture',
      'Contains water ice in its subsurface',
      'Has a thin water vapor atmosphere',
      'May have a subsurface ocean'
    ],
    comparisons: {
      earth: 'Ceres is about 1/13th the diameter of Earth'
    }
  },
  {
    id: 'vesta',
    name: 'Vesta',
    type: 'asteroid',
    radius: 263, // km
    mass: 2.59e20, // kg
    density: 3.456, // g/cm³
    gravity: 0.22, // m/s²
    escapeVelocity: 0.36, // km/s
    distanceFromSun: 2.36, // AU
    orbitalPeriod: 1326, // Earth days
    rotationPeriod: 5.3, // hours
    axialTilt: 27, // degrees
    eccentricity: 0.089,
    description: 'Vesta is the second-most massive body in the asteroid belt, accounting for about 9% of the belt\'s total mass.',
    keyFacts: [
      'Second-most massive body in the asteroid belt',
      'Accounts for about 9% of the belt\'s mass',
      'Has a basaltic surface with a large impact crater',
      'Visited by NASA\'s Dawn spacecraft (2011-2012)',
      'Differentiated body with a metallic core'
    ],
    discovery: {
      discoveredBy: 'Heinrich Wilhelm Olbers',
      discoveryDate: '1807',
      method: 'Telescope observation'
    },
    images: ['/textures/asteroids/vesta.jpg'],
    texture: '/textures/asteroids/vesta.jpg',
    funFacts: [
      'Has a massive impact crater called Rheasilvia',
      'Is the source of HED meteorites that fall to Earth',
      'Has a distinctive dark hemisphere',
      'Rotates once every 5.3 hours'
    ],
    comparisons: {
      earth: 'Vesta is about 1/20th the diameter of Earth'
    }
  },
  {
    id: 'pallas',
    name: 'Pallas',
    type: 'asteroid',
    radius: 258, // km
    mass: 2.11e20, // kg
    density: 2.83, // g/cm³
    gravity: 0.19, // m/s²
    escapeVelocity: 0.33, // km/s
    distanceFromSun: 2.77, // AU
    orbitalPeriod: 1686, // Earth days
    rotationPeriod: 7.8, // hours
    axialTilt: 78, // degrees - highly tilted!
    eccentricity: 0.231,
    description: 'Pallas is the third-largest asteroid in the solar system and one of the largest in the asteroid belt.',
    keyFacts: [
      'Third-largest asteroid in the solar system',
      'Highly inclined orbit (34.8° to the ecliptic)',
      'Highly tilted rotation axis (78°)',
      'Discovered in 1802 by Heinrich Wilhelm Olbers',
      'May be a protoplanet that never fully formed'
    ],
    discovery: {
      discoveredBy: 'Heinrich Wilhelm Olbers',
      discoveryDate: '1802',
      method: 'Telescope observation'
    },
    images: ['/textures/asteroids/pallas.jpg'],
    texture: '/textures/asteroids/pallas.jpg',
    funFacts: [
      'Has a highly unusual orbit and rotation',
      'May be composed of water ice and silicate rock',
      'One of the first asteroids discovered',
      'Named after the Greek goddess of wisdom'
    ],
    comparisons: {
      earth: 'Pallas is about 1/20th the diameter of Earth'
    }
  },
  {
    id: 'hygiea',
    name: 'Hygiea',
    type: 'asteroid',
    radius: 215, // km
    mass: 8.67e19, // kg
    density: 1.77, // g/cm³ - very low density
    gravity: 0.11, // m/s²
    escapeVelocity: 0.23, // km/s
    distanceFromSun: 3.14, // AU
    orbitalPeriod: 2031, // Earth days
    rotationPeriod: 13.8, // hours
    axialTilt: 0, // degrees
    eccentricity: 0.117,
    description: 'Hygiea is the fourth-largest asteroid in the solar system and the largest of the dark C-type asteroids.',
    keyFacts: [
      'Fourth-largest asteroid in the solar system',
      'Largest of the dark C-type asteroids',
      'Located in the outer region of the asteroid belt',
      'Discovered in 1849 by Annibale de Gasparis',
      'May be nearly spherical, qualifying it as a dwarf planet'
    ],
    discovery: {
      discoveredBy: 'Annibale de Gasparis',
      discoveryDate: '1849',
      method: 'Telescope observation'
    },
    images: ['/textures/asteroids/hygiea.jpg'],
    texture: '/textures/asteroids/hygiea.jpg',
    funFacts: [
      'Named after the Greek goddess of health',
      'Has a very low density, suggesting it may be a rubble pile',
      'May be the source of the Hygiea family of asteroids',
      'Appears to be nearly spherical in shape'
    ],
    comparisons: {
      earth: 'Hygiea is about 1/25th the diameter of Earth'
    }
  }
];

export default function AsteroidBelt({ 
  innerRadius = 2.1,     // AU - inner edge of main belt
  outerRadius = 3.3,     // AU - outer edge of main belt
  asteroidCount = 2000,  // Number of asteroids to render
  maxHeight = 0.2,       // AU - maximum height above/below ecliptic
  sizeScale = 1.0        // Scale factor for asteroid sizes
}: AsteroidBeltProps) {
  const pointsRef = useRef<Points>(null);
  
  // Generate asteroid data with realistic distribution
  const { positions, colors, sizes } = useMemo(() => {
    // Create arrays for asteroid data
    const positionsArray = new Float32Array(asteroidCount * 3);
    const colorsArray = new Float32Array(asteroidCount * 3);
    const sizesArray = new Float32Array(asteroidCount);
    
    // Generate asteroids with realistic distribution
    for (let i = 0; i < asteroidCount; i++) {
      // Logarithmic distribution for more realistic spacing
      const radialPosition = innerRadius + (outerRadius - innerRadius) * Math.random();
      
      // Angular position (0-360 degrees)
      const angle = Math.random() * Math.PI * 2;
      
      // Height above/below ecliptic plane (thin disk)
      const height = (Math.random() - 0.5) * 2 * maxHeight;
      
      // Convert to Cartesian coordinates
      const x = radialPosition * Math.cos(angle);
      const z = radialPosition * Math.sin(angle);
      const y = height;
      
      positionsArray[i * 3] = x;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = z;
      
      // Color variation to represent different asteroid types
      // C-type (carbonaceous) asteroids - dark gray - 75%
      // S-type (silicaceous) asteroids - light gray/tan - 17%
      // M-type (metallic) asteroids - light gray/white - 8%
      const type = Math.random();
      if (type < 0.75) {
        // C-type: dark gray
        colorsArray[i * 3] = 0.2 + Math.random() * 0.1;     // R
        colorsArray[i * 3 + 1] = 0.2 + Math.random() * 0.1; // G
        colorsArray[i * 3 + 2] = 0.2 + Math.random() * 0.1; // B
      } else if (type < 0.92) {
        // S-type: tan/light brown
        colorsArray[i * 3] = 0.7 + Math.random() * 0.2;     // R
        colorsArray[i * 3 + 1] = 0.6 + Math.random() * 0.2; // G
        colorsArray[i * 3 + 2] = 0.4 + Math.random() * 0.1; // B
      } else {
        // M-type: light gray/white
        colorsArray[i * 3] = 0.8 + Math.random() * 0.2;     // R
        colorsArray[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
        colorsArray[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      }
      
      // Size distribution following observed patterns
      // Most asteroids are very small, few are large
      // Using a power-law distribution for realism
      const sizeClass = Math.random();
      let size: number;
      if (sizeClass < 0.8) {
        // Small asteroids (80%)
        size = 0.02 + Math.random() * 0.08;
      } else if (sizeClass < 0.95) {
        // Medium asteroids (15%)
        size = 0.1 + Math.random() * 0.2;
      } else {
        // Large asteroids (5%)
        size = 0.3 + Math.random() * 0.7;
      }
      
      sizesArray[i] = size * sizeScale;
    }
    
    return {
      positions: positionsArray,
      colors: colorsArray,
      sizes: sizesArray,
    };
  }, [innerRadius, outerRadius, asteroidCount, maxHeight, sizeScale]);
  
  // Gentle orbital motion animation
  useFrame((state) => {
    if (pointsRef.current) {
      const time = state.clock.getElapsedTime();
      // Slow rotation to simulate orbital motion
      pointsRef.current.rotation.y = time * 0.01;
    }
  });
  
  return (
    <group>
      {/* Main asteroid belt */}
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
          size={0.05}
          sizeAttenuation={true}
          alphaTest={0.5}
          depthWrite={false}
          depthTest={true}
          blending={AdditiveBlending}
        />
      </points>
      
      {/* Render major asteroids as larger points for visibility */}
      {majorAsteroids.map((asteroid, index) => {
        // Calculate position based on orbital distance
        const angle = (index / majorAsteroids.length) * Math.PI * 2;
        const x = (asteroid.distanceFromSun || 2.5) * Math.cos(angle);
        const z = (asteroid.distanceFromSun || 2.5) * Math.sin(angle);
        const y = (Math.random() - 0.5) * 0.1; // Slight height variation
        
        return (
          <points key={asteroid.id}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([x, y, z])}
                count={1}
                itemSize={3}
              />
              <bufferAttribute
                attach="attributes-color"
                array={new Float32Array([0.9, 0.9, 0.9])} // Bright white for visibility
                count={1}
                itemSize={3}
              />
              <bufferAttribute
                attach="attributes-size"
                array={new Float32Array([0.2 * sizeScale])}
                count={1}
                itemSize={1}
              />
            </bufferGeometry>
            <pointsMaterial
              color="#ffffff"
              transparent
              size={0.2 * sizeScale}
              sizeAttenuation={true}
              alphaTest={0.5}
              depthWrite={false}
              depthTest={true}
              blending={AdditiveBlending}
            />
          </points>
        );
      })}
    </group>
  );
}