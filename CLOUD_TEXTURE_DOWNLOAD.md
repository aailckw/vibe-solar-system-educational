# NASA Blue Marble Cloud Texture Download Guide

This guide explains how to download and use real NASA Blue Marble cloud data for the Earth visualization in the solar system simulation.

## About NASA Blue Marble Cloud Data

The NASA Blue Marble cloud layer is a high-resolution visualization of Earth's cloud cover based on MODIS satellite observations. This data provides realistic cloud patterns that enhance the educational value of the Earth visualization.

## Download Instructions

1. Visit the NASA Visible Earth website:
   - Main page: https://visibleearth.nasa.gov/
   - Cloud data: https://visibleearth.nasa.gov/images/57747/blue-marble-clouds

2. Download the cloud layer image:
   - Resolution: 21600x10800 pixels (highest available)
   - Format: PNG or JPEG
   - File size: ~50-100MB depending on format

3. Save the file as `earth-clouds.png` in the `public/textures/earth/` directory

## Texture Processing

For optimal performance in the 3D simulation:

1. Resize the image to 2048x1024 pixels or 4096x2048 pixels
2. Convert to PNG format with transparency
3. Ensure the image uses an alpha channel for cloud transparency

## Implementation Details

The cloud layer is implemented as a separate sphere slightly larger than the Earth's surface, with:
- Transparent material to show cloud coverage
- Subtle emissive properties for realistic cloud glow
- Independent rotation slightly faster than Earth's surface
- Alpha testing for performance optimization

## Scientific Accuracy

The cloud data represents:
- Average cloud cover patterns from multiple satellite observations
- Seasonal variations (monthly composites available)
- Realistic cloud opacity and coverage distribution
- Scientifically accurate cloud movement relative to Earth's rotation

## Usage Notes

- The cloud layer enhances educational value by showing realistic atmospheric conditions
- Cloud rotation is slightly faster than Earth's surface to simulate real atmospheric dynamics
- The implementation uses Three.js best practices for transparent materials and performance