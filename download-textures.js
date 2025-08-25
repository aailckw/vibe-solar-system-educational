const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * NASA Texture Download Helper
 * Opens browser tabs with NASA image download pages for each planetary body
 */

const { exec } = require('child_process');

// NASA Visible Earth search URLs for planetary textures
const NASA_TEXTURE_URLS = [
  // Earth with cloud layer
  'https://visibleearth.nasa.gov/images/57752/blue-marble-land-surface-shallow-water-and-shaded-topography',
  'https://visibleearth.nasa.gov/images/57747/blue-marble-clouds',
  
  // Other planets
  'https://visibleearth.nasa.gov/search.html?q=mercury',
  'https://visibleearth.nasa.gov/search.html?q=venus',
  'https://visibleearth.nasa.gov/search.html?q=mars',
  'https://visibleearth.nasa.gov/search.html?q=jupiter',
  'https://visibleearth.nasa.gov/search.html?q=saturn',
  'https://visibleearth.nasa.gov/search.html?q=uranus',
  'https://visibleearth.nasa.gov/search.html?q=neptune',
  
  // Moons
  'https://visibleearth.nasa.gov/search.html?q=moon',
  'https://photojournal.jpl.nasa.gov/search/Moons',
  
  // Additional resources
  'https://solarsystem.nasa.gov/moons/earths-moon/overview/',
  'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
  'https://photojournal.jpl.nasa.gov/',
];

// Open URLs in default browser (cross-platform)
function openUrls() {
  console.log('Opening NASA texture download pages...\n');
  
  NASA_TEXTURE_URLS.forEach((url, index) => {
    setTimeout(() => {
      console.log(`Opening: ${url}`);
      
      // Cross-platform URL opening
      let command;
      if (process.platform === 'win32') {
        command = `start "" "${url}"`;
      } else if (process.platform === 'darwin') {
        command = `open "${url}"`;
      } else {
        command = `xdg-open "${url}"`;
      }
      
      exec(command, (error) => {
        if (error) {
          console.error(`Error opening ${url}:`, error.message);
        }
      });
    }, index * 1000); // Stagger openings by 1 second
  });
  
  console.log('\nNASA texture download pages will open in your browser.');
  console.log('Please download the highest resolution imagery available for each planetary body.');
  console.log('\nSpecial note for Earth:');
  console.log('- Download the Blue Marble surface texture');
  console.log('- Download the separate cloud layer for realistic visualization');
  console.log('- Save files as earth.jpg and earth-clouds.png respectively');
}

// Run the script
openUrls();

// Texture sources from reliable space agencies and texture repositories
const textureUrls = {
  // NASA Blue Marble Earth (8K resolution)
  'earth/earth.jpg': 'https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg',
  
  // Earth night lights
  'earth/earth-night.jpg': 'https://eoimages.gsfc.nasa.gov/images/imagerecords/144000/144898/dnb_land_ocean_ice.2012.54000x27000_geo.jpg',
  
  // Earth clouds (smaller resolution for performance)
  'earth/earth-clouds.jpg': 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57752/cloud_combined_2048.jpg',
  
  // Moon texture from NASA
  'moon/moon.jpg': 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_1k.jpg',
  
  // Mars texture from NASA
  'mars/mars.jpg': 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg',
  
  // Venus surface
  'venus/venus.jpg': 'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg',
  
  // Mercury
  'mercury/mercury.jpg': 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg',
  
  // Jupiter
  'jupiter/jupiter.jpg': 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg',
  
  // Jupiter rings
  'jupiter/jupiter-rings.png': 'https://photojournal.jpl.nasa.gov/jpeg/PIA01622.jpg',
  
  // Saturn
  'saturn/saturn.jpg': 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg',
  
  // Saturn rings
  'saturn/saturn-rings.png': 'https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png',
  
  // Uranus
  'uranus/uranus.jpg': 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg',
  
  // Neptune
  'neptune/neptune.jpg': 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg',
  
  // Sun
  'sun/sun.jpg': 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg'
};

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAllTextures() {
  console.log('🚀 Starting texture downloads...\n');
  
  const textureDir = path.join(__dirname, 'public', 'textures');
  
  for (const [relativePath, url] of Object.entries(textureUrls)) {
    const fullPath = path.join(textureDir, relativePath);
    
    try {
      console.log(`⬇️  Downloading ${relativePath}...`);
      await downloadFile(url, fullPath);
      
      // Add a small delay to be respectful to servers
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Failed to download ${relativePath}:`, error.message);
    }
  }
  
  console.log('\n🎉 Download process completed!');
  console.log('📁 Textures saved to: public/textures/');
  console.log('\n💡 Next steps:');
  console.log('1. Run your development server: npm run dev');
  console.log('2. Open the solar system simulation');
  console.log('3. Enjoy the enhanced textures!');
}

downloadAllTextures().catch(console.error);