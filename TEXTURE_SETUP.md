# Texture Setup Guide

This guide explains how to set up and manage textures for the solar system simulation, including downloading NASA imagery and organizing files properly.

## Directory Structure

The texture system uses a hierarchical directory structure:

```
public/
  textures/
    sun/
    mercury/
    venus/
    earth/
    mars/
    jupiter/
    saturn/
    uranus/
    neptune/
    moon/
    phobos/
    deimos/
    io/
    europa/
    ganymede/
    callisto/
    titan/
    enceladus/
    mimas/
    iapetus/
    titania/
    oberon/
    ariel/
    umbriel/
    miranda/
    triton/
```

## Downloading NASA Textures

### Automated Download Scripts

The project includes several scripts to help automate texture downloads:

1. `download-nasa-images.ps1` - PowerShell script for Windows
2. `download-nasa-images.bat` - Batch script for Windows
3. `download-textures.js` - Node.js script for cross-platform use

Run any of these scripts to open NASA image download pages in your browser.

### Manual Download Process

1. Visit NASA's Visible Earth: https://visibleearth.nasa.gov/
2. Search for planetary body names (e.g., "Earth", "Mars", "Jupiter")
3. Download the highest resolution imagery available
4. Save images in the appropriate directory with the naming convention:
   - Surface texture: `{planet}.jpg`
   - Cloud texture (Earth only): `{planet}-clouds.png`
   - Normal map: `{planet}-normal.jpg`
   - Ring texture (Saturn only): `{planet}-rings.png`

## Texture Requirements

### Resolution Guidelines

- Major planets: 2048x1024 or higher
- Moons: 1024x512 or higher
- Rings: 2048x2048 square format

### File Formats

- JPEG for color textures (baseline compression)
- PNG for textures requiring transparency (clouds, rings)
- Avoid progressive JPEG formats

### Naming Conventions

```
{planet}.jpg          # Main surface texture
{planet}-clouds.png   # Cloud layer (Earth only)
{planet}-normal.jpg   # Normal/displacement map
{planet}-rings.png    # Ring system texture (Saturn only)
```

## Earth-Specific Textures

### Blue Marble Surface

NASA's Blue Marble dataset provides the most accurate Earth visualization:
- URL: https://visibleearth.nasa.gov/collection/1484/blue-marble
- Resolution: 21600x10800 pixels
- Format: JPEG

### Cloud Layer

The cloud layer enhances realism with dynamic atmospheric effects:
- URL: https://visibleearth.nasa.gov/images/57747/blue-marble-clouds
- Resolution: 21600x10800 pixels
- Format: PNG with alpha channel
- File: `earth-clouds.png`

### Implementation Details

The Earth visualization combines:
1. Surface texture (land and ocean colors)
2. Cloud layer (transparency and atmospheric effects)
3. Subtle atmospheric glow for enhanced realism

## Texture Optimization

### Performance Considerations

1. Use appropriate resolutions for target hardware
2. Compress textures without significant quality loss
3. Enable texture compression in Three.js
4. Implement texture streaming for large datasets

### Fallback System

The system includes color fallbacks for missing textures:
- Each planetary body has a scientifically accurate base color
- Fallback materials maintain educational value without imagery
- Error handling prevents crashes from missing files

## Troubleshooting

### Common Issues

1. **Missing Textures**
   - Check file paths and naming conventions
   - Verify file formats are supported
   - Ensure files are not corrupted

2. **Loading Errors**
   - Check browser console for specific error messages
   - Verify file permissions
   - Confirm file sizes are reasonable

3. **Performance Problems**
   - Reduce texture resolutions
   - Enable texture compression
   - Implement level-of-detail (LOD) systems

### Testing Textures

1. Verify textures load in the browser
2. Check for visual artifacts or distortions
3. Confirm fallback colors display correctly
4. Test on target hardware configurations

## Educational Value

The texture system enhances learning by providing:
- Realistic planetary appearances based on spacecraft imagery
- Scientifically accurate color representations
- Visual context for understanding planetary characteristics
- Connection to actual NASA mission data

## Credits and Licensing

All NASA imagery is in the public domain and may be used freely for educational purposes. When redistributing or publishing:
- Credit NASA and the specific mission
- Follow NASA's media usage guidelines
- Include appropriate attribution in documentation

For more information, visit:
- NASA Visible Earth: https://visibleearth.nasa.gov/
- NASA Image and Video Library: https://images.nasa.gov/
- JPL Photojournal: https://photojournal.jpl.nasa.gov/