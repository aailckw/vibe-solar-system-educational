@echo off
echo Opening NASA image download pages...
echo.

REM Earth with cloud layer
start "" "https://visibleearth.nasa.gov/images/57752/blue-marble-land-surface-shallow-water-and-shaded-topography"
timeout /t 1 /nobreak >nul
start "" "https://visibleearth.nasa.gov/images/57747/blue-marble-clouds"
timeout /t 1 /nobreak >nul

REM Other planets
start "" "https://visibleearth.nasa.gov/search.html?q=mercury"
timeout /t 1 /nobreak >nul
start "" "https://visibleearth.nasa.gov/search.html?q=venus"
timeout /t 1 /nobreak >nul
start "" "https://visibleearth.nasa.gov/search.html?q=mars"
timeout /t 1 /nobreak >nul
start "" "https://visibleearth.nasa.gov/search.html?q=jupiter"
timeout /t 1 /nobreak >nul
start "" "https://visibleearth.nasa.gov/search.html?q=saturn"
timeout /t 1 /nobreak >nul
start "" "https://visibleearth.nasa.gov/search.html?q=uranus"
timeout /t 1 /nobreak >nul
start "" "https://visibleearth.nasa.gov/search.html?q=neptune"
timeout /t 1 /nobreak >nul

REM Moons
start "" "https://visibleearth.nasa.gov/search.html?q=moon"
timeout /t 1 /nobreak >nul
start "" "https://photojournal.jpl.nasa.gov/search/Moons"
timeout /t 1 /nobreak >nul

REM Additional resources
start "" "https://solarsystem.nasa.gov/moons/earths-moon/overview/"
timeout /t 1 /nobreak >nul
start "" "https://nssdc.gsfc.nasa.gov/planetary/factsheet/"
timeout /t 1 /nobreak >nul
start "" "https://photojournal.jpl.nasa.gov/"

echo NASA image download pages have been opened in your browser.
echo Please download the highest resolution imagery available for each planetary body.
echo.
echo Special note for Earth:
echo - Download the Blue Marble surface texture
echo - Download the separate cloud layer for realistic visualization
echo - Save files as earth.jpg and earth-clouds.png respectively
echo.
pause