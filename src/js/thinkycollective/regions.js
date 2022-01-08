var regionsOffset = [1, 38];
var regions = [
  [
    //////////////
    // INTRO
    //////////////
    // Entrance path
    {
      id: 'entrance path',
      offset: [64, 67],
      areas: [
        { rect: [-8, 7, 7, 3], camera: 'follow-player-anchored-x' },
        { rect: [-8, 10, 3, 3], camera: 'follow-player-anchored-x' },
      ],
      zoom: 0.7,
      allowReset: false,
      copyCameraAnchor: 'intro',
      label: 'The Lab',
      start: true
    },
    // Intro
    {
      id: 'intro',
      offset: [64, 67],
      areas: [
        { rect: [-1, 3, 16, 9], camera: 'follow-player-anchored-x' },
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxX: 2,
        minY: -2
      },
      label: 'The Lab'
    },
    // Intro bottom intersection
    {
      id: 'intro bottom intersection',
      offset: [64, 67],
      areas: [
        { rect: [4, -6, 6, 9], camera: 'follow-player-anchored-x' }
      ],
      zoom: 0.7,
      copyCameraAnchor: 'intro',
      simulateAlso: [
        'intro bottom left arm 1',
        'intro bottom left arm 1-2 node',
        'intro bottom right arm 1',
        'intro bottom right arm 1-2 node'
      ],
      simulationBoundsAdjustment: {
        minY: -2,
        maxY: 4
      },
      label: 'Connections'
    },
    // Intro bottom left arm #1
    {
      id: 'intro bottom left arm 1',
      offset: [64, 67],
      areas: [
        { rect: [-9, -6, 13, 4], camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxX: 3
      },
      label: 'Connections'
    },
    // Intro bottom left arm #1-#2 node
    {
      id: 'intro bottom left arm 1-2 node',
      offset: [64, 67],
      areas: [
        { rect: [-13, -7, 4, 5], camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulateAlso: [
        'intro bottom left arm 1',
        'intro bottom intersection',
        'intro bottom left arm 2',
        'intro bottom left arm 2-3 node'
      ],
      label: 'Connections'
    },
    // Intro bottom left arm #2
    {
      id: 'intro bottom left arm 2',
      offset: [64, 67],
      areas: [
        { rect: [-13, -2, 4, 8], camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Connections'
    },
    // Intro bottom left arm #2-#3 node
    {
      id: 'intro bottom left arm 2-3 node',
      offset: [64, 67],
      areas: [
        { rect: [-13, 6, 4, 5], camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulateAlso: [
        'intro bottom left arm 2',
        'intro bottom left arm 1-2 node',
        'intro bottom left arm 3'
      ],
      label: 'Connections'
    },
    // Intro bottom left arm #3
    {
      id: 'intro bottom left arm 3',
      offset: [64, 67],
      areas: [
        { rect: [-30, 6, 17, 4], camera: 'follow-player' },
        { rect: [-29, 5, 3, 1], camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulateAlso: ['intro bottom left arm 2-3 node'],
      simulationBoundsAdjustment: {
        minX: -2
      },
      label: 'Connections'
    },
    // Intro bottom right arm #1
    {
      id: 'intro bottom right arm 1',
      offset: [64, 67],
      areas: [
        { rect: [10, -6, 19, 4], secondary: true, camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        minX: -2,
        maxX: 2
      },
      label: 'Connections'
    },
    // Intro bottom right arm #1-#2 node
    {
      id: 'intro bottom right arm 1-2 node',
      offset: [64, 67],
      areas: [
        { rect: [29, -7, 4, 5], secondary: true, camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulateAlso: [
        'intro bottom right arm 1',
        'intro bottom right arm 2',
        'intro bottom intersection'
      ],
      simulationBoundsAdjustment: {
        maxX: 3
      },
      label: 'Connections'
    },
    // Intro bottom right arm #2
    {
      id: 'intro bottom right arm 2',
      offset: [64, 67],
      areas: [
        { rect: [29, -2, 4, 9], secondary: true, camera: 'follow-player' },
        { rect: [33, 3, 2, 4], secondary: true, camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxX: 3
      },
      label: 'Connections'
    },
    // Intro bottom-top #1
    {
      id: 'intro bottom top',
      offset: [64, 67],
      areas: [
        { rect: [3, -23, 8, 17], camera: 'follow-player-anchored-x' }
      ],
      zoom: 0.7,
      copyCameraAnchor: 'intro',
      simulationBoundsAdjustment: {
        minX: 1,
        maxX: -1,
        minY: -3,
        maxY: 3
      },
      label: 'Connections'
    },
    // Intro top intersection
    {
      id: 'intro top intersection',
      offset: [64, 67],
      areas: [
        { rect: [4, -27, 6, 4], camera: 'follow-player-anchored-x' }
      ],
      zoom: 0.7,
      copyCameraAnchor: 'intro',
      simulateAlso: [
        'intro top left arm',
        'intro top right arm',
        'intro exit'
      ],
      simulationBoundsAdjustment: {
        minX: -2,
        maxX: 2,
        maxY: 2
      },
      label: 'Connections'
    },
    // Intro top left arm
    {
      id: 'intro top left arm',
      offset: [65, 67],
      areas: [
        { rect: [-3, -27, 6, 4], camera: 'follow-player' }
      ],
      zoom: 0.7,
      simulateAlso: ['intro top intersection'],
      simulationBoundsAdjustment: {
        minX: -2,
        maxY: 1
      },
      label: 'Connections'
    },
    // Intro top right arm
    {
      id: 'intro top right arm',
      offset: [64, 67],
      areas: [
        { rect: [10, -27, 1, 4], secondary: true, camera: 'follow-player' },
        { rect: [11, -32, 4, 9], secondary: true, camera: 'follow-player' },
        { rect: [15, -36, 4, 8], secondary: true, camera: 'follow-player' },
        { rect: [19, -36, 2, 4], secondary: true, camera: 'follow-player' }
      ],
      zoom: 0.7,
      simulateAlso: ['intro top intersection'],
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Connections'
    },
    // Intro exit
    {
      id: 'intro exit',
      offset: [64, 67],
      areas: [
        { rect: [4, -31, 6, 4], camera: 'follow-player-anchored-x' }
      ],
      zoom: 0.7,
      copyCameraAnchor: 'intro',
      simulationBoundsAdjustment: {
        minY: -3
      },
      simulateAlso: ['intro top intersection'],
      label: 'Connections'
    },
    // Intro bonus puzzle
    {
      id: 'intro bonus puzzle',
      offset: [79, 66],
      areas: [
        { rect: [0, 3, 1, 4], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 1, 7], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 0, 3, 7] },
        { rect: [3, 7, 2, 1] },
        { rect: [5, 0, 8, 10] }
      ],
      zoom: 0.7,
      label: 'Level S.1',
      latest: [
        { object: 'inflatable', position: [4, 6] }
      ]
    },
    // Intro bonus puzzle secret
    {
      id: 'intro bonus puzzle secret',
      offset: [74, 65],
      areas: [
        { rect: [0, 0, 5, 5] },
        { rect: [5, 1, 1, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      secret: true
    },
    // Intro top left arm secret corridor
    {
      id: 'intro top left arm secret corridor',
      offset: [65, 70],
      areas: [
        { rect: [-3, -26, 5, 11], camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        minX: -2,
        minY: -2,
        maxY: 1
      }
    },
    // Intro top left arm secret
    {
      id: 'intro top left arm secret',
      offset: [65, 70],
      areas: [
        { rect: [-2, -15, 3, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [-3, -14, 5, 5] }
      ],
      zoom: 0.7,
      secret: true
    },
    // Block push intro (Jumble)
    {
      id: 'jumble',
      offset: [60, 33],
      areas: [
        { rect: [-4, 0, 12, 7] },
        { rect: [8, 0, 6, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [-5, 0, 1, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      credit: "JumbleTheCircle",
      simulationBoundsAdjustment: {
        minX: -2
      },
      label: 'Level 1'
    },
    // Block push intro secret
    {
      id: 'jumble secret',
      offset: [50, 32],
      areas: [
        { rect: [0, 0, 4, 5] },
        { rect: [4, 0, 1, 5], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      secret: true
    },
    // Two level intro (Patrick)
    {
      id: 'patrick',
      offset: [52, 21],
      areas: [
        { rect: [0, 0, 12, 8] },
        { rect: [0, 8, 11, 3] },
        { rect: [3, 11, 4, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.65,
      credit: "Patrick",
      simulationBoundsAdjustment: {
        maxX: 1,
        maxY: 1
      },
      label: 'Level 2'
    },
    // Seed level (Joseph Mansfield)
    {
      id: 'joseph mansfield',
      offset: [64, 20],
      areas: [
        { rect: [0, 0, 3, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 0, 1, 8] },
        { rect: [4, 0, 7, 9] },
        { rect: [11, 0, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      credit: "Joseph Mansfield",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level 3'
    },
    // Infinite loop intro (Blookerstein)
    {
      id: 'blookerstein',
      offset: [75, 19],
      areas: [
        { rect: [1, -1, 6, 11] }
      ],
      zoom: 0.7,
      credit: "Blookerstein",
      simulationBoundsAdjustment: {
        minX: -2,
        maxY: 1
      },
      label: 'Level 4'
    },
    // Seed level secret
    {
      id: 'joseph mansfield secret',
      offset: [72, 29],
      areas: [
        { rect: [-4, 0, 12, 3], camera: 'follow-player-anchored-y' },
        { rect: [-9, -1, 5, 5], camera: 'follow-player-anchored-y' }
      ],
      zoom: 0.7,
      secret: true
    },
    // Hub
    {
      id: 'hub',
      offset: [73, 7],
      areas: [
        { rect: [0, 0, 14, 10] },
        { rect: [3, -2, 8, 2], secondary: true, camera: 'pull-vertical' },
        { rect: [5, 10, 4, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.6,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'The Hub'
    },
    //////////////
    // BRANCH A
    //////////////
    // (marcosd)
    {
      id: 'marcosd',
      offset: [64, 10],
      areas: [
        { rect: [0, 0, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 9] },
        { rect: [8, 0, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.8,
      credit: "marcosd",
      simulationBoundsAdjustment: {
        minX: -2
      },
      label: 'Level A.1'
    },
    // (knexator)
    {
      id: 'knexator',
      offset: [55, 10],
      areas: [
        { rect: [0, 0, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 1, 1] },
        { rect: [3, 0, 5, 1] },
        { rect: [1, 1, 7, 8] },
        { rect: [8, 0, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.8,
      credit: "knexator",
      simulationBoundsAdjustment: {
        minX: -1,
        maxX: 2,
        minY: -1,
        maxY: 1
      },
      label: 'Level A.2'
    },
    // (knexator) - secret
    {
      id: 'knexator secret',
      offset: [50, 12],
      areas: [
        { rect: [4, 1, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [-1, 0, 5, 5] },
        { rect: [0, 5, 3, 1], secondary: true, camera: 'follow-player' }
      ],
      zoom: 0.8,
      secret: true,
      simulationBoundsAdjustment: {
        maxY: 1
      }
    },
    // (knexator) - secret return
    {
      id: 'knexator secret return',
      offset: [50, 12],
      areas: [
        { rect: [-2, 6, 13, 3], camera: 'follow-player' },
        { rect: [11, 7, 2, 2], camera: 'follow-player' },
        { rect: [-2, 9, 3, 4], camera: 'follow-player' },
        { rect: [-1, 13, 2, 3], camera: 'follow-player' }
      ],
      zoom: 0.8,
      simulationBoundsAdjustment: {
        maxY: 1
      }
    },
    // Branch A exit corridor #1
    {
      id: 'branch a exit corridor 1',
      offset: [43, 8],
      areas: [
        { rect: [-1, 0, 13, 3], camera: 'follow-player' }
      ],
      zoom: 0.8,
      simulationBoundsAdjustment: {
        maxX: 2,
        maxY: 1
      }
    },
    // Branch A exit corridor #2
    {
      id: 'branch a exit corridor 2',
      offset: [43, 8],
      areas: [
        { rect: [12, 0, 15, 3], camera: 'follow-player' },
        { rect: [13, -3, 3, 3], camera: 'follow-player' }
      ],
      zoom: 0.8,
      simulationBoundsAdjustment: {
        maxX: 2,
        maxY: 1
      }
    },
    // Branch A exit corridor #3
    {
      id: 'branch a exit corridor 3',
      offset: [43, 8],
      areas: [
        { rect: [27, -4, 7, 3], camera: 'follow-player' },
        { rect: [27, -1, 3, 4], camera: 'follow-player' }
      ],
      zoom: 0.8
    },
    // (Corey Hardt)
    {
      id: 'corey hardt',
      offset: [43, 1],
      areas: [
        { rect: [0, 4, 2, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 0, 7, 8] },
        { rect: [10, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [11, 4, 2, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.8,
      credit: "Corey Hardt",
      label: 'Level A.3'
    },
    // (Auroriax)
    {
      id: 'auroriax',
      offset: [40, 12],
      areas: [
        { rect: [3, -1, 3, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 0, 9, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 9, 6] },
        { rect: [1, 7, 7, 2] },
        { rect: [2, 9, 5, 4] },
        { rect: [2, 13, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [3, 14, 3, 2], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.55,
      credit: "Auroriax",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level A.4'
    },
    // (Kristian Hedeholm)
    {
      id: 'kristian hedeholm',
      offset: [39, 25],
      areas: [
        { rect: [7, 0, 3, 2], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 2, 11, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 3, 11, 8] },
        { rect: [0, 11, 7, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.75,
      credit: "Kristian Hedeholm",
      simulationBoundsAdjustment: {
        minY: -2,
        maxY: 1
      },
      label: 'Level A.5'
    },
    // The clock (Zomulgustar)
    {
      id: 'zomulgustar',
      offset: [26, 37],
      areas: [
        { rect: [1, 0, 19, 5] },
        { rect: [0, 5, 21, 11] },
        { rect: [1, 16, 19, 5] },
        { rect: [12, 21, 8, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [20, 19, 1, 3], secondary: true, camera: 'pull-vertical' },
        { rect: [1, -1, 13, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.38,
      secret: true,
      credit: "Zomulgustar",
      simulationBoundsAdjustment: {
        maxX: 2,
        maxY: 1
      },
      label: 'Level A.6'
    },
    // Clock shortcut surround
    {
      id: 'clock shortcut surround',
      offset: [32, 31],
      areas: [
        { rect: [0, 0, 3, 5] },
        { rect: [3, 0, 1, 1] },
        { rect: [3, 4, 1, 1] },
        { rect: [4, 0, 4, 5] }
      ],
      zoom: 0.45,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level A.6'
    },
    // Clock shortcut
    {
      id: 'clock shortcut',
      offset: [32, 30],
      areas: [
        { rect: [3, 2, 1, 3] }
      ],
      zoom: 0.45,
      simulationBoundsAdjustment: {
        minX: -1,
        maxX: 1,
        minY: 1,
        maxY: 1
      },
      label: 'Level A.6',
      copyCameraAnchor: 'clock shortcut surround'
    },
    // 1:00 (CHz)
    {
      id: 'chz',
      offset: [46, 37],
      areas: [
        { rect: [0, 0, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 1, 11], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 0, 7, 11] },
        { rect: [9, 0, 1, 11], secondary: true },
        { rect: [10, 3, 1, 4], secondary: true, camera: 'pull-horizontal' },
      ],
      zoom: 0.7,
      credit: "CHz",
      simulationBoundsAdjustment: {
        maxX: 2
      },
      label: 'Level A.7',
      latest: [
        { object: 'belt_below', position: [2, 8] }
      ]
    },
    // 1:00 Main path lock
    {
      id: '1:00 main path lock',
      offset: [57, 40],
      areas: [
        { rect: [0, 0, 4, 5] },
        { rect: [4, 0, 1, 5] }
      ],
      zoom: 0.7,
      simulateAlso: [
        'intro top left arm',
        'intro top intersection'
      ],
      label: 'Connections'
    },
    // 3:00 (Menderbug)
    {
      id: 'menderbug',
      offset: [47, 48],
      areas: [
        { rect: [0, 0, 1, 6], secondary: true, camera: 'pull-horizontal' },
        { rect: [-1, 6, 2, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 8, 9] },
        { rect: [9, 0, 1, 9], secondary: true }
      ],
      zoom: 0.7,
      credit: "Menderbug",
      label: 'Level A.8'
    },
    // 5:00 #1 (Draknek)
    {
      id: 'draknek',
      offset: [40, 59],
      areas: [
        { rect: [0, 0, 11, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 1, 10], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 1, 9, 9] },
        { rect: [10, 1, 1, 10], secondary: true },
        { rect: [1, 10, 9, 1], secondary: true }
      ],
      zoom: 0.7,
      credit: "Draknek",
      label: 'Level A.9'
    },
    // 5:00 #2 (Aspeon)
    {
      id: 'aspeon',
      offset: [34, 58],
      areas: [
        { rect: [0, 0, 6, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 1, 7], secondary: true },
        { rect: [1, 1, 4, 7] },
        { rect: [0, 8, 6, 1], secondary: true },
        { rect: [5, 1, 1, 7], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      credit: "Aspeon",
      label: 'Level A.10'
    },
    // 7:00 #1 (KirraLuan)
    {
      id: 'kirraluan',
      offset: [16, 51],
      areas: [
        { rect: [0, 0, 9, 4] },
        { rect: [9, 0, 2, 4], secondary: true },
        { rect: [0, 4, 9, 6] },
        { rect: [9, 4, 2, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [9, 7, 1, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      credit: "KirraLuan",
      label: 'Level A.11'
    },
    // 7:00 #2 (Clickmazes)
    {
      id: 'clickmazes',
      offset: [26, 58],
      areas: [
        { rect: [0, 0, 1, 11], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 6, 1], secondary: true },
        { rect: [1, 1, 6, 9] },
        { rect: [1, 10, 6, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [7, 0, 1, 11], secondary: true }
      ],
      zoom: 0.7,
      credit: "clickmazes",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level A.12'
    },
    // 7:00 #3 (pancelor)
    {
      id: 'pancelor',
      offset: [19, 69],
      areas: [
        { rect: [1, 0, 11, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [-2, 1, 4, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 1, 9, 8] },
        { rect: [11, 1, 1, 8], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      credit: "pancelor",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level A.13'
    },
    // 7:00 Main path lock
    {
      id: '7:00 main path lock',
      offset: [31, 69],
      areas: [
        { rect: [0, 0, 3, 8] }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxX: 4
      },
      label: 'Connections'
    },
    // 7:00 Main path lock secret
    {
      id: '7:00 main path lock secret',
      offset: [34, 66],
      areas: [
        { rect: [0, 0, 5, 5] },
        { rect: [1, 5, 2, 1] },
        { rect: [3, 5, 2, 2], secondary: true, camera: 'follow-player' },
        { rect: [5, 4, 12, 3], secondary: true, camera: 'follow-player' }
      ],
      zoom: 0.7,
      secret: true,
      simulationBoundsAdjustment: {
        maxY: 1
      }
    },
    // 7:00 #4 (Norgg)
    {
      id: 'norgg',
      offset: [8, 70],
      areas: [
        { rect: [6, -1, 3, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 0, 8, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [8, 0, 1, 7], secondary: true, camera: 'pull-horizontal' },
        { rect: [0, 1, 1, 6], secondary: true },
        { rect: [1, 6, 7, 1], secondary: true },
        { rect: [1, 1, 7, 5] }
      ],
      zoom: 0.7,
      credit: "Norgg",
      simulationBoundsAdjustment: {
        minY: -2
      },
      label: 'Level A.14'
    },
    // 7:00 #5 Post-Norgg
    {
      id: 'post-norgg',
      offset: [8, 61],
      areas: [
        { rect: [-1, 1, 10, 6] },
        { rect: [9, 0, 1, 7] },
        { rect: [5, 0, 4, 1], secondary: true },
        { rect: [-1, 7, 10, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [10, 0, 1, 7], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxX: 2,
        maxY: 1
      }
    },
    // 7:00 Le Slo Secret
    {
      id: 'le slo secret',
      offset: [19, 61],
      areas: [
        { rect: [0, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 3, 8] },
        { rect: [4, 0, 1, 8], secondary: true }
      ],
      zoom: 0.7,
      secret: true
    },
    // 7:00 #6 (Le Slo)
    {
      id: 'le slo',
      offset: [2, 53],
      areas: [
        { rect: [2, 0, 7, 1], secondary: true },
        { rect: [0, 1, 9, 7] },
        { rect: [9, 1, 1, 7], secondary: true, camera: 'pull-horizontal' },
        { rect: [0, 8, 8, 1], secondary: true }
      ],
      zoom: 0.7,
      credit: "Le Slo",
      simulationBoundsAdjustment: {
        maxY: 2
      },
      label: 'Level A.15',
      latest: [
        { object: 'platformmark1_below', position: [7, 7] }
      ]
    },
    // 7:00 Return to clock from (Le Slo)
    {
      id: 'return-to-clock',
      offset: [12, 48],
      areas: [
        { rect: [1, 3, 3, 7], camera: 'follow-player' },
        { rect: [1, 0, 13, 3], camera: 'follow-player' },
        { rect: [0, 10, 4, 3], camera: 'follow-player' }
      ],
      zoom: 0.7
    },
    // 9:00 #1 (Joseph Mansfield)
    {
      id: 'joseph mansfield inflate intro',
      offset: [16, 37],
      areas: [
        { rect: [1, 0, 7, 11] },
        { rect: [8, 1, 1, 10], secondary: true, camera: 'pull-horizontal' },
        { rect: [9, 5, 1, 6], secondary: true, camera: 'pull-horizontal' },
        { rect: [0, 2, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      label: 'Level A.16'
    },
    // 9:00 Block source
    {
      id: 'clementsparrow block source',
      offset: [13, 38],
      areas: [
        { rect: [0, 0, 4, 6] },
        { rect: [0, 6, 3, 3] }
      ],
      zoom: 0.6,
      simulateAlso: [
        'clementsparrow',
        'clementsparrow secret 1',
        'clementsparrow secret 2 release',
        'clementsparrow secret 2'
      ],
      simulationBoundsAdjustment: {
        maxX: 2
      },
      label: 'Level A.17'
    },
    // 9:00 #2 (clementsparrow)
    {
      id: 'clementsparrow',
      offset: [5, 38],
      areas: [
        { rect: [0, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [1, 1, 7, 7] },
        { rect: [2, 8, 4, 3], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.60,
      credit: "clementsparrow",
      simulateAlso: [
        'joseph mansfield inflate intro',
        'clementsparrow block source',
        'clementsparrow secret 1',
        'clementsparrow secret 2 release',
        'clementsparrow secret 2'
      ],
      simulationBoundsAdjustment: {
        maxX: 2
      },
      label: 'Level A.17'
    },
    // 9:00 clementsparrow secret 1
    {
      id: 'clementsparrow secret 1',
      offset: [-1, 36],
      areas: [
        { rect: [0, 0, 5, 5] },
        { rect: [1, 5, 3, 4] },
        { rect: [4, 6, 2, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6,
      secret: true,
      simulateAlso: [
        'joseph mansfield inflate intro',
        'clementsparrow block source',
        'clementsparrow',
        'clementsparrow secret 2 release',
        'clementsparrow secret 2'
      ]
    },
    // 9:00 clementsparrow secret 2 release
    {
      id: 'clementsparrow secret 2 release',
      offset: [6, 35],
      areas: [
        { rect: [0, 0, 8, 3] }
      ],
      zoom: 0.7,
      simulateAlso: [
        'joseph mansfield inflate intro',
        'clementsparrow block source',
        'clementsparrow',
        'clementsparrow secret 1',
        'clementsparrow secret 2'
      ],
      simulationBoundsAdjustment: {
        maxX: -2
      },
      label: 'Level A.17'
    },
    // 9:00 clementsparrow secret 2
    {
      id: 'clementsparrow secret 2',
      offset: [-1, 45],
      areas: [
        { rect: [0, 0, 5, 5] },
        { rect: [5, 1, 3, 3] }
      ],
      zoom: 0.7,
      simulateAlso: [
        'joseph mansfield inflate intro',
        'clementsparrow block source',
        'clementsparrow',
        'clementsparrow secret 1',
        'clementsparrow secret 2 release'
      ],
      secret: true
    },
    // 9:00 #3 (Deusovi)
    {
      id: 'deusovi',
      offset: [6, 25],
      areas: [
        { rect: [0, -1, 13, 11] },
        { rect: [6, 10, 7, 1], secondary: true },
        { rect: [13, 2, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.65,
      credit: "Deusovi",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level A.18'
    },
    // 9:00 #4 (crychair)
    {
      id: 'crychair',
      offset: [20, 26],
      areas: [
        { rect: [0, 0, 1, 10], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 10] },
        { rect: [8, 2, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [9, 7, 2, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      credit: "crychair",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level A.19'
    },
    // Fusion intro
    {
      id: 'fusion-intro',
      offset: [29, 22],
      areas: [
        { rect: [0, 0, 9, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 9, 6] },
        { rect: [0, 7, 9, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [3, 8, 3, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level A.20'
    },
    // (PedroPSI)
    {
      id: 'pedropsi',
      offset: [27, 11],
      areas: [
        { rect: [4, 0, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [4, 1, 5, 1] },
        { rect: [3, 2, 7, 1] },
        { rect: [0, 3, 13, 7] },
        { rect: [0, 10, 13, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.7,
      credit: "Pedro PSI",
      simulationBoundsAdjustment: {
        maxY: 3
      },
      label: 'Level A.21'
    },
    // Branch A finish
    {
      id: 'branch a finish',
      offset: [25, -3],
      areas: [
        { rect: [0, 0, 17, 14] },
      ],
      zoom: 0.58,
      simulationBoundsAdjustment: {
        maxX: 1,
        maxY: 1
      },
      finish: true
    },
    //////////////
    // BRANCH B
    //////////////
    // Branch B exit path
    {
      id: 'branch b exit path',
      offset: [87, 8],
      areas: [
        { rect: [0, 0, 3, 9], camera: 'follow-player' },
        { rect: [-4, -4, 7, 4], camera: 'follow-player' },
      ],
      zoom: 0.6,
      simulationBoundsAdjustment: {
        minX: -2,
        maxX: 2,
        maxY: 1
      }
    },
    // Branch B finish
    {
      id: 'branch b finish',
      offset: [89, -8],
      areas: [
        { rect: [1, 0, 17, 11] },
        { rect: [1, 11, 16, 1] },
        { rect: [1, 12, 16, 4] },
      ],
      zoom: 0.56,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      finish: true
    },
    // (Pichusuperlover)
    {
      id: 'pichusuperlover',
      offset: [90, 8],
      areas: [
        { rect: [0, 0, 1, 6], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 12, 6] },
        { rect: [13, 0, 1, 6], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 6, 8, 2] }
      ],
      zoom: 0.7,
      credit: "Pichusuperlover",
      simulationBoundsAdjustment: {
        minX: -2,
        maxX: 2
      },
      label: 'Level B.1'
    },
    // (Mischka Kamener)
    {
      id: 'mischka kamener',
      offset: [104, 2],
      areas: [
        { rect: [0, 7, 1, 5], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 6, 6, 6] },
        { rect: [7, 6, 1, 3] },
      ],
      zoom: 0.65,
      credit: "Mischka Kamener",
      label: 'Level B.2'
    },
    // (Mischka Kamener part 2)
    {
      id: 'mischka kamener part 2',
      offset: [104, 1],
      areas: [
        { rect: [1, 0, 6, 7] },
        { rect: [7, 2, 5, 5] }
      ],
      zoom: 0.65,
      credit: "Mischka Kamener",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level B.3'
    },
    // (Joseph Mansfield #1)
    {
      id: 'joseph mansfield sticky intro 1',
      offset: [113, -4],
      areas: [
        { rect: [0, -1, 9, 2], secondary: true },
        { rect: [0, 1, 9, 5] },
        { rect: [0, 6, 9, 1], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.8,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level B.4'
    },
    // (Joseph Mansfield #2)
    {
      id: 'joseph mansfield sticky intro 2',
      offset: [116, 1],
      areas: [
        { rect: [3, 2, 8, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 3, 12, 5] },
        { rect: [0, 8, 5, 2] }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        minY: -2
      },
      label: 'Level B.5'
    },
    // Corridor to Justas
    {
      id: 'justas corridor',
      offset: [128, 3],
      areas: [
        { rect: [0, 0, 4, 11], camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxY: 1
      }
    },
    // (Justas)
    {
      id: 'justas',
      offset: [122, 14],
      areas: [
        { rect: [6, 0, 4, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [1, 1, 9, 1] },
        { rect: [0, 2, 11, 9] },
        { rect: [-1, 8, 1, 3] }
      ],
      zoom: 0.7,
      credit: "Justas",
      simulationBoundsAdjustment: {
        minX: -2,
        maxY: 1
      },
      label: 'Level B.6',
      latest: [
        { object: 'platformmark2_below', position: [8, 3] }
      ]
    },
    // (That Scar)
    {
      id: 'that scar',
      offset: [110, 18],
      areas: [
        { rect: [11, 2, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 10, 7] },
        { rect: [-1, 0, 2, 5], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      credit: "That Scar",
      simulationBoundsAdjustment: {
        maxX: 2
      },
      label: 'Level B.7'
    },
    // Wall_Above intro
    {
      id: 'wall above intro',
      offset: [109, 12],
      areas: [
        { rect: [0, 2, 2, 4], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 0, 11, 6] }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        minX: -2,
        maxX: 2,
        maxY: 1
      },
      label: 'Level B.8'
    },
    // Slime storage
    {
      id: 'slime storage',
      offset: [109, 12],
      areas: [
        { rect: [13, -3, 7, 7] }
      ],
      zoom: 0.8,
      label: 'Slime Storage'
    },
    // (winterbeak)
    {
      id: 'winterbeak',
      offset: [91, 14],
      areas: [
        { rect: [10, 0, 6, 2], secondary: true },
        { rect: [16, 0, 2, 2], secondary: true, camera: 'pull-horizontal' },
        { rect: [17, 2, 1, 1], secondary: true },
        { rect: [0, 2, 17, 8] },
        { rect: [0, 10, 17, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [2, 11, 3, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.65,
      credit: "winterbeak",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level B.9'
    },
    // Corridor
    {
      id: 'winterbeak corridor',
      offset: [93, 26],
      areas: [
        { rect: [-3, 0, 10, 3] }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxY: 1
      }
    },
    // (Dan Williams)
    {
      id: 'dan williams',
      offset: [89, 29],
      areas: [
        { rect: [3, 0, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 11, 7] },
        { rect: [1, 8, 9, 1], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.7,
      credit: "Dan Williams",
      simulationBoundsAdjustment: {
        minX: -2,
        minY: -2,
        maxY: 1
      },
      label: 'Level B.10'
    },
    // Main path lock
    {
      id: 'top right main path lock',
      offset: [86, 30],
      areas: [
        { rect: [-1, 0, 4, 5] }
      ],
      zoom: 0.7,
      simulateAlso: ['intro top right arm', 'intro top intersection'],
      simulationBoundsAdjustment: {
        minX: -2
      },
      label: 'Connections'
    },
    // (Guilherme Tows (zaratustra))
    {
      id: 'zaratustra',
      offset: [82, 35],
      areas: [
        { rect: [0, 0, 8, 10] },
        { rect: [8, 3, 4, 8] },
        { rect: [3, 10, 5, 1] },
        { rect: [12, 3, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [13, 3, 1, 4], secondary: true, camera: 'pull-horizontal' },
        { rect: [-4, 4, 4, 5], secondary: true, camera: 'pull-horizontal' },
        { rect: [4, 11, 5, 3], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.7,
      credit: "zaratustra",
      label: 'Level B.11'
    },
    // (Muftwin)
    {
      id: 'muftwin',
      offset: [75, 46],
      areas: [
        { rect: [3, -2, 5, 3], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 11, 1], secondary: true },
        { rect: [0, 2, 11, 9] },
        { rect: [0, 11, 11, 1] },
        { rect: [4, 12, 5, 3], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.53,
      credit: "Muftwin",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level B.12',
      latest: [
        { object: 'belt_below', position: [7, 11] }
      ]
    },
    // (Colin)
    {
      id: 'colin',
      offset: [83, 52],
      areas: [
        { rect: [1, 6, 2, 1], secondary: true },
        { rect: [1, 7, 7, 2], secondary: true, camera: 'pull-vertical' },
        { rect: [3, 0, 7, 7] },
        { rect: [3, -2, 7, 2], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.6,
      credit: "Colin",
      label: 'Level B.13'
    },
    // Explosive intro
    {
      id: 'explosive intro',
      offset: [93, 46],
      areas: [
        { rect: [0, 0, 5, 8] },
        { rect: [-2, 0, 2, 3], secondary: true, camera: 'pull-horizontal' },
      ],
      zoom: 0.6,
      label: 'Level B.14'
    },
    // (Toombler)
    {
      id: 'toombler',
      offset: [98, 37],
      areas: [
        { rect: [2, 0, 11, 5] },
        { rect: [0, 5, 13, 1] },
        { rect: [1, 6, 10, 6] },
        { rect: [0, 6, 1, 6], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6,
      credit: "Toombler",
      simulationBoundsAdjustment: {
        minX: -2,
        maxX: 2,
        maxY: 1
      },
      label: 'Level B.15'
    },
    // stevenjmiller's bomb secret corridor
    {
      id: 'stevenjmiller bomb secret corridor',
      offset: [109, 43],
      areas: [
        { rect: [0, 0, 5, 5] },
        { rect: [1, 5, 3, 1] },
        { rect: [-1, 6, 5, 2] },
        { rect: [-1, 8, 6, 4] },
        { rect: [1, 12, 4, 1] },
        { rect: [-5, 8, 4, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6,
      simulationBoundsAdjustment: {
        minX: -2,
        maxY: 2
      },
      latest: [
        { object: 'platformmark2_below', position: [1, 1] }
      ]
    },
    // stevenjmiller's bomb secret
    {
      id: 'stevenjmiller bomb secret',
      offset: [114, 52],
      areas: [
        { rect: [0, 1, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 5, 5] }
      ],
      zoom: 0.6,
      secret: true
    },
    // Joseph Mansfield's secret
    {
      id: 'joseph mansfield bomb secret',
      offset: [107, 55],
      areas: [
        { rect: [0, 0, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 5, 4] },
        { rect: [0, 5, 5, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.6,
      simulationBoundsAdjustment: {
        minY: -2,
        maxY: 2
      }
    },
    // Joseph Mansfield's secret #2
    {
      id: 'joseph mansfield bomb secret 2',
      offset: [107, 61],
      areas: [
        { rect: [1, 0, 3, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 2, 5, 3] },
        { rect: [0, 5, 5, 1], secondary: true }
      ],
      zoom: 0.6,
      secret: true
    },
    // (Joseph Mansfield)
    {
      id: 'joseph mansfield bomb',
      offset: [98, 51],
      areas: [
        { rect: [3, 0, 3, 3], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 3, 9, 13] },
        { rect: [3, 16, 3, 2], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.56,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level B.16'
    },
    // Main path branch
    {
      id: 'bottom right main path branch',
      offset: [99, 69],
      areas: [
        { rect: [-1, 0, 1, 2] },
        { rect: [-1, 4, 1, 2] },
        { rect: [0, 0, 5, 6] },
        { rect: [5, 0, 1, 6], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6,
      simulateAlso: ['intro bottom right arm 2', 'intro bottom right arm 1-2 node'],
      simulationBoundsAdjustment: {
        maxX: 3,
        maxY: 1
      },
      label: 'Connections',
      latest: [
        { object: 'wall', position: [4, 2] }
      ]
    },
    // (Joel)
    {
      id: 'joel',
      offset: [105, 68],
      areas: [
        { rect: [0, 0, 1, 7], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 1, 7] },
        { rect: [2, 0, 4, 9] },
        { rect: [6, 0, 3, 8] },
        { rect: [9, 1, 1, 7], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6,
      credit: "Joel",
      simulationBoundsAdjustment: {
        minX: -4,
        maxX: 3
      },
      label: 'Level B.17'
    },
    // Corridor
    {
      id: 'joel corridor',
      offset: [115, 68],
      areas: [
        { rect: [1, 0, 5, 1] },
        { rect: [0, 1, 12, 3] },
        { rect: [8, 0, 4, 1] },
        { rect: [9, -1, 3, 1] },
        { rect: [9, 4, 3, 1] },
        { rect: [0, 4, 7, 6] }
      ],
      zoom: 0.6,
      simulationBoundsAdjustment: {
        minX: -3,
        maxX: 3,
        minY: -2,
        maxY: 1
      },
      latest: [
        { object: 'wall', position: [4, 1] }
      ]
    },
    // Corridor secret #1
    {
      id: 'joel corridor secret 1',
      offset: [124, 63],
      areas: [
        { rect: [0, 1, 3, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 0, 4, 10] }
      ],
      zoom: 0.6,
      secret: true
    },
    // Corridor secret #2
    {
      id: 'joel corridor secret 2',
      offset: [122, 73],
      areas: [
        { rect: [0, 1, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 5, 5] }
      ],
      zoom: 0.6,
      secret: true
    },
    // (Notan)
    {
      id: 'notan',
      offset: [115, 57],
      areas: [
        { rect: [0, 0, 11, 5] },
        { rect: [0, 5, 9, 5] },
        { rect: [2, 10, 7, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [5, -2, 5, 2], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.6,
      credit: "Notan",
      simulationBoundsAdjustment: {
        maxY: 4
      },
      label: 'Level B.18'
    },
    // (Zach)
    {
      id: 'zach',
      offset: [113, 40],
      areas: [
        { rect: [11, 0, 6, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [11, 1, 6, 1] },
        { rect: [2, 2, 15, 5] },
        { rect: [0, 7, 18, 5] },
        { rect: [7, 12, 5, 3], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.6,
      credit: "Zach",
      simulationBoundsAdjustment: {
        minX: -2,
        maxY: 1
      },
      label: 'Level B.19'
    },
    // (Zach) secret
    {
      id: 'zach secret',
      offset: [125, 52],
      areas: [
        { rect: [1, 0, 3, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 5, 5] }
      ],
      zoom: 0.6,
      secret: true
    },
    // Return corridor
    {
      id: 'zach return corridor',
      offset: [111, 39],
      areas: [
        { rect: [0, 0, 8, 3], camera: 'follow-player' },
        { rect: [4, -2, 4, 2], camera: 'follow-player' },
        { rect: [4, -3, 3, 1], camera: 'follow-player' },
      ],
      zoom: 0.6,
      simulationBoundsAdjustment: {
        maxY: 1
      }
    },
    // (Joseph Mansfield) Vat introduction
    {
      id: 'vat introduction',
      offset: [124, 29],
      areas: [
        { rect: [0, 0, 1, 10], secondary: true, camera: 'pull-horizontal' },
        { rect: [-2, 0, 2, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 10] },
        { rect: [0, 10, 8, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.6,
      simulationBoundsAdjustment: {
        minX: -2,
        maxY: 1
      },
      label: 'Level B.20'
    },
    // (Shark)
    {
      id: 'shark',
      offset: [100, 25],
      areas: [
        { rect: [0, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 8, 8] },
        { rect: [9, 0, 3, 9] },
        { rect: [12, 0, 9, 11] },
        { rect: [21, 1, 1, 10], secondary: true, camera: 'pull-horizontal' },
      ],
      zoom: 0.6,
      credit: "shark",
      simulationBoundsAdjustment: {
        maxX: 2,
        maxY: 1
      },
      label: 'Level B.21'
    },
    // (Shark) secret
    {
      id: 'shark secret',
      offset: [122, 24],
      areas: [
        { rect: [0, 1, 3, 4], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 1, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [4, 0, 5, 5] }
      ],
      zoom: 0.7,
      secret: true,
      simulationBoundsAdjustment: {
        maxY: 1
      }
    },
    // (twak)
    {
      id: 'twak',
      offset: [82, 17],
      areas: [
        { rect: [0, 0, 8, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 7, 10] },
        { rect: [5, 11, 2, 1] },
        { rect: [7, 1, 1, 11], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6,
      credit: "twak",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level B.22'
    },
    //////////////
    // MERGE
    //////////////
    // (Jack Lance)
    {
      id: 'jack lance',
      offset: [77, -6],
      areas: [
        { rect: [1, 0, 12, 11] },
        { rect: [-3, -1, 7, 1], secondary: true },
        { rect: [-3, 0, 4, 10], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6,
      credit: "Jack Lance",
      simulationBoundsAdjustment: {
        maxY: 2
      },
      label: 'Level AB.1'
    },
    // Ending gate
    {
      id: 'ending gate',
      offset: [65, -18],
      areas: [
        { rect: [3, -1, 3, 1] },
        { rect: [0, 0, 9, 16] },
        { rect: [0, 16, 9, 1], secondary: true }
      ],
      zoom: 0.48,
      endingGate: true,
      simulationBoundsAdjustment: {
        maxX: 2,
        maxY: 1
      },
      label: 'Security Clearance'
    },
    // Ending gate corridor
    {
      id: 'ending gate corridor',
      offset: [65, -25],
      areas: [
        { rect: [0, 0, 3, 7] },
        { rect: [3, 1, 3, 5] },
        { rect: [6, 0, 3, 7] }
      ],
      zoom: 0.6,
      allowSave: false,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Security Clearance'
    },
    // Merge corridor #1
    {
      id: 'merge corridor 1',
      offset: [50, -7],
      areas: [
        { rect: [-2, 0, 17, 4], camera: 'follow-player' },
        { rect: [7, 4, 3, 2], camera: 'follow-player' }
      ],
      zoom: 0.6,
      mergeCorridor: true,
      simulationBoundsAdjustment: {
        maxX: 4
      },
      label: 'Security Clearance'
    },
    // (D5R)
    {
      id: 'd5r',
      offset: [48, -21],
      areas: [
        { rect: [0, -1, 12, 11] }
      ],
      zoom: 0.7,
      credit: "D5R",
      simulationBoundsAdjustment: {
        maxX: 2,
        maxY: 1
      },
      label: 'Level AB.3',
      latest: [
        { object: 'wall', position: [9, 8] }
      ]
    },
    // (D5R) Block release
    {
      id: 'd5r block release',
      offset: [60, -17],
      areas: [
        { rect: [0, 0, 4, 10] }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level AB.3'
    },
    // Ethan Clark secret corridor #1
    {
      id: 'ethan clark secret corridor 1',
      offset: [53, -4],
      areas: [
        { rect: [0, 0, 1, 5], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 3, 8] },
        { rect: [4, 0, 1, 5], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // Ethan Clark secret corridor #2
    {
      id: 'ethan clark secret corridor 2',
      offset: [42, -3],
      areas: [
        { rect: [-1, 0, 1, 3], camera: 'follow-player' },
        { rect: [0, 0, 11, 4], camera: 'follow-player' }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxX: 1
      }
    },
    // (Ethan Clark)
    {
      id: 'ethan clark',
      offset: [55, -2],
      areas: [
        { rect: [2, 2, 1, 5], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 2, 1, 5] },
        { rect: [4, 0, 2, 7] },
        { rect: [6, 0, 4, 8] },
        { rect: [10, 1, 1, 7] },
        { rect: [11, 1, 4, 6], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      credit: "Ethan Clark",
      simulationBoundsAdjustment: {
        minX: -2,
        maxX: 2
      },
      label: 'Level AB.2'
    },
    // (Ethan Clark) block release
    {
      id: 'ethan clark block release',
      offset: [55, -2],
      areas: [
        { rect: [15, 1, 3, 6] }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        minY: -3
      },
      label: 'Level AB.2'
    },
    // stevenjmiller bonus puzzle
    {
      id: 'stevenjmiller bonus puzzle',
      offset: [27, -15],
      areas: [
        { rect: [-2, 0, 2, 12], secondary: true, camera: 'pull-horizontal' },
        { rect: [0, 0, 17, 12] }
      ],
      zoom: 0.65,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level S.2'
    },
    // stevenjmiller bonus puzzle secret
    {
      id: 'stevenjmiller bonus puzzle secret',
      offset: [25, -19],
      areas: [
        { rect: [0, 1, 8, 3], camera: 'follow-player' },
        { rect: [8, 0, 5, 5], camera: 'follow-player' },
        { rect: [13, 1, 6, 3], camera: 'follow-player' }
      ],
      zoom: 0.7,
      secret: true
    },
    // Merge corridor #2
    {
      id: 'merge corridor 2',
      offset: [44, -23],
      areas: [
        { rect: [0, 0, 4, 20], camera: 'follow-player' },
        { rect: [4, 0, 1, 3], camera: 'follow-player' },
        { rect: [4, 13, 3, 3], camera: 'follow-player' },
        { rect: [7, 12, 4, 4], camera: 'follow-player' }
      ],
      zoom: 0.6,
      mergeCorridor: true,
      simulationBoundsAdjustment: {
        maxX: 3
      },
      label: 'Security Clearance'
    },
    // (jackk)
    {
      id: 'jackk',
      offset: [29, -37],
      areas: [
        { rect: [0, 0, 23, 14] },
        { rect: [23, 0, 4, 12] },
        { rect: [27, 0, 6, 10] }
      ],
      zoom: 0.48,
      credit: "jackk",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level AB.4'
    },
    // (jackk) Block release
    {
      id: 'jackk block release',
      offset: [21, -29],
      areas: [
        { rect: [0, 0, 8, 6] }
      ],
      zoom: 0.7,
      blockRelease: [3, 7],
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level AB.4'
    },
    // Merge corridor #3
    {
      id: 'merge corridor 3',
      offset: [21, -23],
      areas: [
        { rect: [0, 0, 23, 4], camera: 'follow-player' }
      ],
      zoom: 0.6,
      mergeCorridor: true,
      simulationBoundsAdjustment: {
        maxX: 3,
        maxY: 1
      },
      label: 'Security Clearance'
    },
    // Merge corridor #4
    {
      id: 'merge corridor 4',
      offset: [21, -19],
      areas: [
        { rect: [0, 0, 4, 24], camera: 'follow-player' },
        { rect: [-3, 2, 3, 8], camera: 'follow-player' },
        { rect: [-5, 6, 2, 3], camera: 'follow-player' }
      ],
      zoom: 0.6,
      mergeCorridor: true,
      simulationBoundsAdjustment: {
        minY: -2,
        maxY: 1
      },
      label: 'Security Clearance'
    },
    // (domcamus)
    {
      id: 'domcamus',
      offset: [-1, -13],
      areas: [
        { rect: [0, 0, 17, 3] },
        { rect: [0, 3, 20, 6] },
        { rect: [0, 9, 19, 4] },
        { rect: [0, 13, 21, 5] },
      ],
      zoom: 0.47,
      credit: "domcamus",
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level AB.5',
      latest: [
        { object: 'wall', position: [1, 4] }
      ],
      ensureObjects: [
        { object: 'vwallborderl_top', position: [18, 9] },
        { object: 'vwallborderl', position: [18, 10] },
        { object: 'vwallborderd', position: [18, 11], remove: true },
        { object: 'wall2_top', position: [18, 11] },
        { object: 'platform2_top', position: [19, 12] },
        { object: 'platform2_front', position: [19, 12], remove: true }
      ]
    },
    // (domcamus) Block release
    {
      id: 'domcamus block release',
      offset: [17, -5],
      areas: [
        { rect: [1, 0, 3, 1] },
        { rect: [0, 1, 4, 3] },
        { rect: [1, 4, 3, 1] }
      ],
      zoom: 0.47,
      blockRelease: [5, 2],
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level AB.5'
    },
    // domcamus secret corridor
    {
      id: 'domcamus secret corridor',
      offset: [8, -18],
      areas: [
        { rect: [0, 0, 3, 5] },
        { rect: [3, 1, 7, 4] }
      ],
      zoom: 0.6,
      simulationBoundsAdjustment: {
        maxY: 1
      }
    },
    // remote gamepad bonus puzzle
    {
      id: 'gamepad bonus puzzle',
      offset: [1, -34],
      areas: [
        { rect: [0, 0, 20, 6] },
        { rect: [0, 6, 14, 10] }
      ],
      zoom: 0.52,
      indirectSecret: 'gamepad bonus puzzle secret',
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level S.3'
    },
    // remote gamepad bonus puzzle secret
    {
      id: 'gamepad bonus puzzle secret',
      offset: [1, -34],
      areas: [
        { rect: [14, 6, 5, 5] }
      ],
      zoom: 0.52,
      secret: true
    },
    // Merge corridor #5
    {
      id: 'merge corridor 5',
      offset: [11, 5],
      areas: [
        { rect: [0, 0, 14, 4], camera: 'follow-player' }
      ],
      zoom: 0.6,
      mergeCorridor: true,
      simulationBoundsAdjustment: {
        minY: -3,
        maxY: 1
      },
      label: 'Security Clearance'
    },
    // (stevenjmiller)
    {
      id: 'stevenjmiller',
      offset: [3, 10],
      areas: [
        { rect: [0, 0, 19, 13] },
        { rect: [13, -1, 4, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.58,
      credit: "stevenjmiller",
      simulationBoundsAdjustment: {
        minY: -2
      },
      label: 'Level AB.6'
    },
    // (stevenjmiller) Block release
    {
      id: 'stevenjmiller block release',
      offset: [6, 5],
      areas: [
        { rect: [0, 0, 5, 5] }
      ],
      zoom: 0.6,
      blockRelease: [4, 2],
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level AB.6'
    },
    // stevenjmiller bonus puzzle 2
    {
      id: 'stevenjmiller bonus puzzle 2',
      offset: [74, -18],
      areas: [
        { rect: [0, 7, 1, 4], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 3, 18, 9] },
        { rect: [15, 12, 4, 1] },
        { rect: [10, -2, 8, 4] },
        { rect: [10, 2, 9, 1] }
      ],
      zoom: 0.57,
      label: 'Level S.4'
    },
    // stevenjmiller bonus puzzle 2 secret
    {
      id: 'stevenjmiller bonus puzzle 2 secret',
      offset: [74, -18],
      areas: [
        { rect: [4, -3, 5, 5] },
        { rect: [9, -2, 1, 4] },
        { rect: [1, -2, 3, 5] }
      ],
      zoom: 0.57,
      secret: true,
      copyCameraAnchor: 'stevenjmiller bonus puzzle 2',
      simulationBoundsAdjustment: {
        maxY: 1
      }
    },
    // Ending
    {
      id: 'ending',
      offset: [63, -37],
      areas: [
        { rect: [0, 0, 13, 13] }
      ],
      zoom: 0.6,
      allowSave: false,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Final Experiment'
    },
    //////////////
    // SECOND ENDING
    //////////////
    // (Second ending gate)
    {
      id: 'second ending gate',
      offset: [122, -5],
      areas: [
        { rect: [0, 0, 10, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 10, 6] },
        { rect: [0, 7, 10, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.7,
      secondEndingGate: [[1, 4], [1, 1]],
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: '????'
    },
    // (Second ending secret room)
    {
      id: 'second ending secret room',
      offset: [112, -21],
      areas: [
        { rect: [7, 1, 9, 2] },
        { rect: [5, 3, 13, 1] },
        { rect: [0, 4, 18, 12] }
      ],
      zoom: 0.52,
      secret: true,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      sigilCPositions: [[14, 1], [3, 4]],
      label: '????'
    },
    // (Second ending final corridor)
    {
      id: 'second ending final corridor',
      offset: [119, -26],
      areas: [
        { rect: [0, 0, 9, 6] }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: '????'
    },
    // (Second ending final room)
    {
      id: 'second ending final room',
      offset: [116, -37],
      areas: [
        { rect: [-6, 0, 23, 11] },
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Simple Researcher',
      latest: [
        { object: 'inflatable', position: [0, 2] }
      ]
    },
    // (Second ending optional corridor #1)
    {
      id: 'second ending optional corridor 1',
      offset: [108, -16],
      areas: [
        { rect: [0, 0, 4, 9] }
      ],
      zoom: 0.65,
      label: '????'
    },
    // (Second ending optional corridor #2)
    {
      id: 'second ending optional corridor 2',
      offset: [94, -11],
      areas: [
        { rect: [0, 0, 14, 4] }
      ],
      zoom: 0.65,
      label: '????'
    },
    // (Second ending optional corridor #3)
    {
      id: 'second ending optional corridor 3',
      offset: [94, -20],
      areas: [
        { rect: [0, 0, 4, 9] },
        { rect: [-2, 0, 2, 3] }
      ],
      zoom: 0.65,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: '????'
    },
    // (stevenjmiller) optional bonus puzzle
    {
      id: 'stevenjmiller optional bonus puzzle',
      offset: [79, -37],
      areas: [
        { rect: [0, 0, 30, 17] },
        { rect: [5, 17, 6, 1] }
      ],
      zoom: 0.5,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level S.5',
      latest: [
        { object: 'wall', position: [2, 14] },
        { object: 'inflatable_top', position: [20, -1] }
      ]
    },
    // (stevenjmiller) optional bonus reward
    {
      id: 'stevenjmiller optional bonus reward',
      offset: [109, -26],
      areas: [
        { rect: [0, 0, 9, 9] },
        { rect: [9, 5, 1, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7,
      simulationBoundsAdjustment: {
        maxY: 1
      },
      label: 'Level S.5'
    }
  ]
];

var theme2Areas = [
  // B branch
  [110, -39, Infinity, 13],
  [119, -26, Infinity, Infinity],
  [112, -18, Infinity, Infinity],
  [77, -7, 13, 12],
  [90, -6, 2, 11],
  [92, -7, Infinity, 12],
  [80, 5, Infinity, 13],
  [82, 18, Infinity, Infinity],
  [79, 31, Infinity, Infinity],
  [71, 33, Infinity, Infinity],
  // [0, 5, 25, 18],
  // [1, -19, 13, 11],
  // (Patrick)
  [52, 21, 12, 8],
  [52, 29, 11, 3],
  [55, 32, 4, 1 ],
  // (Blookerstein)
  [76, 18, 6, 11 ],
  // Ending
  [63, -38, 15, 3],
  [62, -35, 16, 4],
  [62, -31, 2, 11],
  [61, -24, 1, 4],
  [60, -22, 1, 2],
  [64, -19, 1, 10],
  // (D5R)
  [48, -20, 5, 2],
  [44, -18, 20, 10],
  [43, -14, 1, 3],
  [44, -8, 10, 5],
  [54, -8, 3, 1],
  [53, -21, 11, 3],
  // (domcamus)
  [21, -18, 23, 4],
  [20, -16, 1, 2],
  [-1, -14, 26, 4],
  [-1, -10, 26, 5],
  [-1, -5, 23, 6],
  [-1, 1, 22, 4],
];

var secretRegions = [
  'clementsparrow secret 1',
  'clementsparrow secret 2',
  'gamepad bonus puzzle secret',
  'le slo secret',
  'stevenjmiller bonus puzzle secret',
  'zomulgustar',
  '7:00 main path lock secret',
  'knexator secret',
  'jumble secret',
  'joseph mansfield secret',
  'intro top left arm secret',
  'intro bonus puzzle secret',
  'stevenjmiller bonus puzzle 2 secret',
  'joseph mansfield bomb secret 2',
  'second ending secret room',
  'stevenjmiller bomb secret',
  'shark secret',
  'zach secret',
  'joel corridor secret 1',
  'joel corridor secret 2'
];

var regionMap = [];
var regionIds = {};
var secrets = [];
var sigilPositions = [];
var sigilCPositions = [];

function initRegions() {
  regionMap = [];

  var levelRegions = regions[curlevel] || [];

  var haveStartRegion = false;

  var secretMarkerIndexes = [];

  for (var x = 0; x < level.width; x++) {
    var regionMapColumn = [];
    for (var y = 0; y < level.height; y++) {
      regionMapColumn.push(null)

      var positionIndex = y + x * level.height;
      var cell = level.getCell(positionIndex);
      if (cell.anyBitsInCommon(state.objectMasks['secret_off'])) {
        secretMarkerIndexes.push(positionIndex);
      }

      for (var i = 0; i < theme2Areas.length; i++) {
        var theme2Area = theme2Areas[i];
        var minX = regionsOffset[0] + theme2Area[0];
        var maxX = minX + theme2Area[2];
        var minY = regionsOffset[1] + theme2Area[1];
        var maxY = minY + theme2Area[3];
        if (x >= minX && x < maxX && y >= minY && y < maxY) {
          cell.ior(state.objectMasks['theme2']);
          level.setCell(positionIndex, cell);
          break;
        }
      }
    }
    regionMap.push(regionMapColumn);
  }

  var secretCount = 0;

  for (var i = 0; i < levelRegions.length; i++) {
    if (levelRegions[i].id == null) {
      throw new Error('Region missing id');
    }
    regionIds[levelRegions[i].id] = i;
  }

  var currentLabelNumber = 1;

  for (var i = 0; i < levelRegions.length; i++) {
    var region = levelRegions[i];

    if (region.start) {
      if (haveStartRegion) {
        throw new Error('More than one start region')
      } else {
        haveStartRegion = true;
      }
    }

    var offsetX = regionsOffset[0] + region.offset[0];
    var offsetY = regionsOffset[1] + region.offset[1];

    region.absoluteOffset = [offsetX, offsetY];

    var minX = Infinity;
    var maxX = 0;
    var minY = Infinity;
    var maxY = 0;

    for (var j = 0; j < region.areas.length; j++) {
      if (region.areas[j].camera == null) {
        region.areas[j].camera = 'region-center';
      }

      var rect = region.areas[j].rect;

      var positionX = offsetX + rect[0];
      var positionY = offsetY + rect[1];

      for (var x = positionX; x < positionX + rect[2]; x++) {
        for (var y = positionY; y < positionY + rect[3]; y++) {
          regionMap[x][y] = [i, j];
        }
      }
    }

    var regionBounds = getRegionBounds(region);

    var cameraAnchorX = regionBounds.minX + ((regionBounds.maxX - regionBounds.minX) / 2);
    var cameraAnchorY = regionBounds.minY + ((regionBounds.maxY - regionBounds.minY) / 2);

    region.cameraAnchor = [cameraAnchorX, cameraAnchorY];
    region.bounds = regionBounds;

    region.fullBounds = getRegionBounds(region, true);

    region.outlinePolygon = calculateOutlinePolygon(region);
    region.index = i;
    region.secret = !!region.secret;

    if (region.simulateAll == null) {
      region.simulateAll = true;
    }

    if (region.allowReset == null) {
      region.allowReset = true;
    }

    if (region.allowSave == null) {
      region.allowSave = true;
    }

    if (region.simulationBoundsAdjustment == null) {
      region.simulationBoundsAdjustment = {};
    }

    if (region.secret) {
      for (var x = regionBounds.minX; x < regionBounds.maxX; x++) {
        for (var y = regionBounds.minY; y < regionBounds.maxY; y++) {
          var positionIndex = y + x * level.height;
          var cell = level.getCell(positionIndex);
          if (cell.anyBitsInCommon(state.objectMasks['button_below'])) {
            var markerIndexIndex = secretRegions.findIndex(function (regionId) {
              return regionId === region.id;
            });

            if (markerIndexIndex === -1) {
              throw new Error('Region has no corresponding secret marker:' + region.id);
            }

            var secret = {
              buttonIndex: positionIndex,
              region: region,
              markerIndex: secretMarkerIndexes[markerIndexIndex]
            };
            secrets.push(secret);
            region.secret = secret;
            secretCount++;
          }
        }
      }
    }

    if (region.secondEndingGate) {
      sigilPositions = [];
      sigilPositions.push((offsetX + region.secondEndingGate[0][0]) * level.height + (offsetY + region.secondEndingGate[0][1]));
      sigilPositions.push((offsetX + region.secondEndingGate[1][0]) * level.height + (offsetY + region.secondEndingGate[1][1]));
    }

    if (region.sigilCPositions) {
      sigilCPositions = [];
      sigilCPositions.push((offsetX + region.sigilCPositions[0][0]) * level.height + (offsetY + region.sigilCPositions[0][1]));
      sigilCPositions.push((offsetX + region.sigilCPositions[1][0]) * level.height + (offsetY + region.sigilCPositions[1][1]));
    }
  }

  if (secretCount !== secretRegions.length) {
    throw new Error('Expected ' + secretRegions.length + ' secret regions but there were ' + secretCount);
  }

  for (var i = 0; i < levelRegions.length; i++) {
    var region = levelRegions[i];

    if (region.copyCameraAnchor != null) {
      region.cameraAnchor = levelRegions[regionIds[region.copyCameraAnchor]].cameraAnchor;
    }

    region.simulationBounds = {
      minX: region.fullBounds.minX,
      maxX: region.fullBounds.maxX,
      minY: region.fullBounds.minY,
      maxY: region.fullBounds.maxY,
    };

    var simulateAlso = region.simulateAlso || [];

    for (var j = 0; j < simulateAlso.length; j++) {
      var alsoRegion = levelRegions[regionIds[simulateAlso[j]]];
      region.simulationBounds.minX = Math.min(region.simulationBounds.minX, alsoRegion.fullBounds.minX);
      region.simulationBounds.maxX = Math.max(region.simulationBounds.maxX, alsoRegion.fullBounds.maxX);
      region.simulationBounds.minY = Math.min(region.simulationBounds.minY, alsoRegion.fullBounds.minY);
      region.simulationBounds.maxY = Math.max(region.simulationBounds.maxY, alsoRegion.fullBounds.maxY);
    }

    if (region.simulationBoundsAdjustment != null) {
      region.simulationBounds.minX += -1 + (region.simulationBoundsAdjustment.minX || 0);
      region.simulationBounds.maxX += 1 + (region.simulationBoundsAdjustment.maxX || 0);
      region.simulationBounds.minY += -2 + (region.simulationBoundsAdjustment.minY || 0);
      region.simulationBounds.maxY += 1 + (region.simulationBoundsAdjustment.maxY || 0);
    }
  }
}

function getRegion(position) {
  return (regions[curlevel] || [])[getRegionIndex(position.x, position.y)];
}

function getArea(position) {
  var levelRegions = regions[curlevel] || [];

  var areaIndex = getAreaIndex(position.x, position.y);

  return levelRegions[areaIndex[0]].areas[areaIndex[1]];
}

function isAreaPrimary(position) {
  var area = getArea(position);
  return !area.secondary;
}

function getAreaIndex(x, y) {
  if ((regionMap[x] || [])[y] == null) {
    return null;
  }

  return regionMap[x][y];
}

function getRegionIndex(x, y) {
  var areaIndex = getAreaIndex(x, y);
  if (areaIndex == null) {
    return null;
  }

  return areaIndex[0];
}

function getActiveRegion () {
  return getRegion(playerPosition);
}

function getActiveArea () {
  return getArea(playerPosition);
}

function formatRegionMap() {
  var output = '';
  for (var y = 0; y < regionMap[0].length; y++) {
    for (var x = 0; x < regionMap.length; x++) {
      var regionIndex = getRegionIndex(x, y);
      output += regionIndex != null ? String.fromCharCode(48 + regionIndex) : '-';
    }
    output += '\n';
  }
  return output;
}

function getRegionBounds(region, includeSecondary = false) {
  var bounds = {
    minX: Infinity,
    maxX: 0,
    minY: Infinity,
    maxY: 0
  };

  var offsetX = regionsOffset[0] + region.offset[0];
  var offsetY = regionsOffset[1] + region.offset[1];

  var areas = region.areas.filter(function (area) {
    return includeSecondary || !area.secondary;
  });

  for (var j = 0; j < areas.length; j++) {
    var rect = areas[j].rect;

    var positionX = offsetX + rect[0];
    var positionY = offsetY + rect[1];

    if (positionX < bounds.minX) {
      bounds.minX = positionX;
    }
    if (positionY < bounds.minY) {
      bounds.minY = positionY;
    }

    if (positionX + rect[2] > bounds.maxX) {
      bounds.maxX = positionX + rect[2];
    }
    if (positionY + rect[3] > bounds.maxY) {
      bounds.maxY = positionY + rect[3];
    }
  }

  return bounds;
}

function getMaxRegionSize() {
  var maxRegionSize = {
    width: 0,
    height: 0
  };

  for (var i = 0; i < (regions[curlevel] || []).length; i++) {
    var hasPrimary = regions[curlevel][i].areas.some(function(area) { return !area.secondary; })
    if (!hasPrimary) {
      continue;
    }

    var regionBounds = getRegionBounds(regions[curlevel][i]);
    var regionWidth = regionBounds.maxX - regionBounds.minX;
    var regionHeight = regionBounds.maxY - regionBounds.minY;

    if (regionWidth > maxRegionSize.width) {
      maxRegionSize.width = regionWidth;
    }

    if (regionHeight > maxRegionSize.height) {
      maxRegionSize.height = regionHeight;
    }
  }

  return maxRegionSize;
}

function getMinRegionSize() {
  var minRegionSize = {
    width: Infinity,
    height: Infinity
  };

  for (var i = 0; i < (regions[curlevel] || []).length; i++) {
    var hasPrimary = regions[curlevel][i].areas.some(function(area) { return !area.secondary; })
    if (!hasPrimary) {
      continue;
    }

    var regionBounds = getRegionBounds(regions[curlevel][i]);
    var regionWidth = regionBounds.maxX - regionBounds.minX;
    var regionHeight = regionBounds.maxY - regionBounds.minY;

    if (regionWidth < minRegionSize.width) {
      minRegionSize.width = regionWidth;
    }

    if (regionHeight < minRegionSize.height) {
      minRegionSize.height = regionHeight;
    }
  }

  return minRegionSize;
}

function calculateOutlinePolygon(region) {
  var rects = region.areas.map(function (area) { return area.rect; });
    
  // Implementation of algorithm described here: https://stackoverflow.com/a/13851341/150634
  var points = [];

  var offset = [regionsOffset[0] + region.offset[0], regionsOffset[1] + region.offset[1]];

  for (var i = 0; i < rects.length; i++) {
    // We move the rectangle points out to align with pixel surrounding area
    var rectPoints = [
      [offset[0] + rects[i][0], offset[1] + rects[i][1]],
      [offset[0] + rects[i][0], offset[1] + rects[i][1] + rects[i][3]],
      [offset[0] + rects[i][0] + rects[i][2], offset[1] + rects[i][1]],
      [offset[0] + rects[i][0] + rects[i][2], offset[1] + rects[i][1] + rects[i][3]]
    ];

    for (var j = 0; j < rectPoints.length; j++) {
      var existingPointIndex = points.findIndex(function(point) {
        return point[0] === rectPoints[j][0] && point[1] === rectPoints[j][1];
      });

      if (existingPointIndex >= 0) {
        points.splice(existingPointIndex, 1);
      } else {
        points.push(rectPoints[j]);
      }
    }
  }

  var pointsByX = JSON.parse(JSON.stringify(points)).sort(function(pointA, pointB) {
    if (pointA[0] < pointB[0]) {
      return -1;
    }

    if (pointA[0] === pointB[0]) {
      if (pointA[1] < pointB[1]) {
        return -1;
      }

      if (pointA[1] > pointB[1]) {
        return 1;
      }

      return 0;
    }

    return 1;
  })

  var pointsByY = JSON.parse(JSON.stringify(points)).sort(function(pointA, pointB) {
    if (pointA[1] < pointB[1]) {
      return -1;
    }

    if (pointA[1] === pointB[1]) {
      if (pointA[0] < pointB[0]) {
        return -1;
      }

      if (pointA[0] > pointB[0]) {
        return 1;
      }

      return 0;
    }

    return 1;
  })

  var edgesH = {};
  var edgesV = {};

  var i = 0;
  while (i < points.length) {
    var currentY = pointsByY[i][1];
    while (i < points.length && pointsByY[i][1] === currentY) {
      edgesH[formatPoint(pointsByY[i])] = formatPoint(pointsByY[i + 1]);
      edgesH[formatPoint(pointsByY[i + 1])] = formatPoint(pointsByY[i]);
      i += 2;
    }
  }

  var i = 0;
  while (i < points.length) {
    var currentX = pointsByX[i][0];
    while (i < points.length && pointsByX[i][0] === currentX) {
      edgesV[formatPoint(pointsByX[i])] = formatPoint(pointsByX[i + 1]);
      edgesV[formatPoint(pointsByX[i + 1])] = formatPoint(pointsByX[i]);
      i += 2;
    }
  }

  var outlinePolygon = [];
  var horizontal = true;
  var initialPoint = parsePoint(Object.keys(edgesH)[0]);
  var currentPoint = initialPoint;

  while (true) {
    var edges = horizontal ? edgesH : edgesV;

    outlinePolygon.push(currentPoint);

    var formattedNextPoint = edges[formatPoint(currentPoint)];

    horizontal = !horizontal;
    currentPoint = parsePoint(formattedNextPoint);

    if (currentPoint[0] === initialPoint[0] && currentPoint[1] === initialPoint[1]) {
      break;
    }
  }

  return outlinePolygon;
}

function formatPoint(point) {
  return point[0] + ',' + point[1];
}

function parsePoint(formattedPoint) {
  var pointParts = formattedPoint.split(',');
  return [parseInt(pointParts[0]), parseInt(pointParts[1])]
}

function determineLatest (region) {
  if (region.latest == null) {
    return true;
  }

  for (var i = 0; i < region.latest.length; i++) {
    var requirement = region.latest[i];
    var x = region.absoluteOffset[0] + requirement.position[0];
    var y = region.absoluteOffset[1] + requirement.position[1];
    var positionIndex = x * level.height + y;

    var cell = level.getCell(positionIndex);
    var hasObject = cell.anyBitsInCommon(state.objectMasks[requirement.object]);
    if (requirement.missing ? hasObject : !hasObject) {
      return false;
    }
  }

  return true;
}

function checkSpawns() {
  for (var i = 0; i < regions[curlevel].length; i++) {
    var region = regions[curlevel][i];
    var regionBounds = region.fullBounds;
    var foundSpawn = false;
    for (var x = regionBounds.minX; x < regionBounds.maxX; x++) {
      for (var y = regionBounds.minY; y < regionBounds.maxY; y++) {
        var inRegion = getRegionIndex(x, y) === i;

        if (!inRegion) {
          continue;
        }

        var positionIndex = y + x * level.height;
        var cell = new BitVec(originalLevel.dat.subarray(positionIndex * STRIDE_OBJ, positionIndex * STRIDE_OBJ + STRIDE_OBJ));
        if (cell.anyBitsInCommon(state.objectMasks['player'])) {
          if (foundSpawn) {
            throw new Error('Found two spawns in region ' + region.id);
          } else {
            foundSpawn = true;
          }
        }
      }
    }

    if (!foundSpawn) {
      console.log('Missing spawn in region ' + region.id);
    }
  }
}
