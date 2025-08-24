import React from 'react';
import { Download, X } from 'lucide-react';

export default function TextureEnhancementInfo({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="panel-glass max-w-lg w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Blue Marble Earth Enhanced!</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-space-700 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-4 text-sm">
          <p className="text-slate-300">
            Earth now features enhanced Blue Marble visualization with brighter, more realistic appearance!
          </p>
          
          <div className="bg-space-800 p-3 rounded">
            <h3 className="font-semibold text-white mb-2">🌍 Blue Marble Enhancements:</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Brighter, more vibrant Earth colors</li>
              <li>Enhanced atmospheric glow</li>
              <li>Improved ocean reflection simulation</li>
              <li>NASA Blue Marble texture support</li>
            </ul>
          </div>
          
          <div className="bg-space-800 p-3 rounded">
            <h3 className="font-semibold text-white mb-2">🚀 Optional NASA Textures:</h3>
            <ol className="list-decimal list-inside space-y-1 text-slate-300">
              <li>Check TEXTURE_SETUP.md for instructions</li>
              <li>Download NASA Blue Marble for Earth</li>
              <li>Place textures in /public/textures/</li>
            </ol>
          </div>
          
          <p className="text-slate-400 text-xs">
            ✨ Enjoy the enhanced Blue Marble Earth! Textures are optional - the simulation looks great without them too.
          </p>
        </div>
      </div>
    </div>
  );
}