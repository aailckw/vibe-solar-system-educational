'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SolarSystemScene from './SolarSystemScene';
import EnhancedCosmicBackground from './EnhancedCosmicBackground';
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
    timeScale: 0, // Start paused by default
    showOrbits: true,
    showLabels: true,
    scaleMode: 'visible',
    selectedBody: null,
    demoMode: 'real-scale', // Highlight the demo mode
  });
  
  const [navigation, setNavigation] = useState<NavigationState>({
    target: null,
    isTransitioning: false,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    cameraMode: 'free',
  });

  const handleBodySelect = useCallback((bodyId: string | null) => {
    setSelectedBody(bodyId);
    setControls(prev => ({ ...prev, selectedBody: bodyId }));
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
    <div className="relative w-full h-screen overflow-hidden bg-space-950">
      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 50, 200], fov: 75 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        
        <EnhancedCosmicBackground
          radius={2000}
          useEquirectangular={true}
          useCubeMap={false}
          showDeepSpace={true}
          brightness={1.0}
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
          minDistance={5}
          maxDistance={2000}
          autoRotate={navigation.autoRotate && !navigation.isTransitioning}
          autoRotateSpeed={navigation.autoRotateSpeed || 0.3}
        />
      </Canvas>

      {/* UI Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Demo Banner */}
        {controls.demoMode === 'real-scale' && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <div className="panel-glass px-6 py-3 bg-gradient-to-r from-blue-900/80 to-green-900/80 border border-blue-400/30">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <h2 className="text-white font-bold text-lg">
                    Demo: Real-in-Scale Solar System
                  </h2>
                  <p className="text-blue-200 text-sm">
                    Scientifically accurate planetary motion • All relative speeds preserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
              {controls.demoMode === 'real-scale' && (
                <p className="text-green-400 text-xs mt-1 font-medium">
                  ✓ Real-Scale Demo Active - Scientific timing preserved
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}