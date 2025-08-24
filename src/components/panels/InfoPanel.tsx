'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Info, Atom, Globe, Clock } from 'lucide-react';
import { PlanetaryBody } from '@/types/solar-system';
import { formatNumber, formatDistance, auToKm } from '@/lib/utils';

interface InfoPanelProps {
  body: PlanetaryBody;
  onClose: () => void;
}

export default function InfoPanel({ body, onClose }: InfoPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'discovery' | 'media'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'stats', label: 'Statistics', icon: Atom },
    { id: 'discovery', label: 'Discovery', icon: Globe },
    { id: 'media', label: 'Media', icon: Play },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="panel-glass p-4 max-w-md max-h-[70vh] overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{body.name}</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-space-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-space-800 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-space-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <OverviewTab body={body} />}
            {activeTab === 'stats' && <StatsTab body={body} />}
            {activeTab === 'discovery' && <DiscoveryTab body={body} />}
            {activeTab === 'media' && <MediaTab body={body} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function OverviewTab({ body }: { body: PlanetaryBody }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{body.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Key Facts</h3>
        <ul className="space-y-1">
          {body.keyFacts.map((fact, index) => (
            <li key={index} className="text-slate-300 text-sm flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0" />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Fun Facts</h3>
        <div className="space-y-2">
          {body.funFacts.map((fact, index) => (
            <div key={index} className="bg-space-800 p-3 rounded-lg">
              <p className="text-slate-300 text-sm">{fact}</p>
            </div>
          ))}
        </div>
      </div>

      {body.comparisons.earth && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Compared to Earth</h3>
          <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-700/50">
            <p className="text-slate-300 text-sm">{body.comparisons.earth}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsTab({ body }: { body: PlanetaryBody }) {
  const stats = [
    { label: 'Radius', value: formatDistance(body.radius), unit: '' },
    { label: 'Mass', value: formatNumber(body.mass), unit: 'kg' },
    { label: 'Density', value: body.density.toFixed(2), unit: 'g/cm³' },
    { label: 'Gravity', value: body.gravity.toFixed(2), unit: 'm/s²' },
    { label: 'Escape Velocity', value: body.escapeVelocity.toFixed(2), unit: 'km/s' },
    ...(body.distanceFromSun ? [{ 
      label: 'Distance from Sun', 
      value: formatDistance(auToKm(body.distanceFromSun)), 
      unit: '' 
    }] : []),
    ...(body.orbitalPeriod ? [{ 
      label: 'Orbital Period', 
      value: body.orbitalPeriod.toFixed(1), 
      unit: 'Earth days' 
    }] : []),
    { label: 'Rotation Period', value: (body.rotationPeriod / 24).toFixed(1), unit: 'Earth days' },
    { label: 'Axial Tilt', value: body.axialTilt.toFixed(1), unit: '°' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-space-800 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">{stat.label}</span>
              <span className="text-white font-medium">
                {stat.value} {stat.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {body.atmosphere && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Atmosphere</h3>
          <div className="space-y-2">
            <div className="bg-space-800 p-3 rounded-lg">
              <span className="text-slate-400 text-sm">Pressure: </span>
              <span className="text-white font-medium">
                {body.atmosphere.pressure} Earth atmospheres
              </span>
            </div>
            <div className="bg-space-800 p-3 rounded-lg">
              <span className="text-slate-400 text-sm">Average Temperature: </span>
              <span className="text-white font-medium">
                {body.atmosphere.temperature.average}°C
              </span>
            </div>
            <div className="bg-space-800 p-3 rounded-lg">
              <div className="text-slate-400 text-sm mb-2">Composition:</div>
              <div className="space-y-1">
                {Object.entries(body.atmosphere.composition).map(([gas, percentage]) => (
                  <div key={gas} className="flex justify-between text-sm">
                    <span className="text-slate-300">{gas}</span>
                    <span className="text-white">{percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DiscoveryTab({ body }: { body: PlanetaryBody }) {
  return (
    <div className="space-y-4">
      <div className="bg-space-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Discovery Information</h3>
        <div className="space-y-3">
          <div>
            <span className="text-slate-400 text-sm">Discovered by: </span>
            <span className="text-white font-medium">{body.discovery.discoveredBy}</span>
          </div>
          <div>
            <span className="text-slate-400 text-sm">Discovery date: </span>
            <span className="text-white font-medium">{body.discovery.discoveryDate}</span>
          </div>
          <div>
            <span className="text-slate-400 text-sm">Method: </span>
            <span className="text-white font-medium">{body.discovery.method}</span>
          </div>
        </div>
      </div>

      {body.moons && body.moons.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Moons</h3>
          <div className="space-y-2">
            {body.moons.map((moon) => (
              <div key={moon.id} className="bg-space-800 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{moon.name}</span>
                  <span className="text-slate-400 text-sm">
                    {formatDistance(moon.radius)} radius
                  </span>
                </div>
                <p className="text-slate-300 text-sm mt-1">{moon.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {body.hasRings && (
        <div className="bg-space-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Ring System</h3>
          <p className="text-slate-300 text-sm">
            {body.name} has a prominent ring system composed of ice and rock particles.
          </p>
        </div>
      )}
    </div>
  );
}

function MediaTab({ body }: { body: PlanetaryBody }) {
  return (
    <div className="space-y-4">
      {/* Video Player Placeholder */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Educational Video</h3>
        <div className="bg-space-800 border-2 border-dashed border-space-600 rounded-lg p-8 text-center">
          <Play className="w-12 h-12 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-400 text-sm mb-1">Video Content Placeholder</p>
          <p className="text-slate-500 text-xs">
            {body.videoUrl || 'Video content will be added here'}
          </p>
        </div>
      </div>

      {/* Image Gallery Placeholder */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Image Gallery</h3>
        <div className="grid grid-cols-2 gap-2">
          {body.images.map((image, index) => (
            <div key={index} className="bg-space-800 border-2 border-dashed border-space-600 rounded-lg p-4 text-center">
              <Globe className="w-8 h-8 text-slate-400 mx-auto mb-1" />
              <p className="text-slate-500 text-xs">{image}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Model Placeholder */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">3D Model Viewer</h3>
        <div className="bg-space-800 border-2 border-dashed border-space-600 rounded-lg p-8 text-center">
          <Atom className="w-12 h-12 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-400 text-sm mb-1">Interactive 3D Model</p>
          <p className="text-slate-500 text-xs">
            Detailed 3D model viewer will be available here
          </p>
        </div>
      </div>
    </div>
  );
}