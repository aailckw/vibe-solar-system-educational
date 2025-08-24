const https = require('https');
const fs = require('fs');
const path = require('path');

// Alternative texture sources
const additionalTextures = {
  // Earth clouds from a different source
  'earth/earth-clouds.jpg': 'https://raw.githubusercontent.com/turbo/js/main/examples/assets/earth_clouds_1024.jpg',
  
  // Earth normal map for surface detail
  'earth/earth-normal.jpg': 'https://raw.githubusercontent.com/turbo/js/main/examples/assets/earth_normal_2048.jpg',
  
  // Moon normal map
  'moon/moon-normal.jpg': 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_1k.jpg',
  
  // Mars normal map (alternative source)
  'mars/mars-normal.jpg': 'https://planetpixelemporium.com/download/download.php?earthmap1k.jpg'
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
        downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        console.log(`⚠️  Skipping ${path.basename(filepath)}: ${response.statusCode}`);
        resolve(); // Don't fail the whole process for optional textures
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        console.log(`⚠️  Skipping ${path.basename(filepath)}: ${err.message}`);
        resolve();
      });
    }).on('error', (err) => {
      console.log(`⚠️  Skipping ${path.basename(filepath)}: ${err.message}`);
      resolve();
    });
  });
}

async function downloadAdditionalTextures() {
  console.log('🌍 Downloading additional Earth textures and normal maps...\n');
  
  const textureDir = path.join(__dirname, 'public', 'textures');
  
  for (const [relativePath, url] of Object.entries(additionalTextures)) {
    const fullPath = path.join(textureDir, relativePath);
    
    console.log(`⬇️  Downloading ${relativePath}...`);
    await downloadFile(url, fullPath);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✨ Additional texture downloads completed!');
}

downloadAdditionalTextures().catch(console.error);