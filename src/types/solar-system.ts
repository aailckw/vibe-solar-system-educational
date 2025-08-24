export interface PlanetaryBody {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'moon' | 'dwarf-planet' | 'asteroid';
  
  // Physical properties
  radius: number; // km
  mass: number; // kg
  density: number; // g/cm³
  gravity: number; // m/s²
  escapeVelocity: number; // km/s
  
  // Orbital properties
  distanceFromSun?: number; // AU
  orbitalPeriod?: number; // Earth days
  rotationPeriod: number; // hours
  axialTilt: number; // degrees
  eccentricity?: number;
  
  // Atmospheric properties
  atmosphere?: {
    composition: { [gas: string]: number }; // percentages
    pressure: number; // Earth atmospheres
    temperature: {
      min: number;
      max: number;
      average: number;
    }; // Celsius
  };
  
  // Educational content
  description: string;
  keyFacts: string[];
  discovery: {
    discoveredBy?: string;
    discoveryDate?: string;
    method?: string;
  };
  
  // Media placeholders
  images: string[];
  videoUrl?: string;
  
  // 3D properties
  texture: string;
  normalMap?: string;
  emissiveMap?: string;
  cloudMap?: string;
  
  // Children (moons, rings)
  moons?: PlanetaryBody[];
  hasRings?: boolean;
  
  // Educational level content
  funFacts: string[];
  comparisons: {
    earth?: string;
    otherBodies?: { [bodyId: string]: string };
  };
}

export interface SolarSystemData {
  bodies: PlanetaryBody[];
  lastUpdated: string;
}

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
  name: string;
  description: string;
}

export interface SimulationControls {
  timeScale: number;
  showOrbits: boolean;
  showLabels: boolean;
  scaleMode: 'realistic' | 'visible' | 'logarithmic';
  selectedBody: string | null;
  demoMode?: 'real-scale' | 'educational';
}

export interface NavigationState {
  target: string | null;
  isTransitioning: boolean;
  autoRotate: boolean;
  autoRotateSpeed?: number;
  cameraMode: 'free' | 'follow' | 'overview';
}