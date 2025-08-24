const https = require('https');
const fs = require('fs');
const path = require('path');

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