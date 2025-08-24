/**
 * Star Catalog Data
 * Based on the Hipparcos Catalog and Bright Star Catalog
 * Contains real star positions, magnitudes, and colors
 */

export interface StarData {
  id: number;
  name?: string;
  ra: number;        // Right Ascension in degrees (0-360)
  dec: number;       // Declination in degrees (-90 to +90)
  magnitude: number; // Apparent magnitude (lower = brighter)
  spectralClass: string; // Spectral classification (O, B, A, F, G, K, M)
  distance?: number; // Distance in parsecs
}

// Convert RA/Dec to Cartesian coordinates on a sphere
export function raDecToCartesian(ra: number, dec: number, radius: number = 1000): [number, number, number] {
  const raRad = (ra * Math.PI) / 180;
  const decRad = (dec * Math.PI) / 180;
  
  const x = radius * Math.cos(decRad) * Math.cos(raRad);
  const y = radius * Math.sin(decRad);
  const z = radius * Math.cos(decRad) * Math.sin(raRad);
  
  return [x, y, z];
}

// Get star color based on spectral class
export function getStarColor(spectralClass: string): string {
  const cls = spectralClass.charAt(0).toUpperCase();
  switch (cls) {
    case 'O': return '#9bb0ff'; // Blue
    case 'B': return '#aabfff'; // Blue-white
    case 'A': return '#cad7ff'; // White
    case 'F': return '#f8f7ff'; // Yellow-white
    case 'G': return '#fff4ea'; // Yellow (like our Sun)
    case 'K': return '#ffd2a1'; // Orange
    case 'M': return '#ffad51'; // Red
    default: return '#ffffff'; // Default white
  }
}

// Get star size based on magnitude (brighter stars = larger)
export function getStarSize(magnitude: number): number {
  // Visible magnitude range typically -1.5 to +6
  // Size range 0.5 to 3.0
  const size = Math.max(0.5, Math.min(3.0, 3.0 - (magnitude + 1.5) * 0.6));
  return size;
}

// Brightest and most notable stars visible from Earth
export const brightStars: StarData[] = [
  // Sirius (brightest star)
  { id: 1, name: 'Sirius', ra: 101.287, dec: -16.716, magnitude: -1.46, spectralClass: 'A1V', distance: 2.64 },
  
  // Canopus
  { id: 2, name: 'Canopus', ra: 95.988, dec: -52.696, magnitude: -0.74, spectralClass: 'A9II', distance: 95 },
  
  // Arcturus
  { id: 3, name: 'Arcturus', ra: 213.915, dec: 19.182, magnitude: -0.05, spectralClass: 'K1.5III', distance: 11.3 },
  
  // Vega
  { id: 4, name: 'Vega', ra: 279.234, dec: 38.784, magnitude: 0.03, spectralClass: 'A0V', distance: 7.68 },
  
  // Capella
  { id: 5, name: 'Capella', ra: 79.172, dec: 45.998, magnitude: 0.08, spectralClass: 'G5III', distance: 12.9 },
  
  // Rigel
  { id: 6, name: 'Rigel', ra: 78.634, dec: -8.202, magnitude: 0.13, spectralClass: 'B8Iae', distance: 264 },
  
  // Procyon
  { id: 7, name: 'Procyon', ra: 114.825, dec: 5.225, magnitude: 0.34, spectralClass: 'F5IV', distance: 3.5 },
  
  // Betelgeuse
  { id: 8, name: 'Betelgeuse', ra: 88.793, dec: 7.407, magnitude: 0.50, spectralClass: 'M1Ia', distance: 168 },
  
  // Achernar
  { id: 9, name: 'Achernar', ra: 24.605, dec: -57.237, magnitude: 0.46, spectralClass: 'B6Vpe', distance: 44.1 },
  
  // Hadar (Beta Centauri)
  { id: 10, name: 'Hadar', ra: 210.956, dec: -60.374, magnitude: 0.61, spectralClass: 'B1III', distance: 161 },
  
  // Altair
  { id: 11, name: 'Altair', ra: 297.696, dec: 8.868, magnitude: 0.77, spectralClass: 'A7V', distance: 5.13 },
  
  // Aldebaran
  { id: 12, name: 'Aldebaran', ra: 68.980, dec: 16.509, magnitude: 0.85, spectralClass: 'K5III', distance: 20.0 },
  
  // Antares
  { id: 13, name: 'Antares', ra: 247.352, dec: -26.432, magnitude: 1.09, spectralClass: 'M1.5Iab', distance: 170 },
  
  // Spica
  { id: 14, name: 'Spica', ra: 201.298, dec: -11.161, magnitude: 1.04, spectralClass: 'B1III', distance: 77 },
  
  // Pollux
  { id: 15, name: 'Pollux', ra: 116.329, dec: 28.026, magnitude: 1.14, spectralClass: 'K0III', distance: 10.3 },
  
  // Fomalhaut
  { id: 16, name: 'Fomalhaut', ra: 344.413, dec: -29.622, magnitude: 1.16, spectralClass: 'A3V', distance: 7.7 },
  
  // Deneb
  { id: 17, name: 'Deneb', ra: 310.358, dec: 45.280, magnitude: 1.25, spectralClass: 'A2Ia', distance: 802 },
  
  // Regulus
  { id: 18, name: 'Regulus', ra: 152.093, dec: 11.967, magnitude: 1.35, spectralClass: 'B7V', distance: 24.3 },
  
  // Castor
  { id: 19, name: 'Castor', ra: 113.649, dec: 31.888, magnitude: 1.57, spectralClass: 'A1V', distance: 15.6 },
  
  // Bellatrix
  { id: 20, name: 'Bellatrix', ra: 81.283, dec: 6.350, magnitude: 1.64, spectralClass: 'B2III', distance: 74.2 },
];

// Generate additional fainter stars in a realistic distribution
export function generateRandomStars(count: number = 3000): StarData[] {
  const stars: StarData[] = [];
  
  for (let i = 0; i < count; i++) {
    // Random position on celestial sphere
    const ra = Math.random() * 360;
    const dec = (Math.random() - 0.5) * 180;
    
    // Magnitude distribution weighted toward fainter stars
    const magnitude = 2.0 + Math.random() * 4.0; // mag 2-6
    
    // Spectral class distribution (realistic)
    const spectralRandom = Math.random();
    let spectralClass: string;
    if (spectralRandom < 0.76) spectralClass = 'M'; // 76% M-class
    else if (spectralRandom < 0.88) spectralClass = 'K'; // 12% K-class
    else if (spectralRandom < 0.96) spectralClass = 'G'; // 8% G-class
    else if (spectralRandom < 0.99) spectralClass = 'F'; // 3% F-class
    else if (spectralRandom < 0.995) spectralClass = 'A'; // 0.5% A-class
    else if (spectralRandom < 0.999) spectralClass = 'B'; // 0.4% B-class
    else spectralClass = 'O'; // 0.1% O-class
    
    stars.push({
      id: 1000 + i,
      ra,
      dec,
      magnitude,
      spectralClass,
    });
  }
  
  return stars;
}

// Combine bright stars with generated fainter stars
export function getStarCatalog(): StarData[] {
  const faintStars = generateRandomStars(3000);
  return [...brightStars, ...faintStars];
}

// Notable deep space objects for background
export interface DeepSpaceObject {
  id: string;
  name: string;
  type: 'nebula' | 'galaxy' | 'cluster';
  ra: number;
  dec: number;
  size: number; // Angular size in degrees
  brightness: number; // Relative brightness 0-1
  color: string;
}

export const deepSpaceObjects: DeepSpaceObject[] = [
  {
    id: 'orion_nebula',
    name: 'Orion Nebula',
    type: 'nebula',
    ra: 83.822, 
    dec: -5.391,
    size: 1.0,
    brightness: 0.8,
    color: '#ff6b6b'
  },
  {
    id: 'andromeda_galaxy',
    name: 'Andromeda Galaxy',
    type: 'galaxy',
    ra: 10.685,
    dec: 41.269,
    size: 3.0,
    brightness: 0.6,
    color: '#f8f8ff'
  },
  {
    id: 'pleiades',
    name: 'Pleiades',
    type: 'cluster',
    ra: 56.75,
    dec: 24.117,
    size: 2.0,
    brightness: 0.7,
    color: '#87ceeb'
  },
  {
    id: 'rosette_nebula',
    name: 'Rosette Nebula',
    type: 'nebula',
    ra: 97.5,
    dec: 4.0,
    size: 1.3,
    brightness: 0.5,
    color: '#ff69b4'
  }
];