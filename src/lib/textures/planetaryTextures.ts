import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';

// Type definitions for texture configurations
interface BaseTextureConfig {
  map: string;
  fallback: string;
}

interface EarthTextureConfig extends BaseTextureConfig {
  normal?: string;
  clouds?: string;
  night?: string;
}

interface MarsTextureConfig extends BaseTextureConfig {
  normal?: string;
}

interface SaturnTextureConfig extends BaseTextureConfig {
  ring?: string;
}

interface JupiterTextureConfig extends BaseTextureConfig {
  ring?: string;
}

type TextureConfig = BaseTextureConfig | EarthTextureConfig | MarsTextureConfig | SaturnTextureConfig | JupiterTextureConfig;

// Texture configurations for each planetary body
export const PLANET_TEXTURES: Record<string, TextureConfig> = {
  sun: {
    map: '/textures/sun/sun.jpg',
    fallback: '#FDB813'
  },
  mercury: {
    map: '/textures/mercury/mercury.jpg',
    fallback: '#8C7853'
  },
  venus: {
    map: '/textures/venus/venus.jpg',
    fallback: '#FFC649'
  },
  earth: {
    map: '/textures/earth/earth.jpg', // Real Earth texture
    clouds: '/textures/earth/earth-clouds.png', // NASA Blue Marble cloud layer
    fallback: '#6B93D6' // Natural earth color as fallback
  } as EarthTextureConfig,
  mars: {
    map: '/textures/mars/mars.jpg',
    fallback: '#CD5C5C'
  } as MarsTextureConfig,
  jupiter: {
    map: '/textures/jupiter/jupiter.jpg',
    ring: '/textures/jupiter/jupiter-rings.png',
    fallback: '#D8CA9D'
  } as JupiterTextureConfig,
  saturn: {
    map: '/textures/saturn/saturn.jpg',
    ring: '/textures/saturn/saturn-rings.png',
    fallback: '#FAD5A5'
  } as SaturnTextureConfig,
  uranus: {
    map: '/textures/uranus/uranus.jpg',
    fallback: '#4FD0E7'
  },
  neptune: {
    map: '/textures/neptune/neptune.jpg',
    fallback: '#4B70DD'
  },
  moon: {
    map: '/textures/moon/moon.jpg',
    fallback: '#C0C0C0'
  },
  // Mars moons
  phobos: {
    map: '/textures/phobos/phobos.jpg',
    fallback: '#8C6239'
  },
  deimos: {
    map: '/textures/deimos/deimos.jpg',
    fallback: '#A0713D'
  },
  // Jupiter moons (Galilean satellites)
  io: {
    map: '/textures/io/io.jpg',
    fallback: '#FFFF99'
  },
  europa: {
    map: '/textures/europa/europa.jpg',
    fallback: '#E6F2FF'
  },
  ganymede: {
    map: '/textures/ganymede/ganymede.jpg',
    fallback: '#A0A0A0'
  },
  callisto: {
    map: '/textures/callisto/callisto.jpg',
    fallback: '#666666'
  },
  // Saturn moons
  titan: {
    map: '/textures/titan/titan.jpg',
    fallback: '#CC9966'
  },
  enceladus: {
    map: '/textures/enceladus/enceladus.jpg',
    fallback: '#F0F8FF'
  },
  mimas: {
    map: '/textures/mimas/mimas.jpg',
    fallback: '#C0C0C0'
  },
  iapetus: {
    map: '/textures/iapetus/iapetus.jpg',
    fallback: '#696969'
  },
  // Uranus moons
  titania: {
    map: '/textures/titania/titania.jpg',
    fallback: '#8B7355'
  },
  oberon: {
    map: '/textures/oberon/oberon.jpg',
    fallback: '#696969'
  },
  ariel: {
    map: '/textures/ariel/ariel.jpg',
    fallback: '#B8B8B8'
  },
  umbriel: {
    map: '/textures/umbriel/umbriel.jpg',
    fallback: '#505050'
  },
  miranda: {
    map: '/textures/miranda/miranda.jpg',
    fallback: '#A0A0A0'
  },
  // Neptune moons
  triton: {
    map: '/textures/triton/triton.jpg',
    fallback: '#D3D3D3'
  }
};

// Hook to load planetary textures with proper error handling
export function usePlanetTextures(planetId: string) {
  const textureConfig = PLANET_TEXTURES[planetId];
  
  return useMemo(() => {
    if (!textureConfig) {
      return { 
        fallbackColor: '#888888',
        hasTextures: false
      };
    }

    // Try to load textures, fallback to colors on error
    try {
      const textures: any = {};
      let hasAnyTextures = false;
      
      // Load main texture
      if (textureConfig.map) {
        try {
          textures.map = useLoader(TextureLoader, textureConfig.map);
          hasAnyTextures = true;
        } catch (error) {
          console.warn(`Failed to load main texture for ${planetId}:`, error);
        }
      }
      
      // Load cloud texture for Earth
      if (planetId === 'earth' && (textureConfig as EarthTextureConfig).clouds) {
        try {
          textures.clouds = useLoader(TextureLoader, (textureConfig as EarthTextureConfig).clouds!);
          hasAnyTextures = true;
        } catch (error) {
          console.warn(`Failed to load cloud texture for ${planetId}:`, error);
        }
      }
      
      // Load additional textures based on planet type - only if main texture loaded successfully
      // Load ring textures for Saturn
      if (hasAnyTextures && planetId === 'saturn') {
        // Type-safe property access  
        const saturnConfig = textureConfig as SaturnTextureConfig;
        
        if (saturnConfig.ring) {
          try {
            textures.ring = useLoader(TextureLoader, saturnConfig.ring);
          } catch (error) {
            console.warn(`Failed to load ring texture for ${planetId}:`, error);
          }
        }
      }
      
      // Load ring textures for Jupiter
      if (hasAnyTextures && planetId === 'jupiter') {
        // Type-safe property access  
        const jupiterConfig = textureConfig as JupiterTextureConfig;
        
        if (jupiterConfig.ring) {
          try {
            textures.ring = useLoader(TextureLoader, jupiterConfig.ring);
          } catch (error) {
            console.warn(`Failed to load ring texture for ${planetId}:`, error);
          }
        }
      }
      
      return {
        fallbackColor: textureConfig.fallback,
        hasTextures: hasAnyTextures,
        textures: hasAnyTextures ? textures : undefined,
        textureConfig: textureConfig
      };
    } catch (error) {
      console.warn(`Texture loading failed for ${planetId}, using fallback color:`, error);
      return {
        fallbackColor: textureConfig.fallback,
        hasTextures: false,
        textureConfig: textureConfig
      };
    }
  }, [planetId, textureConfig]);
}

// NASA and scientific texture sources information
export const TEXTURE_SOURCES = {
  nasa_blue_marble: {
    name: 'NASA Blue Marble',
    url: 'https://visibleearth.nasa.gov/collection/1484/blue-marble',
    description: 'High-resolution Earth imagery from NASA',
    usage: 'Earth surface texture'
  },
  nasa_planetary_factsheets: {
    name: 'NASA Planetary Fact Sheets',
    url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
    description: 'Comprehensive planetary data and imagery',
    usage: 'All planetary bodies'
  },
  jpl_missions: {
    name: 'JPL Mission Data',
    url: 'https://www.jpl.nasa.gov/',
    description: 'High-quality imagery from space missions',
    usage: 'Mars, Jupiter, Saturn, outer planets'
  },
  solar_system_scope: {
    name: 'Solar System Scope Textures',
    url: 'https://www.solarsystemscope.com/textures/',
    description: 'Educational planetary textures',
    usage: 'All planets, educational license'
  }
};

// Texture download and setup instructions
export function getTextureSetupInstructions() {
  return {
    directories: [
      'public/textures/sun',
      'public/textures/mercury', 
      'public/textures/venus',
      'public/textures/earth',
      'public/textures/mars',
      'public/textures/jupiter',
      'public/textures/saturn',
      'public/textures/uranus',
      'public/textures/neptune',
      'public/textures/moon',
      // Mars moons
      'public/textures/phobos',
      'public/textures/deimos',
      // Jupiter moons
      'public/textures/io',
      'public/textures/europa',
      'public/textures/ganymede',
      'public/textures/callisto',
      // Saturn moons
      'public/textures/titan',
      'public/textures/enceladus',
      'public/textures/mimas',
      'public/textures/iapetus',
      // Uranus moons
      'public/textures/titania',
      'public/textures/oberon',
      'public/textures/ariel',
      'public/textures/umbriel',
      'public/textures/miranda',
      // Neptune moons
      'public/textures/triton'
    ],
    priority_downloads: [
      {
        planet: 'earth',
        texture: 'NASA Blue Marble',
        source: 'https://visibleearth.nasa.gov/images/57752/blue-marble-land-surface-shallow-water-and-shaded-topography',
        filename: '2k_earth_blue_marble.jpg',
        description: 'Primary Earth surface texture'
      },
      {
        planet: 'earth',
        texture: 'NASA Blue Marble Clouds',
        source: 'https://visibleearth.nasa.gov/images/57747/blue-marble-clouds',
        filename: '2k_earth_clouds.png',
        description: 'Earth cloud layer for realistic visualization'
      },
      {
        planet: 'io',
        texture: 'Io Volcanic Surface',
        source: 'https://www.jpl.nasa.gov/spaceimages/details.php?id=PIA00703',
        filename: '2k_io_volcanic.jpg',
        description: 'Io volcanic surface from Galileo mission'
      },
      {
        planet: 'europa',
        texture: 'Europa Ice Surface',
        source: 'https://www.jpl.nasa.gov/spaceimages/details.php?id=PIA19048',
        filename: '2k_europa_ice.jpg',
        description: 'Europa icy surface from Galileo mission'
      },
      {
        planet: 'titan',
        texture: 'Titan Surface',
        source: 'https://www.jpl.nasa.gov/spaceimages/details.php?id=PIA20016',
        filename: '2k_titan_surface.jpg',
        description: 'Titan surface from Cassini mission'
      }
    ],
    moon_count: {
      earth: 1,
      mars: 2,
      jupiter: 4, // Major Galilean moons
      saturn: 4, // Major moons
      uranus: 5, // Major moons
      neptune: 1,
      total: 17
    }
  };
}