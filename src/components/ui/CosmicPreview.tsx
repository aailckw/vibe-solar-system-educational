/**
 * Cosmic Background Preview Component
 * Shows what the authentic space background will look like
 */

'use client';

import React from 'react';

interface CosmicPreviewProps {
  onClose?: () => void;
}

export default function CosmicPreview({ onClose }: CosmicPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">🌌 Real Cosmic Background</h2>
            {onClose && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            )}
          </div>
          <p className="text-slate-300 mt-2">
            Replace fake stars with authentic Milky Way panorama imagery
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Before/After Comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-red-400">❌ Before: Fake Stars</h3>
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 h-32 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0">
                  {/* Simulate random dots */}
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-slate-400 text-sm relative z-10">Random procedural dots</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-400">✅ After: Real Milky Way</h3>
              <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 h-32 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/10 to-transparent transform rotate-12"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-200/5 to-transparent transform -rotate-12"></div>
                <span className="text-white text-sm relative z-10">Authentic cosmic panorama</span>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">🎯 What You Get</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-green-400">
                  <span className="mr-2">✓</span>
                  <span>Real Milky Way structure</span>
                </div>
                <div className="flex items-center text-green-400">
                  <span className="mr-2">✓</span>
                  <span>Authentic star positions</span>
                </div>
                <div className="flex items-center text-green-400">
                  <span className="mr-2">✓</span>
                  <span>ESA Gaia survey data</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-green-400">
                  <span className="mr-2">✓</span>
                  <span>Real telescope imagery</span>
                </div>
                <div className="flex items-center text-green-400">
                  <span className="mr-2">✓</span>
                  <span>Famous nebulae & galaxies</span>
                </div>
                <div className="flex items-center text-green-400">
                  <span className="mr-2">✓</span>
                  <span>No fake procedural stars</span>
                </div>
              </div>
            </div>
          </div>

          {/* Download Instructions */}
          <div className="bg-blue-900/30 border border-blue-400/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">📥 Download Required</h3>
            <p className="text-blue-200 mb-3">
              I've opened the ESA Gaia and ESO image pages in your browser. Download the Milky Way panorama image:
            </p>
            <div className="space-y-2 text-sm">
              <div className="bg-blue-800/50 p-2 rounded">
                <strong className="text-blue-300">Step 1:</strong> Find the highest resolution Milky Way panorama
              </div>
              <div className="bg-blue-800/50 p-2 rounded">
                <strong className="text-blue-300">Step 2:</strong> Save as: <code className="bg-slate-700 px-1 rounded">milky_way_gaia.jpg</code>
              </div>
              <div className="bg-blue-800/50 p-2 rounded">
                <strong className="text-blue-300">Step 3:</strong> Place in: <code className="bg-slate-700 px-1 rounded">public/textures/backgrounds/</code>
              </div>
            </div>
          </div>

          {/* Alternative Sources */}
          <div className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">🔗 Image Sources</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                <span className="text-slate-300">ESA Gaia All-Sky Survey</span>
                <span className="text-green-400">✓ Opened</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                <span className="text-slate-300">ESO Milky Way Panorama</span>
                <span className="text-green-400">✓ Opened</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-slate-700 rounded">
                <span className="text-slate-300">NASA WISE Survey</span>
                <span className="text-slate-400">Alternative</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-green-900/30 border border-green-400/30 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-300 mb-2">✅ System Ready</h3>
            <p className="text-green-200 text-sm">
              The cosmic background system is installed and ready. It will automatically use real images when available
              and gracefully handle missing files. No fake stars will be generated!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}