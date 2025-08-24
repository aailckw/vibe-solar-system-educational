import { SolarSystemData } from '@/types/solar-system';

export const solarSystemData: SolarSystemData = {
  lastUpdated: '2024-08-24',
  bodies: [
    {
      id: 'sun',
      name: 'The Sun',
      type: 'star',
      radius: 696340,
      mass: 1.989e30,
      density: 1.408,
      gravity: 274,
      escapeVelocity: 617.5,
      rotationPeriod: 609.12, // 25.38 days
      axialTilt: 7.25,
      atmosphere: {
        composition: {
          'Hydrogen': 73.46,
          'Helium': 24.85,
          'Oxygen': 0.77,
          'Carbon': 0.29,
          'Iron': 0.16,
          'Other': 0.47
        },
        pressure: 0,
        temperature: { min: 5505, max: 15000000, average: 5778 }
      },
      description: 'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.',
      keyFacts: [
        'Contains 99.86% of the Solar System\'s mass',
        'Surface temperature: ~5,778 K (5,505°C)',
        'Core temperature: ~15 million°C',
        'Produces energy through nuclear fusion',
        '4.6 billion years old'
      ],
      discovery: {
        discoveredBy: 'Known since prehistoric times',
        discoveryDate: 'Ancient',
        method: 'Direct observation'
      },
      images: ['/textures/sun/sun-surface.jpg', '/textures/sun/sun-corona.jpg'],
      videoUrl: 'PLACEHOLDER_SUN_VIDEO',
      texture: '/textures/sun.jpg',
      emissiveMap: '/textures/sun-emissive.jpg',
      funFacts: [
        'The Sun is so large that about 1.3 million Earths could fit inside it',
        'Light from the Sun takes about 8 minutes and 20 seconds to reach Earth',
        'The Sun generates enough energy every second to supply Earth\'s needs for 500,000 years',
        'The Sun\'s core is about 27 million degrees Fahrenheit (15 million Celsius)'
      ],
      comparisons: {
        earth: 'The Sun is 109 times wider than Earth and 333,000 times more massive'
      }
    },
    {
      id: 'mercury',
      name: 'Mercury',
      type: 'planet',
      radius: 2439.7,
      mass: 3.301e23,
      density: 5.427,
      gravity: 3.7,
      escapeVelocity: 4.25,
      distanceFromSun: 0.387,
      orbitalPeriod: 88,
      rotationPeriod: 1407.6, // 58.6 days
      axialTilt: 0.034,
      eccentricity: 0.205,
      atmosphere: {
        composition: {
          'Oxygen': 42,
          'Sodium': 29,
          'Hydrogen': 22,
          'Helium': 6,
          'Potassium': 0.5,
          'Other': 0.5
        },
        pressure: 0.000000001, // Extremely thin
        temperature: { min: -173, max: 427, average: 167 }
      },
      description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It has extreme temperature variations and no substantial atmosphere.',
      keyFacts: [
        'Closest planet to the Sun',
        'Smallest planet in the Solar System',
        'No atmosphere to retain heat',
        'Has a large iron core',
        'One day on Mercury lasts 176 Earth days'
      ],
      discovery: {
        discoveredBy: 'Known since ancient times',
        discoveryDate: 'Ancient',
        method: 'Naked eye observation'
      },
      images: ['/textures/mercury/surface.jpg', '/textures/mercury/craters.jpg'],
      videoUrl: 'PLACEHOLDER_MERCURY_VIDEO',
      texture: '/textures/mercury.jpg',
      normalMap: '/textures/mercury-normal.jpg',
      funFacts: [
        'Mercury is named after the Roman messenger god',
        'A year on Mercury is only 88 Earth days',
        'Mercury has no moons or rings',
        'It\'s the second densest planet after Earth'
      ],
      comparisons: {
        earth: 'Mercury is about 38% the size of Earth and has 38% of Earth\'s gravity'
      }
    },
    {
      id: 'venus',
      name: 'Venus',
      type: 'planet',
      radius: 6051.8,
      mass: 4.867e24,
      density: 5.243,
      gravity: 8.87,
      escapeVelocity: 10.36,
      distanceFromSun: 0.723,
      orbitalPeriod: 225,
      rotationPeriod: -5832.5, // Retrograde rotation
      axialTilt: 177.4,
      eccentricity: 0.007,
      atmosphere: {
        composition: {
          'Carbon Dioxide': 96.5,
          'Nitrogen': 3.5,
          'Sulfur Dioxide': 0.015,
          'Other': 0.005
        },
        pressure: 92, // 92 times Earth's pressure
        temperature: { min: 450, max: 470, average: 462 }
      },
      description: 'Venus is the second planet from the Sun and is Earth\'s closest planetary neighbor. It has a thick, toxic atmosphere and is the hottest planet in our solar system.',
      keyFacts: [
        'Hottest planet in the Solar System',
        'Thick, toxic atmosphere',
        'Rotates backwards (retrograde)',
        'Often called Earth\'s "twin" due to similar size',
        'Surface pressure 92 times that of Earth'
      ],
      discovery: {
        discoveredBy: 'Known since ancient times',
        discoveryDate: 'Ancient',
        method: 'Naked eye observation'
      },
      images: ['/textures/venus/surface.jpg', '/textures/venus/clouds.jpg'],
      videoUrl: 'PLACEHOLDER_VENUS_VIDEO',
      texture: '/textures/venus.jpg',
      cloudMap: '/textures/venus-clouds.jpg',
      funFacts: [
        'Venus is sometimes called Earth\'s "evil twin"',
        'A day on Venus is longer than its year',
        'Venus has no moons or rings',
        'It\'s the brightest planet in our sky'
      ],
      comparisons: {
        earth: 'Venus is 95% the size of Earth but has a surface hot enough to melt lead'
      }
    },
    {
      id: 'earth',
      name: 'Earth',
      type: 'planet',
      radius: 6371,
      mass: 5.972e24,
      density: 5.514,
      gravity: 9.807,
      escapeVelocity: 11.19,
      distanceFromSun: 1.0,
      orbitalPeriod: 365.25,
      rotationPeriod: 24,
      axialTilt: 23.44,
      eccentricity: 0.017,
      atmosphere: {
        composition: {
          'Nitrogen': 78.08,
          'Oxygen': 20.95,
          'Argon': 0.93,
          'Carbon Dioxide': 0.04,
          'Other': 0.003
        },
        pressure: 1,
        temperature: { min: -89, max: 58, average: 15 }
      },
      description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. It has liquid water on its surface and a protective atmosphere.',
      keyFacts: [
        'Only known planet with life',
        'Liquid water covers 71% of surface',
        'Has one natural satellite (the Moon)',
        'Protective magnetic field',
        'Diverse climate zones and ecosystems'
      ],
      discovery: {
        discoveredBy: 'Known since prehistoric times',
        discoveryDate: 'Ancient',
        method: 'Direct observation'
      },
      images: ['/textures/earth/blue-marble.jpg', '/textures/earth/night-lights.jpg'],
      videoUrl: 'PLACEHOLDER_EARTH_VIDEO',
      texture: '/textures/earth.jpg',
      normalMap: '/textures/earth-normal.jpg',
      cloudMap: '/textures/earth-clouds.jpg',
      funFacts: [
        'Earth is the only planet not named after a god',
        'A day is actually 23 hours, 56 minutes, and 4 seconds',
        'Earth\'s core is as hot as the Sun\'s surface',
        'The Moon is gradually moving away from Earth'
      ],
      comparisons: {
        earth: 'Earth is our home planet and serves as the reference for comparing other worlds'
      },
      moons: [
        {
          id: 'moon',
          name: 'The Moon',
          type: 'moon',
          radius: 1737.4,
          mass: 7.342e22,
          density: 3.344,
          gravity: 1.62,
          escapeVelocity: 2.38,
          distanceFromSun: 1.0,
          orbitalPeriod: 27.3,
          rotationPeriod: 655.7,
          axialTilt: 6.68,
          description: 'The Moon is Earth\'s only natural satellite and the fifth largest moon in the Solar System.',
          keyFacts: [
            'Fifth largest moon in the Solar System',
            'Tidally locked with Earth',
            'Influences Earth\'s tides',
            'Formed about 4.5 billion years ago',
            'No atmosphere or magnetic field'
          ],
          discovery: {
            discoveredBy: 'Known since prehistoric times',
            discoveryDate: 'Ancient',
            method: 'Direct observation'
          },
          images: ['/textures/moon/full-moon.jpg', '/textures/moon/lunar-surface.jpg'],
          videoUrl: 'PLACEHOLDER_MOON_VIDEO',
          texture: '/textures/moon.jpg',
          normalMap: '/textures/moon-normal.jpg',
          funFacts: [
            'The Moon is moving away from Earth at 3.8 cm per year',
            'Moon phases repeat every 29.5 days',
            'The Moon has moonquakes',
            'It would take 9 years to walk to the Moon'
          ],
          comparisons: {
            earth: 'The Moon is about 1/4 the size of Earth'
          }
        }
      ]
    },
    {
      id: 'mars',
      name: 'Mars',
      type: 'planet',
      radius: 3389.5,
      mass: 6.417e23,
      density: 3.933,
      gravity: 3.71,
      escapeVelocity: 5.03,
      distanceFromSun: 1.524,
      orbitalPeriod: 687,
      rotationPeriod: 24.6,
      axialTilt: 25.19,
      eccentricity: 0.094,
      atmosphere: {
        composition: {
          'Carbon Dioxide': 95.32,
          'Nitrogen': 2.7,
          'Argon': 1.6,
          'Oxygen': 0.13,
          'Other': 0.25
        },
        pressure: 0.006,
        temperature: { min: -143, max: 35, average: -65 }
      },
      description: 'Mars is the fourth planet from the Sun and is often called the "Red Planet" due to iron oxide on its surface.',
      keyFacts: [
        'Known as the "Red Planet"',
        'Has the largest volcano in the Solar System (Olympus Mons)',
        'Home to the largest canyon (Valles Marineris)',
        'Has polar ice caps',
        'Day length similar to Earth'
      ],
      discovery: {
        discoveredBy: 'Known since ancient times',
        discoveryDate: 'Ancient',
        method: 'Naked eye observation'
      },
      images: ['/textures/mars/surface.jpg', '/textures/mars/polar-caps.jpg'],
      videoUrl: 'PLACEHOLDER_MARS_VIDEO',
      texture: '/textures/mars.jpg',
      normalMap: '/textures/mars-normal.jpg',
      funFacts: [
        'Mars has the largest dust storms in the Solar System',
        'A day on Mars is 24 hours and 37 minutes',
        'Mars has two small moons: Phobos and Deimos',
        'The red color comes from iron oxide (rust)'
      ],
      comparisons: {
        earth: 'Mars is about half the size of Earth and has 38% of Earth\'s gravity'
      },
      moons: [
        {
          id: 'phobos',
          name: 'Phobos',
          type: 'moon',
          radius: 11.1,
          mass: 1.0659e16,
          density: 1.876,
          gravity: 0.0057,
          escapeVelocity: 0.0114,
          distanceFromSun: 1.524,
          orbitalPeriod: 0.32, // 7.6 hours
          rotationPeriod: 7.6,
          axialTilt: 0,
          description: 'Phobos is the larger and inner moon of Mars, orbiting closer to its planet than any other moon in the solar system.',
          keyFacts: [
            'Largest moon of Mars',
            'Orbits Mars in just 7.6 hours',
            'Gradually spiraling into Mars',
            'Potato-shaped and heavily cratered',
            'Named after Greek god of fear'
          ],
          discovery: {
            discoveredBy: 'Asaph Hall',
            discoveryDate: '1877',
            method: 'Telescope observation'
          },
          images: ['/textures/phobos/surface.jpg'],
          videoUrl: 'PLACEHOLDER_PHOBOS_VIDEO',
          texture: '/textures/phobos.jpg',
          funFacts: [
            'Phobos rises in the west and sets in the east',
            'Will crash into Mars in about 50 million years',
            'Surface covered in regolith several meters thick',
            'Largest crater Stickney is nearly half its diameter'
          ],
          comparisons: {
            earth: 'Phobos is about 22 km across, much smaller than Earth\'s Moon'
          }
        },
        {
          id: 'deimos',
          name: 'Deimos',
          type: 'moon',
          radius: 6.2,
          mass: 1.4762e15,
          density: 1.471,
          gravity: 0.003,
          escapeVelocity: 0.0056,
          distanceFromSun: 1.524,
          orbitalPeriod: 1.26, // 30.3 hours
          rotationPeriod: 30.3,
          axialTilt: 0,
          description: 'Deimos is the smaller and outer moon of Mars, with a more distant and stable orbit.',
          keyFacts: [
            'Smaller moon of Mars',
            'Orbits Mars in 30.3 hours',
            'More distant from Mars than Phobos',
            'Smoother surface than Phobos',
            'Named after Greek god of dread'
          ],
          discovery: {
            discoveredBy: 'Asaph Hall',
            discoveryDate: '1877',
            method: 'Telescope observation'
          },
          images: ['/textures/deimos/surface.jpg'],
          videoUrl: 'PLACEHOLDER_DEIMOS_VIDEO',
          texture: '/textures/deimos.jpg',
          funFacts: [
            'Deimos appears as a bright star from Mars surface',
            'Takes 2.7 Martian days to cross the sky',
            'May be a captured asteroid',
            'Surface gravity is 1/2500th of Earth\'s'
          ],
          comparisons: {
            earth: 'Deimos is only about 12 km across'
          }
        }
      ]
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      type: 'planet',
      radius: 69911,
      mass: 1.898e27,
      density: 1.326,
      gravity: 24.79,
      escapeVelocity: 59.5,
      distanceFromSun: 5.204,
      orbitalPeriod: 4333,
      rotationPeriod: 9.9,
      axialTilt: 3.13,
      eccentricity: 0.049,
      atmosphere: {
        composition: {
          'Hydrogen': 89.8,
          'Helium': 10.2,
          'Methane': 0.3,
          'Ammonia': 0.026,
          'Other': 0.003
        },
        pressure: 1000,
        temperature: { min: -145, max: -110, average: -110 }
      },
      description: 'Jupiter is the largest planet in our solar system and is known for its Great Red Spot, a giant storm larger than Earth.',
      keyFacts: [
        'Largest planet in the Solar System',
        'Has the Great Red Spot storm',
        'More than 80 known moons',
        'Could fit all other planets inside it',
        'Acts as a "cosmic vacuum cleaner"'
      ],
      discovery: {
        discoveredBy: 'Known since ancient times',
        discoveryDate: 'Ancient',
        method: 'Naked eye observation'
      },
      images: ['/textures/jupiter/great-red-spot.jpg', '/textures/jupiter/bands.jpg'],
      videoUrl: 'PLACEHOLDER_JUPITER_VIDEO',
      texture: '/textures/jupiter.jpg',
      hasRings: true,
      funFacts: [
        'Jupiter has more than twice the mass of all other planets combined',
        'A day on Jupiter is less than 10 hours',
        'Jupiter\'s Great Red Spot is shrinking',
        'Jupiter has faint rings made of dust'
      ],
      comparisons: {
        earth: 'Jupiter is 11 times wider than Earth and 318 times more massive'
      },
      moons: [
        {
          id: 'io',
          name: 'Io',
          type: 'moon',
          radius: 1821.6,
          mass: 8.931e22,
          density: 3.528,
          gravity: 1.796,
          escapeVelocity: 2.558,
          distanceFromSun: 5.204,
          orbitalPeriod: 1.77,
          rotationPeriod: 42.5,
          axialTilt: 0,
          description: 'Io is the innermost Galilean moon of Jupiter and the most volcanically active body in the Solar System.',
          keyFacts: [
            'Most volcanically active body in Solar System',
            'Over 400 active volcanoes',
            'Innermost Galilean moon',
            'Tidally heated by Jupiter',
            'Sulfur-rich surface'
          ],
          discovery: {
            discoveredBy: 'Galileo Galilei',
            discoveryDate: '1610',
            method: 'Telescope observation'
          },
          images: ['/textures/io/volcanic.jpg'],
          videoUrl: 'PLACEHOLDER_IO_VIDEO',
          texture: '/textures/io.jpg',
          funFacts: [
            'Volcanic plumes can reach 500 km high',
            'Surface completely renewed every million years',
            'No impact craters due to constant volcanic activity',
            'Yellow-orange color from sulfur compounds'
          ],
          comparisons: {
            earth: 'Io is slightly larger than Earth\'s Moon'
          }
        },
        {
          id: 'europa',
          name: 'Europa',
          type: 'moon',
          radius: 1560.8,
          mass: 4.799e22,
          density: 3.013,
          gravity: 1.314,
          escapeVelocity: 2.025,
          distanceFromSun: 5.204,
          orbitalPeriod: 3.55,
          rotationPeriod: 85.2,
          axialTilt: 0,
          description: 'Europa is Jupiter\'s fourth-largest moon and is thought to have a subsurface ocean beneath its icy crust.',
          keyFacts: [
            'Subsurface ocean beneath ice crust',
            'Potential for extraterrestrial life',
            'Smooth, young surface',
            'Made mostly of rock with water-ice crust',
            'Tidally locked to Jupiter'
          ],
          discovery: {
            discoveredBy: 'Galileo Galilei',
            discoveryDate: '1610',
            method: 'Telescope observation'
          },
          images: ['/textures/europa/ice-surface.jpg'],
          videoUrl: 'PLACEHOLDER_EUROPA_VIDEO',
          texture: '/textures/europa.jpg',
          funFacts: [
            'Ocean may contain twice as much water as Earth\'s oceans',
            'Surface cracks suggest active geology',
            'Extremely thin oxygen atmosphere',
            'Prime target for astrobiology missions'
          ],
          comparisons: {
            earth: 'Europa is slightly smaller than Earth\'s Moon'
          }
        },
        {
          id: 'ganymede',
          name: 'Ganymede',
          type: 'moon',
          radius: 2634.1,
          mass: 1.4819e23,
          density: 1.936,
          gravity: 1.428,
          escapeVelocity: 2.741,
          distanceFromSun: 5.204,
          orbitalPeriod: 7.15,
          rotationPeriod: 171.7,
          axialTilt: 0,
          description: 'Ganymede is the largest moon in the Solar System and the only moon known to have its own magnetic field.',
          keyFacts: [
            'Largest moon in the Solar System',
            'Larger than planet Mercury',
            'Has its own magnetic field',
            'Subsurface ocean',
            'Made of rock and water ice'
          ],
          discovery: {
            discoveredBy: 'Galileo Galilei',
            discoveryDate: '1610',
            method: 'Telescope observation'
          },
          images: ['/textures/ganymede/surface.jpg'],
          videoUrl: 'PLACEHOLDER_GANYMEDE_VIDEO',
          texture: '/textures/ganymede.jpg',
          funFacts: [
            'Only moon with its own magnetosphere',
            'Would be classified as a planet if it orbited the Sun',
            'Dark and light terrain regions',
            'Hubble detected water vapor in atmosphere'
          ],
          comparisons: {
            earth: 'Ganymede is larger than Mercury and 1.5 times Earth\'s Moon'
          }
        },
        {
          id: 'callisto',
          name: 'Callisto',
          type: 'moon',
          radius: 2410.3,
          mass: 1.075e23,
          density: 1.834,
          gravity: 1.235,
          escapeVelocity: 2.440,
          distanceFromSun: 5.204,
          orbitalPeriod: 16.69,
          rotationPeriod: 400.5,
          axialTilt: 0,
          description: 'Callisto is the outermost Galilean moon and the most heavily cratered object in the Solar System.',
          keyFacts: [
            'Most heavily cratered object in Solar System',
            'Outermost Galilean moon',
            'Ancient, unchanged surface',
            'Low density suggests ice-rock mixture',
            'Possible subsurface ocean'
          ],
          discovery: {
            discoveredBy: 'Galileo Galilei',
            discoveryDate: '1610',
            method: 'Telescope observation'
          },
          images: ['/textures/callisto/craters.jpg'],
          videoUrl: 'PLACEHOLDER_CALLISTO_VIDEO',
          texture: '/textures/callisto.jpg',
          funFacts: [
            'Surface is 4 billion years old',
            'Giant Valhalla crater is 4,000 km across',
            'Least affected by Jupiter\'s radiation',
            'Potential base for future missions to Jupiter system'
          ],
          comparisons: {
            earth: 'Callisto is almost as large as Mercury'
          }
        }
      ]
    },
    {
      id: 'saturn',
      name: 'Saturn',
      type: 'planet',
      radius: 58232,
      mass: 5.683e26,
      density: 0.687,
      gravity: 10.44,
      escapeVelocity: 35.5,
      distanceFromSun: 9.582,
      orbitalPeriod: 10759,
      rotationPeriod: 10.7,
      axialTilt: 26.73,
      eccentricity: 0.052,
      atmosphere: {
        composition: {
          'Hydrogen': 96.3,
          'Helium': 3.25,
          'Methane': 0.45,
          'Ammonia': 0.0125,
          'Other': 0.005
        },
        pressure: 1000,
        temperature: { min: -185, max: -122, average: -140 }
      },
      description: 'Saturn is the sixth planet from the Sun and is famous for its spectacular ring system made of ice and rock particles.',
      keyFacts: [
        'Famous for its prominent ring system',
        'Less dense than water',
        'Has more than 80 known moons',
        'Titan is larger than Mercury',
        'Hexagonal storm at north pole'
      ],
      discovery: {
        discoveredBy: 'Known since ancient times',
        discoveryDate: 'Ancient',
        method: 'Naked eye observation'
      },
      images: ['/textures/saturn/rings.jpg', '/textures/saturn/hexagon.jpg'],
      videoUrl: 'PLACEHOLDER_SATURN_VIDEO',
      texture: '/textures/saturn.jpg',
      hasRings: true,
      funFacts: [
        'Saturn would float in water if there was a bathtub big enough',
        'Saturn\'s rings are made mostly of water ice',
        'A day on Saturn is about 10.7 hours',
        'Saturn has a hexagonal-shaped storm at its north pole'
      ],
      comparisons: {
        earth: 'Saturn is 9 times wider than Earth but much less dense'
      },
      moons: [
        {
          id: 'titan',
          name: 'Titan',
          type: 'moon',
          radius: 2574,
          mass: 1.3452e23,
          density: 1.88,
          gravity: 1.352,
          escapeVelocity: 2.639,
          distanceFromSun: 9.582,
          orbitalPeriod: 15.95,
          rotationPeriod: 382.7,
          axialTilt: 0,
          atmosphere: {
            composition: {
              'Nitrogen': 94.2,
              'Methane': 5.65,
              'Hydrogen': 0.1,
              'Other': 0.05
            },
            pressure: 1.45,
            temperature: { min: -179, max: -179, average: -179 }
          },
          description: 'Titan is Saturn\'s largest moon and the only moon in the Solar System with a substantial atmosphere.',
          keyFacts: [
            'Larger than planet Mercury',
            'Dense nitrogen atmosphere',
            'Lakes and rivers of liquid methane',
            'Complex organic chemistry',
            'Thick orange haze'
          ],
          discovery: {
            discoveredBy: 'Christiaan Huygens',
            discoveryDate: '1655',
            method: 'Telescope observation'
          },
          images: ['/textures/titan/surface.jpg'],
          videoUrl: 'PLACEHOLDER_TITAN_VIDEO',
          texture: '/textures/titan.jpg',
          funFacts: [
            'Only moon with a substantial atmosphere',
            'Methane cycle similar to Earth\'s water cycle',
            'Cassini-Huygens landed on its surface',
            'Possible prebiotic chemistry'
          ],
          comparisons: {
            earth: 'Titan is 50% larger than Earth\'s Moon and larger than Mercury'
          }
        },
        {
          id: 'enceladus',
          name: 'Enceladus',
          type: 'moon',
          radius: 252.1,
          mass: 1.08e20,
          density: 1.609,
          gravity: 0.0113,
          escapeVelocity: 0.239,
          distanceFromSun: 9.582,
          orbitalPeriod: 1.37,
          rotationPeriod: 32.9,
          axialTilt: 0,
          description: 'Enceladus is an icy moon of Saturn known for its water geysers erupting from its south pole.',
          keyFacts: [
            'Water geysers at south pole',
            'Subsurface ocean',
            'Highly reflective icy surface',
            'Geologically active',
            'Potential for life'
          ],
          discovery: {
            discoveredBy: 'William Herschel',
            discoveryDate: '1789',
            method: 'Telescope observation'
          },
          images: ['/textures/enceladus/geysers.jpg'],
          videoUrl: 'PLACEHOLDER_ENCELADUS_VIDEO',
          texture: '/textures/enceladus.jpg',
          funFacts: [
            'Geysers shoot water 500 km into space',
            'Warmest spot in outer solar system',
            'Tigers stripes at south pole',
            'Primary source of Saturn\'s E ring'
          ],
          comparisons: {
            earth: 'Enceladus is about 1/7th the size of Earth\'s Moon'
          }
        },
        {
          id: 'mimas',
          name: 'Mimas',
          type: 'moon',
          radius: 198.2,
          mass: 3.749e19,
          density: 1.149,
          gravity: 0.0648,
          escapeVelocity: 0.159,
          distanceFromSun: 9.582,
          orbitalPeriod: 0.94,
          rotationPeriod: 22.6,
          axialTilt: 0,
          description: 'Mimas is Saturn\'s innermost major moon, famous for its large Herschel crater that gives it a Death Star appearance.',
          keyFacts: [
            'Resembles the Death Star from Star Wars',
            'Giant Herschel crater',
            'Innermost major moon of Saturn',
            'Low density suggests mostly ice',
            'Helps clear the Cassini Division'
          ],
          discovery: {
            discoveredBy: 'William Herschel',
            discoveryDate: '1789',
            method: 'Telescope observation'
          },
          images: ['/textures/mimas/herschel-crater.jpg'],
          videoUrl: 'PLACEHOLDER_MIMAS_VIDEO',
          texture: '/textures/mimas.jpg',
          funFacts: [
            'Herschel crater is 1/3 the diameter of Mimas',
            'Impact that created crater nearly destroyed moon',
            'Orbital resonance affects Saturn\'s rings',
            'Temperature varies from -200°C to -181°C'
          ],
          comparisons: {
            earth: 'Mimas is about 1/9th the size of Earth\'s Moon'
          }
        },
        {
          id: 'iapetus',
          name: 'Iapetus',
          type: 'moon',
          radius: 734.5,
          mass: 1.805e21,
          density: 1.088,
          gravity: 0.223,
          escapeVelocity: 0.573,
          distanceFromSun: 9.582,
          orbitalPeriod: 79.32,
          rotationPeriod: 1904.7,
          axialTilt: 0,
          description: 'Iapetus is Saturn\'s third-largest moon, famous for its two-tone coloration and equatorial ridge.',
          keyFacts: [
            'Two-tone coloration (light and dark)',
            'Massive equatorial ridge',
            'Walnut-like shape',
            'Very distant from Saturn',
            'Tidally locked'
          ],
          discovery: {
            discoveredBy: 'Giovanni Cassini',
            discoveryDate: '1671',
            method: 'Telescope observation'
          },
          images: ['/textures/iapetus/two-tone.jpg'],
          videoUrl: 'PLACEHOLDER_IAPETUS_VIDEO',
          texture: '/textures/iapetus.jpg',
          funFacts: [
            'Equatorial ridge is 20 km high in places',
            'Dark material may come from another moon',
            'One of the most distant regular moons',
            'Brightness varies dramatically during orbit'
          ],
          comparisons: {
            earth: 'Iapetus is about 2/5th the size of Earth\'s Moon'
          }
        }
      ]
    },
    {
      id: 'uranus',
      name: 'Uranus',
      type: 'planet',
      radius: 25362,
      mass: 8.681e25,
      density: 1.27,
      gravity: 8.69,
      escapeVelocity: 21.3,
      distanceFromSun: 19.2,
      orbitalPeriod: 30687,
      rotationPeriod: -17.2, // Retrograde
      axialTilt: 97.77,
      eccentricity: 0.046,
      atmosphere: {
        composition: {
          'Hydrogen': 82.5,
          'Helium': 15.2,
          'Methane': 2.3,
          'Other': 0.009
        },
        pressure: 1000,
        temperature: { min: -224, max: -197, average: -197 }
      },
      description: 'Uranus is the seventh planet from the Sun and rotates on its side, making it unique among the planets.',
      keyFacts: [
        'Rotates on its side (97.77° tilt)',
        'Made of water, methane, and ammonia ices',
        'Has faint rings',
        'Coldest planetary atmosphere in Solar System',
        'Has 27 known moons'
      ],
      discovery: {
        discoveredBy: 'William Herschel',
        discoveryDate: '1781',
        method: 'Telescope observation'
      },
      images: ['/textures/uranus/blue-green.jpg', '/textures/uranus/rings.jpg'],
      videoUrl: 'PLACEHOLDER_URANUS_VIDEO',
      texture: '/textures/uranus.jpg',
      hasRings: true,
      funFacts: [
        'Uranus spins on its side like a rolling ball',
        'A year on Uranus is 84 Earth years',
        'Uranus has the coldest atmosphere of any planet',
        'It rains diamonds on Uranus'
      ],
      comparisons: {
        earth: 'Uranus is 4 times wider than Earth and 14.5 times more massive'
      },
      moons: [
        {
          id: 'titania',
          name: 'Titania',
          type: 'moon',
          radius: 788.4,
          mass: 3.527e21,
          density: 1.711,
          gravity: 0.379,
          escapeVelocity: 0.773,
          distanceFromSun: 19.2,
          orbitalPeriod: 8.71,
          rotationPeriod: 208.9,
          axialTilt: 0,
          description: 'Titania is the largest moon of Uranus and was named after the queen of the fairies in Shakespeare\'s A Midsummer Night\'s Dream.',
          keyFacts: [
            'Largest moon of Uranus',
            'Named after Shakespeare character',
            'Ice and rock composition',
            'Evidence of past geological activity',
            'Discovered by William Herschel'
          ],
          discovery: {
            discoveredBy: 'William Herschel',
            discoveryDate: '1787',
            method: 'Telescope observation'
          },
          images: ['/textures/titania/surface.jpg'],
          videoUrl: 'PLACEHOLDER_TITANIA_VIDEO',
          texture: '/textures/titania.jpg',
          funFacts: [
            'Less than half the size of Earth\'s Moon',
            'Surface shows evidence of tectonic activity',
            'Composed of roughly equal amounts of ice and rock',
            'Has a reddish tint due to organic compounds'
          ],
          comparisons: {
            earth: 'Titania is about half the size of Earth\'s Moon'
          }
        },
        {
          id: 'oberon',
          name: 'Oberon',
          type: 'moon',
          radius: 761.4,
          mass: 3.014e21,
          density: 1.563,
          gravity: 0.346,
          escapeVelocity: 0.726,
          distanceFromSun: 19.2,
          orbitalPeriod: 13.46,
          rotationPeriod: 323.1,
          axialTilt: 0,
          description: 'Oberon is the second-largest and outermost major moon of Uranus, named after the king of the fairies in Shakespeare.',
          keyFacts: [
            'Second-largest moon of Uranus',
            'Outermost major moon',
            'Named after Shakespeare character',
            'Dark, heavily cratered surface',
            'Mixture of ice and rock'
          ],
          discovery: {
            discoveredBy: 'William Herschel',
            discoveryDate: '1787',
            method: 'Telescope observation'
          },
          images: ['/textures/oberon/craters.jpg'],
          videoUrl: 'PLACEHOLDER_OBERON_VIDEO',
          texture: '/textures/oberon.jpg',
          funFacts: [
            'Surface is very dark, reflecting only 14% of sunlight',
            'Has several large impact craters',
            'Shows evidence of ancient geological activity',
            'Composed of roughly 50% ice and 50% rock'
          ],
          comparisons: {
            earth: 'Oberon is slightly smaller than Titania'
          }
        },
        {
          id: 'ariel',
          name: 'Ariel',
          type: 'moon',
          radius: 578.9,
          mass: 1.353e21,
          density: 1.592,
          gravity: 0.269,
          escapeVelocity: 0.558,
          distanceFromSun: 19.2,
          orbitalPeriod: 2.52,
          rotationPeriod: 60.5,
          axialTilt: 0,
          description: 'Ariel is the fourth-largest moon of Uranus and has the brightest and youngest surface of all Uranian moons.',
          keyFacts: [
            'Brightest surface of Uranian moons',
            'Youngest-looking surface',
            'Named after Shakespeare character',
            'Evidence of recent geological activity',
            'Extensive system of canyons'
          ],
          discovery: {
            discoveredBy: 'William Lassell',
            discoveryDate: '1851',
            method: 'Telescope observation'
          },
          images: ['/textures/ariel/canyons.jpg'],
          videoUrl: 'PLACEHOLDER_ARIEL_VIDEO',
          texture: '/textures/ariel.jpg',
          funFacts: [
            'Surface shows evidence of recent resurfacing',
            'Has extensive fault systems and canyons',
            'Relatively crater-free surface',
            'May have had geological activity in the past'
          ],
          comparisons: {
            earth: 'Ariel is about 1/3rd the size of Earth\'s Moon'
          }
        },
        {
          id: 'umbriel',
          name: 'Umbriel',
          type: 'moon',
          radius: 584.7,
          mass: 1.172e21,
          density: 1.39,
          gravity: 0.234,
          escapeVelocity: 0.520,
          distanceFromSun: 19.2,
          orbitalPeriod: 4.14,
          rotationPeriod: 99.5,
          axialTilt: 0,
          description: 'Umbriel is the darkest moon of Uranus and shows little evidence of geological activity.',
          keyFacts: [
            'Darkest moon of Uranus',
            'Ancient, heavily cratered surface',
            'Named after character from Alexander Pope',
            'Little geological activity',
            'Uniform dark surface'
          ],
          discovery: {
            discoveredBy: 'William Lassell',
            discoveryDate: '1851',
            method: 'Telescope observation'
          },
          images: ['/textures/umbriel/dark-surface.jpg'],
          videoUrl: 'PLACEHOLDER_UMBRIEL_VIDEO',
          texture: '/textures/umbriel.jpg',
          funFacts: [
            'Surface reflects only 16% of sunlight',
            'Ancient surface with many impact craters',
            'Shows little evidence of internal activity',
            'Has a mysterious bright ring called Wunda'
          ],
          comparisons: {
            earth: 'Umbriel is similar in size to Ariel'
          }
        },
        {
          id: 'miranda',
          name: 'Miranda',
          type: 'moon',
          radius: 235.8,
          mass: 6.59e19,
          density: 1.20,
          gravity: 0.079,
          escapeVelocity: 0.193,
          distanceFromSun: 19.2,
          orbitalPeriod: 1.41,
          rotationPeriod: 33.9,
          axialTilt: 0,
          description: 'Miranda is the smallest and innermost of Uranus\'s major moons, with a patchwork surface of different terrains.',
          keyFacts: [
            'Smallest major moon of Uranus',
            'Bizarre patchwork surface',
            'Extreme geological features',
            'Named after Shakespeare character',
            'May have been shattered and reassembled'
          ],
          discovery: {
            discoveredBy: 'Gerard Kuiper',
            discoveryDate: '1948',
            method: 'Telescope observation'
          },
          images: ['/textures/miranda/patchwork.jpg'],
          videoUrl: 'PLACEHOLDER_MIRANDA_VIDEO',
          texture: '/textures/miranda.jpg',
          funFacts: [
            'Most bizarre and varied terrain in solar system',
            'Has cliffs 20 km high',
            'May have been broken apart and reformed',
            'Surface shows signs of extreme tidal heating'
          ],
          comparisons: {
            earth: 'Miranda is about 1/7th the size of Earth\'s Moon'
          }
        }
      ]
    },
    {
      id: 'neptune',
      name: 'Neptune',
      type: 'planet',
      radius: 24622,
      mass: 1.024e26,
      density: 1.638,
      gravity: 11.15,
      escapeVelocity: 23.5,
      distanceFromSun: 30.05,
      orbitalPeriod: 60190,
      rotationPeriod: 16.1,
      axialTilt: 28.32,
      eccentricity: 0.009,
      atmosphere: {
        composition: {
          'Hydrogen': 80,
          'Helium': 19,
          'Methane': 1,
          'Deuteride': 0.019
        },
        pressure: 1000,
        temperature: { min: -218, max: -200, average: -200 }
      },
      description: 'Neptune is the eighth and outermost planet in our solar system, known for its deep blue color and extreme winds.',
      keyFacts: [
        'Farthest planet from the Sun',
        'Windiest planet with speeds up to 2,100 km/h',
        'Deep blue color from methane',
        'Has 14 known moons',
        'Takes 165 Earth years to orbit the Sun'
      ],
      discovery: {
        discoveredBy: 'Urbain Le Verrier & John Couch Adams',
        discoveryDate: '1846',
        method: 'Mathematical prediction'
      },
      images: ['/textures/neptune/deep-blue.jpg', '/textures/neptune/storms.jpg'],
      videoUrl: 'PLACEHOLDER_NEPTUNE_VIDEO',
      texture: '/textures/neptune.jpg',
      hasRings: true,
      funFacts: [
        'Neptune was the first planet discovered through mathematical prediction',
        'Neptune has the fastest winds in the Solar System',
        'A year on Neptune is 165 Earth years',
        'Neptune\'s largest moon, Triton, orbits backwards'
      ],
      comparisons: {
        earth: 'Neptune is 4 times wider than Earth and 17 times more massive'
      },
      moons: [
        {
          id: 'triton',
          name: 'Triton',
          type: 'moon',
          radius: 1353.4,
          mass: 2.139e22,
          density: 2.061,
          gravity: 0.779,
          escapeVelocity: 1.455,
          distanceFromSun: 30.05,
          orbitalPeriod: -5.88, // Retrograde orbit
          rotationPeriod: -141.0, // Tidally locked, retrograde
          axialTilt: 0,
          atmosphere: {
            composition: {
              'Nitrogen': 99.9,
              'Methane': 0.1
            },
            pressure: 0.000014,
            temperature: { min: -235, max: -235, average: -235 }
          },
          description: 'Triton is Neptune\'s largest moon and the only large moon in the Solar System with a retrograde orbit.',
          keyFacts: [
            'Largest moon of Neptune',
            'Retrograde orbit (orbits backwards)',
            'Likely a captured Kuiper Belt object',
            'Thin nitrogen atmosphere',
            'Geysers of nitrogen'
          ],
          discovery: {
            discoveredBy: 'William Lassell',
            discoveryDate: '1846',
            method: 'Telescope observation'
          },
          images: ['/textures/triton/geysers.jpg'],
          videoUrl: 'PLACEHOLDER_TRITON_VIDEO',
          texture: '/textures/triton.jpg',
          funFacts: [
            'Nitrogen geysers erupt 8 km high',
            'Coldest object ever visited by spacecraft',
            'Probably captured from Kuiper Belt',
            'Will eventually crash into Neptune'
          ],
          comparisons: {
            earth: 'Triton is about 3/4 the size of Earth\'s Moon'
          }
        }
      ]
    }
  ]
};