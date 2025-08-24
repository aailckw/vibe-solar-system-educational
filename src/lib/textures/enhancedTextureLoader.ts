import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';

// Enhanced texture loader for when actual texture files are available
export function useEnhancedPlanetTextures(planetId: string, enableTextureLoading: boolean = false) {
  return useMemo(() => {
    // Only attempt to load textures if explicitly enabled and files are available
    if (!enableTextureLoading) {
      const fallbackColors = {
        sun: '#FDB813',
        mercury: '#8C7853',
        venus: '#FFC649', 
        earth: '#6B93D6', // Natural earth color
        mars: '#CD5C5C',
        jupiter: '#D8CA9D',
        saturn: '#FAD5A5',
        uranus: '#4FD0E7',
        neptune: '#4B70DD',
        moon: '#C0C0C0'
      };
      
      return {
        fallbackColor: fallbackColors[planetId as keyof typeof fallbackColors] || '#888888',
        hasTextures: false
      };
    }
    
    // Texture loading implementation for when files are available
    // This will be activated once texture files are downloaded
    try {
      const textures: any = {};
      
      switch (planetId) {
        case 'earth':
          try {
            textures.map = useLoader(TextureLoader, '/textures/earth/2k_earth_blue_marble.jpg');
            textures.clouds = useLoader(TextureLoader, '/textures/earth/2k_earth_clouds.jpg');
            textures.normal = useLoader(TextureLoader, '/textures/earth/2k_earth_normal_map.jpg');
            textures.night = useLoader(TextureLoader, '/textures/earth/2k_earth_nightmap.jpg');
          } catch (error) {
            console.warn('Earth texture loading failed:', error);
            return { fallbackColor: '#6B93D6', hasTextures: false };
          }
          break;
          
        case 'mars':
          try {
            textures.map = useLoader(TextureLoader, '/textures/mars/mars.jpg');
          } catch (error) {
            console.warn('Mars texture loading failed:', error);
            return { fallbackColor: '#CD5C5C', hasTextures: false };
          }
          break;
          
        case 'jupiter':
          try {
            textures.map = useLoader(TextureLoader, '/textures/jupiter/jupiter.jpg');
          } catch (error) {
            console.warn('Jupiter texture loading failed:', error);
            return { fallbackColor: '#D8CA9D', hasTextures: false };
          }
          break;
          
        case 'saturn':
          try {
            textures.map = useLoader(TextureLoader, '/textures/saturn/saturn.jpg');
            textures.ring = useLoader(TextureLoader, '/textures/saturn/saturn-rings.png');
          } catch (error) {
            console.warn('Saturn texture loading failed:', error);
            return { fallbackColor: '#FAD5A5', hasTextures: false };
          }
          break;
          
        default:
          return { fallbackColor: '#888888', hasTextures: false };
      }
      
      return {
        textures,
        hasTextures: Object.keys(textures).length > 0,
        fallbackColor: '#888888'
      };
    } catch (error) {
      console.warn(`Enhanced texture loading failed for ${planetId}:`, error);
      return { fallbackColor: '#888888', hasTextures: false };
    }
  }, [planetId, enableTextureLoading]);
}

// Configuration flag to enable texture loading
// Set this to true once texture files are downloaded
export const ENABLE_TEXTURE_LOADING = true;

// Instructions for enabling textures
export const TEXTURE_ENABLE_INSTRUCTIONS = `
To enable enhanced textures:

1. Download texture files according to TEXTURE_SETUP.md
2. Place files in public/textures/ directories
3. Set ENABLE_TEXTURE_LOADING = true in this file
4. Restart the development server

The simulation will work with fallback colors until textures are enabled.
`;