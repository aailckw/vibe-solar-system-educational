import React, { Suspense } from 'react';
import { useProgress } from '@react-three/drei';

// Loading fallback component for textures
export function TextureLoadingFallback() {
  return null; // Silent loading - planets will show with fallback colors
}

// Progress indicator for texture loading (optional)
export function TextureLoadingProgress() {
  const { progress } = useProgress();
  
  if (progress === 100) return null;
  
  return (
    <div className="absolute top-4 right-4 bg-space-900/80 backdrop-blur-lg border border-space-700/50 rounded-lg p-3 pointer-events-none">
      <div className="text-slate-300 text-sm">
        Loading textures... {Math.round(progress)}%
      </div>
      <div className="w-32 h-1 bg-space-700 rounded-full mt-2">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// Wrapper component for texture-enhanced planets
export function EnhancedPlanetWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<TextureLoadingFallback />}>
      {children}
    </Suspense>
  );
}

// Utility function to check if texture exists
export async function checkTextureExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Development helper to show texture loading status
export function TextureDebugInfo({ planetId, textures }: { planetId: string; textures: any }) {
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded text-xs">
      <div>Planet: {planetId}</div>
      <div>Textures: {textures?.hasTextures ? 'Loaded' : 'Fallback'}</div>
      {textures?.textures && (
        <div>
          {Object.keys(textures.textures).map(key => (
            <div key={key}>• {key}</div>
          ))}
        </div>
      )}
    </div>
  );
}