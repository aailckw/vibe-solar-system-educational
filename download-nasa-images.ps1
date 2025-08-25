# NASA Image Download Helper
# Opens browser tabs with NASA image download pages for planetary textures

# Define URLs for NASA image searches
$urls = @(
    # Earth with cloud layer
    "https://visibleearth.nasa.gov/images/57752/blue-marble-land-surface-shallow-water-and-shaded-topography"
    "https://visibleearth.nasa.gov/images/57747/blue-marble-clouds"
    
    # Other planets
    "https://visibleearth.nasa.gov/search.html?q=mercury"
    "https://visibleearth.nasa.gov/search.html?q=venus"
    "https://visibleearth.nasa.gov/search.html?q=mars"
    "https://visibleearth.nasa.gov/search.html?q=jupiter"
    "https://visibleearth.nasa.gov/search.html?q=saturn"
    "https://visibleearth.nasa.gov/search.html?q=uranus"
    "https://visibleearth.nasa.gov/search.html?q=neptune"
    
    # Moons
    "https://visibleearth.nasa.gov/search.html?q=moon"
    "https://photojournal.jpl.nasa.gov/search/Moons"
    
    # Additional resources
    "https://solarsystem.nasa.gov/moons/earths-moon/overview/"
    "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"
    "https://photojournal.jpl.nasa.gov/"
)

Write-Host "Opening NASA image download pages..." -ForegroundColor Green
Write-Host ""

# Open each URL in the default browser
foreach ($url in $urls) {
    Write-Host "Opening: $url" -ForegroundColor Yellow
    Start-Process $url
    Start-Sleep -Seconds 1
}

Write-Host ""
Write-Host "NASA image download pages have been opened in your browser." -ForegroundColor Green
Write-Host "Please download the highest resolution imagery available for each planetary body." -ForegroundColor Cyan
Write-Host ""
Write-Host "Special note for Earth:" -ForegroundColor Magenta
Write-Host "- Download the Blue Marble surface texture" -ForegroundColor White
Write-Host "- Download the separate cloud layer for realistic visualization" -ForegroundColor White
Write-Host "- Save files as earth.jpg and earth-clouds.png respectively" -ForegroundColor White

# Create the backgrounds directory if it doesn't exist
New-Item -ItemType Directory -Path "public\textures\backgrounds" -Force

Write-Host "🌌 NASA Star Field Image Downloader" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Creating directory structure..." -ForegroundColor Green
Write-Host "✓ Directory created: public\textures\backgrounds" -ForegroundColor Green
Write-Host ""

Write-Host "📥 Download these images manually:" -ForegroundColor Yellow
Write-Host ""

Write-Host "1. Milky Way (ESA Gaia)" -ForegroundColor White
Write-Host "   URL: https://sci.esa.int/web/gaia/-/60198-gaia-s-all-sky-view-of-our-milky-way-galaxy-and-neighbouring-galaxies" -ForegroundColor Gray
Write-Host "   Save as: milky_way_gaia.jpg" -ForegroundColor Green
Write-Host ""

Write-Host "2. Orion Nebula (Hubble)" -ForegroundColor White  
Write-Host "   URL: https://hubblesite.org/contents/media/images/2006/01/1826-Image.html" -ForegroundColor Gray
Write-Host "   Save as: orion_nebula_hubble.jpg" -ForegroundColor Green
Write-Host ""

Write-Host "3. Eagle Nebula - Pillars of Creation" -ForegroundColor White
Write-Host "   URL: https://hubblesite.org/contents/media/images/2015/01/3471-Image.html" -ForegroundColor Gray
Write-Host "   Save as: eagle_nebula_hubble.jpg" -ForegroundColor Green
Write-Host ""

Write-Host "4. Hubble Ultra Deep Field" -ForegroundColor White
Write-Host "   URL: https://hubblesite.org/contents/media/images/2004/07/1471-Image.html" -ForegroundColor Gray
Write-Host "   Save as: hubble_deep_field.jpg" -ForegroundColor Green
Write-Host ""

Write-Host "5. Andromeda Galaxy" -ForegroundColor White
Write-Host "   URL: https://hubblesite.org/contents/media/images/2015/02/3474-Image.html" -ForegroundColor Gray
Write-Host "   Save as: andromeda_galaxy.jpg" -ForegroundColor Green
Write-Host ""

Write-Host "💡 Quick Tips:" -ForegroundColor Cyan
Write-Host "• Right-click on images and 'Save Image As...'" -ForegroundColor White
Write-Host "• Choose the highest resolution available" -ForegroundColor White
Write-Host "• Save all images to: public\textures\backgrounds\" -ForegroundColor White
Write-Host "• JPEG format is preferred for web performance" -ForegroundColor White
Write-Host ""

Write-Host "🚀 Alternative: NASA Image API" -ForegroundColor Magenta
Write-Host "Visit: https://images.nasa.gov/" -ForegroundColor Gray
Write-Host "Search for: 'Milky Way', 'Orion Nebula', 'Hubble Deep Field'" -ForegroundColor Gray
Write-Host ""

Write-Host "✨ Once downloaded, your star field will show:" -ForegroundColor Green
Write-Host "• Real Milky Way background panorama" -ForegroundColor White
Write-Host "• Actual Hubble telescope nebula images" -ForegroundColor White  
Write-Host "• Deep space galaxies and star clusters" -ForegroundColor White
Write-Host "• Scientifically accurate stellar positions" -ForegroundColor White
Write-Host ""

Write-Host "📂 Expected file structure:" -ForegroundColor Yellow
Write-Host "public/" -ForegroundColor Gray
Write-Host "└── textures/" -ForegroundColor Gray
Write-Host "    └── backgrounds/" -ForegroundColor Gray
Write-Host "        ├── milky_way_gaia.jpg" -ForegroundColor Green
Write-Host "        ├── orion_nebula_hubble.jpg" -ForegroundColor Green
Write-Host "        ├── eagle_nebula_hubble.jpg" -ForegroundColor Green
Write-Host "        ├── hubble_deep_field.jpg" -ForegroundColor Green
Write-Host "        └── andromeda_galaxy.jpg" -ForegroundColor Green
Write-Host ""

Write-Host "🔍 The system will automatically:" -ForegroundColor Cyan
Write-Host "• Try to load real NASA images first" -ForegroundColor White
Write-Host "• Fall back to procedural generation if missing" -ForegroundColor White
Write-Host "• Show console messages about loading status" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter to open the first NASA image URL in your browser..."

# Open the first URL to get started
Start-Process "https://sci.esa.int/web/gaia/-/60198-gaia-s-all-sky-view-of-our-milky-way-galaxy-and-neighbouring-galaxies"