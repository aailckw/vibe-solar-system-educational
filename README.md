# Solar System Educational Simulation

An interactive 3D educational simulation of our solar system built with React, Next.js, and Three.js. This project provides an engaging way to explore planetary science with realistic visualizations and accurate astronomical data.

## 🌌 Features

### Realistic Solar System Visualization
- **Accurate 3D Models**: All planets, moons, and celestial bodies with scientifically accurate sizes and orbital characteristics
- **Real Textures**: High-resolution NASA imagery for realistic planetary surfaces
- **Dynamic Lighting**: Realistic sun lighting with enhanced visual effects
- **Planetary Rings**: Detailed ring systems for Saturn and Jupiter with accurate textures

### Interactive Exploration
- **Free Camera Mode**: Navigate through the solar system from any angle
- **Planet Focus**: Click on any planet to center the view and see detailed information
- **Time Controls**: Adjust simulation speed from real-time to accelerated modes
- **Scale Options**: Toggle between realistic scale and educational scale for better visualization

### Educational Content
- **Comprehensive Data**: Detailed information about each celestial body including physical properties, atmospheric composition, and historical facts
- **Scientific Accuracy**: Orbital periods, rotation speeds, and distances based on real astronomical data
- **Interactive Learning**: Engaging way to understand planetary science concepts

### Visual Enhancements
- **Cosmic Background**: Realistic star field with actual star catalog data
- **Asteroid Belt**: Visualization of the asteroid belt between Mars and Jupiter
- **Sun Effects**: Enhanced solar flares, lens flares, and atmospheric glow
- **Atmospheric Effects**: Realistic atmospheric rendering for gas giants

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aailckw/vibe-solar-system-educational.git
cd vibe-solar-system-educational
```

2. Install dependencies:
```bash
npm install
```

3. Download textures:
```bash
node download-textures.js
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run start
```

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14.2.5
- **3D Rendering**: Three.js 0.165.0 with React Three Fiber
- **UI Components**: React 18.3.1 with Tailwind CSS
- **Animations**: Framer Motion
- **Astronomical Calculations**: Astronomy Engine
- **Utilities**: React Three Drei, Three GPU Pathtracer

## 📚 Documentation

The project includes comprehensive documentation:
- **Texture Setup**: Instructions for downloading and setting up NASA imagery
- **Deployment Guide**: Steps for deploying to Vercel
- **Customization**: Guides for modifying visual effects and educational content
- **Technical Details**: Implementation details for advanced features

## 🌟 Key Components

### Planetary Visualization
- Realistic planet materials with proper lighting and reflections
- Scientifically accurate sizes, distances, and orbital periods
- Detailed moon systems for major planets

### Cosmic Environment
- Star field based on actual Hipparcos and Bright Star catalogs
- Milky Way background panorama
- Nebulae and deep space imagery
- Proper depth buffer handling for realistic rendering

### User Interface
- Intuitive control panel with time scaling options
- Information panels for each celestial body
- Responsive design for various screen sizes
- Loading screens with progress indicators

## 📈 Performance

The simulation is optimized for:
- Smooth 60fps rendering on modern hardware
- Efficient memory usage with texture streaming
- Adaptive quality settings for different devices
- Progressive loading of assets

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- NASA for providing the incredible imagery and data
- Three.js and React Three Fiber communities for the excellent 3D libraries
- Astronomy Engine for accurate celestial calculations
- All the open-source contributors who made this project possible

## 🚀 Deployment

This project is ready for deployment to Vercel with zero configuration. Simply connect your GitHub repository to Vercel and deploy!

For detailed deployment instructions, see [VERCEL_DEPLOYMENT_COMPLETE.md](VERCEL_DEPLOYMENT_COMPLETE.md).