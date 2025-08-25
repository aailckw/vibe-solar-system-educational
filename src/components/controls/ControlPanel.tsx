'use client';

import React, { useState } from 'react';
import {
  Settings,
  ChevronDown,
  Play,
  Pause,
  Eye,
  Camera,
  Clock
} from 'lucide-react';
import { SimulationControls, NavigationState } from '@/types/solar-system';

interface ControlPanelProps {
  controls: SimulationControls;
  onControlsChange: (controls: Partial<SimulationControls>) => void;
  navigation: NavigationState;
  onNavigationChange: (navigation: Partial<NavigationState>) => void;
}

export default function ControlPanel({
  controls,
  onControlsChange,
  navigation,
  onNavigationChange
}: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'time' | 'view' | 'camera'>('time');

  const timeScales = [
    { value: 0, label: 'Paused', multiplier: '0x' },
    { value: 1/24, label: '1 sec = 1 hour', multiplier: '24x' },
    { value: 0.5, label: '1 sec = 12 hours', multiplier: '48x' },
    { value: 1, label: '1 sec = 1 day', multiplier: '1440x' },
    { value: 7, label: '1 sec = 1 week', multiplier: '10080x' },
    { value: 30, label: '1 sec = 1 month', multiplier: '43200x' },
  ];

  const scaleModes = [
    { value: 'realistic', label: 'Realistic Scale' },
    { value: 'visible', label: 'Visible Scale' },
    { value: 'logarithmic', label: 'Logarithmic Scale' },
  ] as const;

  const cameraModes = [
    { value: 'free', label: 'Free Camera' },
    { value: 'follow', label: 'Follow Object' },
  ] as const;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 flex items-center space-x-2 hover:bg-slate-800/80 transition-colors"
      >
        <Settings className="w-5 h-5 text-blue-400" />
        <span className="text-white font-medium">Controls</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg p-4 z-50">
          <div className="flex space-x-1 mb-4 bg-slate-800 rounded-lg p-1">
            {[
              { id: 'time', label: 'Time', icon: Clock },
              { id: 'view', label: 'View', icon: Eye },
              { id: 'camera', label: 'Camera', icon: Camera },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="max-h-64 overflow-y-auto">
            {activeTab === 'time' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Time Scale</h3>
                  <div className="space-y-2">
                    {timeScales.map((scale) => (
                      <button
                        key={scale.value}
                        onClick={() => onControlsChange({ timeScale: scale.value })}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          controls.timeScale === scale.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{scale.label}</div>
                            <div className="text-xs opacity-75">Speed: {scale.multiplier}</div>
                          </div>
                          {scale.value === 0 ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onControlsChange({ timeScale: 1 })}
                      className="p-2 bg-green-600 hover:bg-green-700 rounded text-sm text-white transition-colors"
                    >
                      Real Time
                    </button>
                    <button
                      onClick={() => onControlsChange({ timeScale: 0 })}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded text-sm text-white transition-colors"
                    >
                      Pause
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'view' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Display Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Show Orbits</span>
                      <button
                        onClick={() => onControlsChange({ showOrbits: !controls.showOrbits })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          controls.showOrbits ? 'bg-blue-600' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            controls.showOrbits ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Show Labels</span>
                      <button
                        onClick={() => onControlsChange({ showLabels: !controls.showLabels })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          controls.showLabels ? 'bg-blue-600' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            controls.showLabels ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Scale Mode</h3>
                  <div className="space-y-2">
                    {scaleModes.map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => onControlsChange({ scaleMode: mode.value })}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          controls.scaleMode === mode.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="font-medium">{mode.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'camera' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Camera Mode</h3>
                  <div className="space-y-2">
                    {cameraModes.map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => onNavigationChange({ cameraMode: mode.value })}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          navigation.cameraMode === mode.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="font-medium">{mode.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}