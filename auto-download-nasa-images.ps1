# Automated NASA Image Download Helper
# This script will open all the direct download URLs in your browser

Write-Host "NASA Image Auto-Download Helper" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Create the directory structure
Write-Host "Creating directory..." -ForegroundColor Green
New-Item -ItemType Directory -Path "public\textures\backgrounds" -Force | Out-Null
Write-Host "✓ Created: public\textures\backgrounds\" -ForegroundColor Green
Write-Host ""

Write-Host "Opening NASA image download pages..." -ForegroundColor Yellow
Write-Host "Right-click each image and 'Save Image As...' to the backgrounds folder" -ForegroundColor White
Write-Host ""

# Array of image URLs with their save names
$images = @(
    @{
        name = "Milky Way (ESA Gaia)"
        url = "https://sci.esa.int/web/gaia/-/60198-gaia-s-all-sky-view-of-our-milky-way-galaxy-and-neighbouring-galaxies"
        filename = "milky_way_gaia.jpg"
    },
    @{
        name = "Orion Nebula (Hubble)"
        url = "https://hubblesite.org/contents/media/images/2006/01/1826-Image.html"
        filename = "orion_nebula_hubble.jpg"
    },
    @{
        name = "Eagle Nebula - Pillars of Creation"
        url = "https://hubblesite.org/contents/media/images/2015/01/3471-Image.html"
        filename = "eagle_nebula_hubble.jpg"
    },
    @{
        name = "Hubble Ultra Deep Field"
        url = "https://hubblesite.org/contents/media/images/2004/07/1471-Image.html"
        filename = "hubble_deep_field.jpg"
    },
    @{
        name = "Andromeda Galaxy"
        url = "https://hubblesite.org/contents/media/images/2015/02/3474-Image.html"
        filename = "andromeda_galaxy.jpg"
    }
)

# Open each URL with a delay
foreach ($image in $images) {
    Write-Host "Opening: $($image.name)" -ForegroundColor Magenta
    Write-Host "   Save as: $($image.filename)" -ForegroundColor Gray
    
    Start-Process $image.url
    
    # Wait 2 seconds between opening each URL to avoid overwhelming the browser
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "All pages opened! For each page:" -ForegroundColor Green
Write-Host "1. Find the highest resolution image" -ForegroundColor White
Write-Host "2. Right-click and 'Save Image As...'" -ForegroundColor White
Write-Host "3. Navigate to: public\textures\backgrounds\" -ForegroundColor White
Write-Host "4. Use the exact filename shown above" -ForegroundColor White
Write-Host ""

Write-Host "Quick Download Tips:" -ForegroundColor Cyan
Write-Host "• Look for 'Download' or 'Full Resolution' links" -ForegroundColor White
Write-Host "• Choose JPEG format when available" -ForegroundColor White
Write-Host "• Largest size available (1920x1080 or higher)" -ForegroundColor White
Write-Host ""

Write-Host "Expected files in public\textures\backgrounds\:" -ForegroundColor Yellow
foreach ($image in $images) {
    Write-Host "   ✓ $($image.filename)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Once downloaded, your star field will show real NASA imagery!" -ForegroundColor Magenta

Read-Host "Press Enter to continue..."