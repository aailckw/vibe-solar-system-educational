'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  Sun, 
  Globe, 
  Moon, 
  Search,
  Navigation,
  Home
} from 'lucide-react';
import { PlanetaryBody } from '@/types/solar-system';

interface NavigationPanelProps {
  bodies: PlanetaryBody[];
  selectedBody: string | null;
  onNavigateTo: (bodyId: string) => void;
  onBodySelect: (bodyId: string | null) => void;
}

export default function NavigationPanel({
  bodies,
  selectedBody,
  onNavigateTo,
  onBodySelect
}: NavigationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getBodyIcon = (type: string) => {
    switch (type) {
      case 'star': return Sun;
      case 'planet': return Globe;
      case 'moon': return Moon;
      default: return Globe;
    }
  };

  // Filter bodies based on search
  const filteredBodies = bodies.filter(body =>
    body.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigate = (bodyId: string) => {
    onNavigateTo(bodyId);
    onBodySelect(bodyId);
    setIsOpen(false);
  };

  const handleOverview = () => {
    handleNavigate('sun');
  };

  return (
    <div className="relative">
      {/* Main Navigation Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 flex items-center space-x-2 hover:bg-slate-800/80 transition-colors"
      >
        <Navigation className="w-5 h-5 text-blue-400" />
        <span className="text-white font-medium">Navigate</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Navigation Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-80 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-lg p-4 z-50">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search celestial bodies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Quick Actions</h3>
            <button
              onClick={handleOverview}
              className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-700 transition-colors text-left"
            >
              <Home className="w-4 h-4 text-blue-400" />
              <span className="text-white">View the Sun</span>
            </button>
          </div>

          {/* Bodies List */}
          <div className="max-h-64 overflow-y-auto">
            <h3 className="text-sm font-semibold text-slate-300 mb-2">Celestial Bodies</h3>
            <div className="space-y-1">
              {/* Main Bodies */}
              {filteredBodies.map((body) => {
                const Icon = getBodyIcon(body.type);
                const isSelected = selectedBody === body.id;
                
                return (
                  <button
                    key={body.id}
                    onClick={() => handleNavigate(body.id)}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors text-left ${
                      isSelected 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${
                      body.type === 'star' ? 'text-yellow-400' :
                      body.type === 'planet' ? 'text-blue-400' :
                      'text-slate-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{body.name}</div>
                      <div className="text-xs opacity-75 capitalize">{body.type}</div>
                    </div>
                    {body.moons && body.moons.length > 0 && (
                      <span className="text-xs bg-slate-600 px-2 py-1 rounded-full">
                        {body.moons.length} moon{body.moons.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </button>
                );
              })}
              
              {/* Moons */}
              {filteredBodies.map((body) => 
                body.moons?.map((moon) => {
                  const Icon = getBodyIcon(moon.type);
                  const isSelected = selectedBody === moon.id;
                  
                  return (
                    <button
                      key={moon.id}
                      onClick={() => handleNavigate(moon.id)}
                      className={`w-full flex items-center space-x-3 p-2 pl-6 rounded-lg transition-colors text-left ${
                        isSelected 
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-slate-400" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{moon.name}</div>
                        <div className="text-xs opacity-75">
                          {body.name}'s moon
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
            
            {filteredBodies.length === 0 && (
              <div className="text-center py-4 text-slate-400">
                No celestial bodies match your search
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}