'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SolarSystemScene from './SolarSystemScene';
import AsteroidBelt from './AsteroidBelt';
import InfoPanel from '@/components/panels/InfoPanel';
import ControlPanel from '@/components/controls/ControlPanel';
import NavigationPanel from '@/components/controls/NavigationPanel';
import { TextureLoadingProgress } from './TextureLoader';
import { SimulationControls, NavigationState } from '@/types/solar-system';
import { solarSystemData } from '@/lib/data/solar-system-data';

export default function SolarSystemSimulation() {
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const orbitControlsRef = useRef<any>(null); // Ref for OrbitControls
  const [controls, setControls] = useState<SimulationControls>({
    timeScale: 1/24, // Changed to 1/24 to set default speed to 1 sec = 1 hour (24x)
    showOrbits: true,
    showLabels: true,
    scaleMode: 'visible',
    selectedBody: null,
  });
  
  const [navigation, setNavigation] = useState<NavigationState>({
    target: 'sun',
    isTransitioning: false,
    cameraMode: 'follow',
  });

  const handleBodySelect = useCallback((bodyId: string | null) => {
    setSelectedBody(bodyId);
    setControls(prev => ({ ...prev, selectedBody: bodyId }));
    if (bodyId) {
      setNavigation(prev => ({
        ...prev,
        target: bodyId,
        cameraMode: 'follow'
      }));
    }
  }, []);

  const handleNavigateTo = useCallback((bodyId: string) => {
    setNavigation(prev => ({
      ...prev,
      target: bodyId,
      isTransitioning: true,
    }));
  }, []);

  const handleControlsChange = useCallback((newControls: Partial<SimulationControls>) => {
    setControls(prev => ({ ...prev, ...newControls }));
  }, []);

  const handleNavigationChange = useCallback((newNavigation: Partial<NavigationState>) => {
    setNavigation(prev => ({ ...prev, ...newNavigation }));
  }, []);

  const selectedBodyData = selectedBody 
    ? solarSystemData.bodies.find(body => body.id === selectedBody)
    : null;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 20, 50], fov: 75 }}
        className="w-full h-full"
      >
        {/* Pure black background */}
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.3} /> {/* Increased ambient light for better planet visibility */}
        <pointLight position={[0, 0, 0]} intensity={10} distance={3000} decay={1} /> {/* Increased sun light intensity */}
        <directionalLight position={[10, 10, 5]} intensity={1.0} /> {/* Increased directional light for better illumination */}
        
        {/* Realistic asteroid belt between Mars and Jupiter */}
        <AsteroidBelt 
          innerRadius={2.1} 
          outerRadius={3.3} 
          asteroidCount={2000} 
          maxHeight={0.2} 
          sizeScale={1.0} 
        />
        
        <SolarSystemScene
          controls={controls}
          navigation={navigation}
          onBodySelect={handleBodySelect}
          onNavigationComplete={() => setNavigation(prev => ({ ...prev, isTransitioning: false }))}
          orbitControlsRef={orbitControlsRef}
        />
        
        <OrbitControls
          ref={orbitControlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.8}
          rotateSpeed={0.4}
          minDistance={2}
          maxDistance={2000} // Increased to maximum for better viewing of the entire solar system
        />
      </Canvas>

      {/* UI Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Texture Loading Progress */}
        <TextureLoadingProgress />
        
        {/* Navigation Panel */}
        <div className="absolute top-4 left-4 pointer-events-auto">
          <NavigationPanel
            bodies={solarSystemData.bodies}
            selectedBody={selectedBody}
            onNavigateTo={handleNavigateTo}
            onBodySelect={handleBodySelect}
          />
        </div>

        {/* Control Panel */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <ControlPanel
            controls={controls}
            onControlsChange={handleControlsChange}
            navigation={navigation}
            onNavigationChange={handleNavigationChange}
          />
        </div>

        {/* Info Panel */}
        {selectedBodyData && (
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 pointer-events-auto">
            <InfoPanel
              body={selectedBodyData}
              onClose={() => handleBodySelect(null)}
            />
          </div>
        )}

        {/* Quick Info Display */}
        {!selectedBodyData && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <div className="panel-glass px-4 py-2 text-center">
              <p className="text-slate-300 text-sm">
                Click on any celestial body to learn more about it
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}