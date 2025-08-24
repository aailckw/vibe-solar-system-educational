@echo off
echo 🌌 NASA Image Download Helper
echo =============================
echo.
echo This will open all NASA image pages in your browser
echo You can then easily download them with right-click + Save As
echo.
pause

powershell -ExecutionPolicy Bypass -File "auto-download-nasa-images.ps1"

echo.
echo 🎉 Done! Check your browser for the opened NASA image pages
echo Save each image to: public\textures\backgrounds\
pause