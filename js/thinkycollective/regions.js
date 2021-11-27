var regionsOffset = [0, 29];
var regions = [
  [
    //////////////
    // INTRO
    //////////////
    // Intro
    {
      offset: [64, 70],
      areas: [
        { rect: [0, 0, 15, 10], camera: 'follow-player-anchored-x' },
        { rect: [5, -34, 5, 34], secondary: true, camera: 'follow-player-anchored-x' },
      ],
      zoom: 0.7,
      simulateAll: true
    },
    // Intro - bottom left arm
    {
      offset: [64, 67],
      areas: [
        { rect: [-14, -6, 19, 4], camera: 'follow-player' },
        { rect: [-14, -2, 4, 9], camera: 'follow-player' },
        { rect: [-31, 3, 17, 4], camera: 'follow-player' },
        { rect: [-29, 2, 3, 1], camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulateAll: true
    },
    // Intro - bottom right arm
    {
      offset: [64, 67],
      areas: [
        { rect: [10, -6, 25, 4], camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulateAll: true
    },
    // Intro - top left arm
    {
      offset: [64, 70],
      areas: [
        { rect: [-4, -30, 9, 4], camera: 'follow-player' },
      ],
      zoom: 0.7,
      simulateAll: true
    },
    // Intro - top right arm
    {
      offset: [64, 70],
      areas: [
        { rect: [10, -30, 1, 4] },
        { rect: [11, -35, 4, 9], secondary: true, camera: 'follow-player' },
        { rect: [15, -39, 4, 8], secondary: true, camera: 'follow-player' },
        { rect: [19, -39, 3, 4], secondary: true, camera: 'follow-player' }
      ],
      zoom: 0.7,
      simulateAll: true
    },
    // Intro bonus puzzle
    {
      offset: [79, 66],
      areas: [
        { rect: [0, 3, 1, 5], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 0, 3, 8] },
        { rect: [5, 0, 8, 10] }
      ],
      zoom: 0.7
    },
    // Intro bonus puzzle secret
    {
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
      offset: [64, 70],
      areas: [
        { rect: [-3, -26, 5, 11], camera: 'follow-player' },
      ],
      zoom: 0.7
    },
    // Intro top left arm secret
    {
      offset: [64, 70],
      areas: [
        { rect: [-2, -15, 3, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [-3, -14, 5, 5] }
      ],
      zoom: 0.7,
      secret: true
    },
    // Block push intro (Jumble)
    {
      offset: [60, 33],
      areas: [
        { rect: [-1, 0, 10, 7] },
        { rect: [9, 0, 5, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [-5, 0, 4, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // Block push intro secret
    {
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
      offset: [52, 21],
      areas: [
        { rect: [0, 0, 12, 8] },
        { rect: [0, 8, 11, 3] },
        { rect: [3, 11, 4, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.65
    },
    // Seed level (Joseph Mansfield)
    {
      offset: [64, 20],
      areas: [
        { rect: [0, 0, 3, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 0, 1, 8] },
        { rect: [4, 0, 7, 9] },
        { rect: [11, 0, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // Infinite loop intro (Blookerstein)
    {
      offset: [75, 19],
      areas: [
        { rect: [1, -1, 6, 11] }
      ],
      zoom: 0.7
    },
    // Seed level secret
    {
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
      offset: [73, 7],
      areas: [
        { rect: [0, 0, 14, 10] },
        { rect: [3, -2, 8, 2] }
      ],
      zoom: 0.6,
      start: true
    },
    //////////////
    // BRANCH A
    //////////////
    // (marcosd)
    {
      offset: [64, 10],
      areas: [
        { rect: [0, 0, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 9] },
        { rect: [8, 0, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.8
    },
    // (knexator)
    {
      offset: [55, 10],
      areas: [
        { rect: [0, 0, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 9] },
        { rect: [8, 0, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.8
    },
    // (knexator) - secret
    {
      offset: [50, 12],
      areas: [
        { rect: [4, 1, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [-1, 0, 5, 5] },
        { rect: [0, 5, 3, 1], secondary: true, camera: 'follow-player' },
        { rect: [-2, 6, 13, 3], secondary: true, camera: 'follow-player' },
        { rect: [11, 7, 2, 2], secondary: true, camera: 'follow-player' },
        { rect: [-2, 9, 3, 4], secondary: true, camera: 'follow-player' },
        { rect: [-1, 13, 2, 3], secondary: true, camera: 'follow-player' }
      ],
      zoom: 0.8,
      secret: true
    },
    // Branch A exit corridor
    {
      offset: [43, 8],
      areas: [
        { rect: [0, 0, 30, 3], camera: 'follow-player' },
        { rect: [13, -3, 3, 3], camera: 'follow-player' },
        { rect: [27, -4, 7, 4], camera: 'follow-player' }
      ],
      zoom: 0.8
    },
    // (Corey Hardt)
    {
      offset: [43, 1],
      areas: [
        { rect: [0, 4, 2, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 0, 7, 8] },
        { rect: [10, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [11, 4, 2, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.8
    },
    // (Auroriax)
    {
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
      zoom: 0.55
    },
    // (Kristian Hedeholm)
    {
      offset: [39, 25],
      areas: [
        { rect: [7, 0, 3, 2], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 2, 11, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 3, 11, 8] },
        { rect: [0, 11, 7, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.75
    },
    // The clock (Zomulgustar)
    {
      offset: [26, 37],
      areas: [
        { rect: [1, 0, 19, 5] },
        { rect: [0, 5, 21, 11] },
        { rect: [1, 16, 19, 5] },
        { rect: [12, 21, 8, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [6, -1, 8, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.4,
      secret: true
    },
    // Clock shortcut surround
    {
      offset: [32, 31],
      areas: [
        { rect: [0, 0, 3, 5] },
        { rect: [3, 0, 1, 2] },
        { rect: [4, 0, 4, 5] }
      ],
      zoom: 0.4
    },
    // Clock shortcut
    {
      offset: [32, 31],
      areas: [
        { rect: [3, 2, 1, 3] }
      ],
      zoom: 0.4
    },
    // 1:00 (CHz)
    {
      offset: [46, 37],
      areas: [
        { rect: [0, 0, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 1, 11], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 0, 7, 11] },
        { rect: [9, 0, 1, 11], secondary: true }
      ],
      zoom: 0.7
    },
    // 1:00 Main path lock
    {
      offset: [56, 40],
      areas: [
        { rect: [0, 0, 4, 5] }
      ],
      zoom: 0.7
    },
    // 3:00 (Menderbug)
    {
      offset: [47, 48],
      areas: [
        { rect: [0, 0, 1, 6], secondary: true, camera: 'pull-horizontal' },
        { rect: [-1, 6, 2, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 8, 9] },
        { rect: [9, 0, 1, 9], secondary: true }
      ],
      zoom: 0.7
    },
    // 5:00 #1 (Draknek)
    {
      offset: [39, 59],
      areas: [
        { rect: [0, 0, 11, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 1, 10], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 1, 9, 9] },
        { rect: [10, 1, 1, 10], secondary: true },
        { rect: [1, 10, 9, 1], secondary: true }
      ],
      zoom: 0.7
    },
    // 5:00 #2 (Aspeon)
    {
      offset: [33, 58],
      areas: [
        { rect: [0, 0, 6, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 1, 7], secondary: true },
        { rect: [1, 1, 4, 7] },
        { rect: [0, 8, 6, 1], secondary: true },
        { rect: [5, 1, 1, 7], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // 7:00 #1 (KirraLuan)
    {
      offset: [16, 51],
      areas: [
        { rect: [0, 0, 9, 4] },
        { rect: [9, 0, 2, 4], secondary: true },
        { rect: [0, 4, 9, 6] },
        { rect: [9, 4, 2, 6], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // 7:00 #2 (Clickmazes)
    {
      offset: [25, 59],
      areas: [
        { rect: [2, 0, 3, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 8, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 2, 8, 7] },
        { rect: [0, 9, 8, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.7
    },
    // 7:00 #3 (pancelor)
    {
      offset: [19, 69],
      areas: [
        { rect: [1, 0, 11, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [1, 1, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [-1, 3, 2, 5], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 1, 9, 8] },
        { rect: [11, 1, 1, 8], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // 7:00 Main path lock
    {
      offset: [31, 69],
      areas: [
        { rect: [0, 0, 2, 8] },
        { rect: [2, 0, 1, 4] }
      ],
      zoom: 0.7
    },
    // 7:00 Main path lock secret
    {
      offset: [34, 66],
      areas: [
        { rect: [0, 0, 5, 5] },
        { rect: [1, 5, 2, 1] },
        { rect: [3, 5, 2, 2], secondary: true, camera: 'follow-player' },
        { rect: [5, 4, 11, 3], secondary: true, camera: 'follow-player' }
      ],
      zoom: 0.7,
      secret: true
    },
    // 7:00 #4 (Norgg)
    {
      offset: [10, 69],
      areas: [
        { rect: [0, 0, 8, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [8, 0, 1, 7], secondary: true, camera: 'pull-horizontal' },
        { rect: [9, 0, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [0, 1, 1, 6], secondary: true },
        { rect: [1, 6, 7, 1], secondary: true },
        { rect: [1, 1, 7, 5] }
      ],
      zoom: 0.7
    },
    // 7:00 #5 Post-Norgg
    {
      offset: [10, 61],
      areas: [
        { rect: [0, 1, 9, 6] },
        { rect: [9, 0, 1, 7] },
        { rect: [5, 0, 4, 1], secondary: true },
        { rect: [0, 7, 9, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [10, 0, 1, 7], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // 7:00 Le Slo Secret
    {
      offset: [20, 61],
      areas: [
        { rect: [0, 0, 1, 2], secondary: true },
        { rect: [0, 3, 1, 2], secondary: true },
        { rect: [0, 5, 1, 2], secondary: true },
        { rect: [1, 0, 3, 8] },
        { rect: [4, 0, 1, 8], secondary: true }
      ],
      zoom: 0.7,
      secret: true
    },
    // 7:00 #6 (Le Slo)
    {
      offset: [5, 54],
      areas: [
        { rect: [2, 0, 7, 1], secondary: true },
        { rect: [0, 1, 9, 7] },
        { rect: [9, 1, 1, 7], secondary: true, camera: 'pull-horizontal' },
        { rect: [0, 8, 6, 1], secondary: true },
        { rect: [7, 8, 1, 1], secondary: true }
      ],
      zoom: 0.7
    },
    // 7:00 Return to clock
    {
      offset: [14, 48],
      areas: [
        { rect: [0, 0, 3, 12], camera: 'follow-player' },
        { rect: [1, 12, 2, 2], camera: 'follow-player' },
        { rect: [3, 0, 9, 3], camera: 'follow-player' }
      ],
      zoom: 0.7
    },
    // 9:00 #1 (Joseph Mansfield)
    {
      offset: [16, 37],
      areas: [
        { rect: [1, 0, 7, 11] },
        { rect: [8, 1, 1, 10], secondary: true, camera: 'pull-horizontal' },
        { rect: [9, 5, 1, 6], secondary: true, camera: 'pull-horizontal' },
        { rect: [0, 2, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [-1, 8, 1, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // 9:00 #2 (clementsparrow)
    {
      offset: [6, 37],
      areas: [
        { rect: [0, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [4, -1, 3, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [1, 1, 7, 7] },
        { rect: [2, 8, 4, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [8, 3, 2, 5], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // 9:00 clementsparrow secret 1
    {
      offset: [0, 40],
      areas: [
        { rect: [5, 0, 1, 5], secondary: true, camera: 'pull-horizontal' },
        { rect: [0, 0, 5, 4] },
        { rect: [0, 4, 5, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.7,
      secret: true
    },
    // 9:00 clementsparrow secret 2
    {
      offset: [3, 45],
      areas: [
        { rect: [0, 0, 3, 1], secondary: true, camera: 'follow-player' },
        { rect: [0, 1, 6, 6], secondary: true, camera: 'follow-player' },
        { rect: [6, 5, 3, 2], secondary: true, camera: 'follow-player' },
        { rect: [9, 0, 3, 7], secondary: true, camera: 'follow-player' },
        { rect: [6, 1, 3, 4] }
      ],
      zoom: 0.7,
      secret: true
    },
    // 9:00 #3 (Deusovi)
    {
      offset: [6, 26],
      areas: [
        { rect: [0, -1, 13, 11] },
        { rect: [0, 10, 4, 2], secondary: true, camera: 'pull-vertical' },
        { rect: [6, 10, 7, 1], secondary: true },
        { rect: [13, 2, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.65
    },
    // 9:00 #4 (crychair)
    {
      offset: [20, 27],
      areas: [
        { rect: [0, 0, 1, 10], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 10] },
        { rect: [8, 2, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [9, 7, 2, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // Fusion intro
    {
      offset: [29, 22],
      areas: [
        { rect: [0, 0, 9, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 9, 6] },
        { rect: [0, 7, 9, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [3, 8, 3, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.7
    },
    // (PedroPSI)
    {
      offset: [27, 11],
      areas: [
        { rect: [4, 0, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [4, 1, 5, 1] },
        { rect: [3, 2, 7, 1] },
        { rect: [0, 3, 13, 7] },
        { rect: [0, 10, 13, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.7
    },
    // Branch A finish
    {
      offset: [24, -4],
      areas: [
        { rect: [0, 0, 19, 15] },
      ],
      zoom: 0.58,
      simulateAll: true
    },
    //////////////
    // BRANCH B
    //////////////
    // Branch B exit path
    {
      offset: [87, 8],
      areas: [
        { rect: [0, 0, 3, 9], camera: 'follow-player' },
        { rect: [-4, -4, 7, 4], camera: 'follow-player' },
      ],
      zoom: 0.6
    },
    // Branch B finish
    {
      offset: [89, -8],
      areas: [
        { rect: [0, 0, 19, 11] },
        { rect: [0, 11, 17, 1] },
        { rect: [1, 12, 16, 4] },
      ],
      zoom: 0.56,
      simulateAll: true
    },
    // (Pichusuperlover)
    {
      offset: [90, 8],
      areas: [
        { rect: [0, 0, 1, 6], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 12, 6] },
        { rect: [13, 0, 1, 6], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 6, 8, 2] }
      ],
      zoom: 0.7
    },
    // (Mischka Kamener)
    {
      offset: [104, 2],
      areas: [
        { rect: [0, 7, 1, 5], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 6, 12] },
        { rect: [7, 2, 1, 7] },
        { rect: [8, 3, 4, 4] },
        { rect: [8, 2, 4, 1], secondary: true, camera: 'follow-player' }
      ],
      zoom: 0.65
    },
    // (Joseph Mansfield #1)
    {
      offset: [113, -3],
      areas: [
        { rect: [0, 0, 9, 1], secondary: true },
        { rect: [0, 1, 9, 5] },
        { rect: [0, 6, 9, 1], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.8
    },
    // (Joseph Mansfield #2)
    {
      offset: [116, 2],
      areas: [
        { rect: [3, 2, 4, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [7, 0, 8, 3], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 3, 12, 5] },
        { rect: [0, 8, 5, 2] },
        { rect: [12, 3, 3, 5], secondary: true, camera: 'follow-player' }
      ],
      zoom: 0.7
    },
    // (Second ending gate)
    {
      offset: [122, -6],
      areas: [
        { rect: [0, 0, 9, 8] }
      ],
      zoom: 0.7
    },
    // (Second ending secret room)
    {
      offset: [117, -16],
      areas: [
        { rect: [0, 0, 14, 10] }
      ],
      zoom: 0.7,
      secret: true
    },
    // (Justas)
    {
      offset: [122, 10],
      areas: [
        { rect: [0, 0, 9, 8] }
      ],
      zoom: 0.7
    },
    // (That Scar)
    {
      offset: [110, 13],
      areas: [
        { rect: [11, 2, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 10, 7] },
        { rect: [-2, 1, 3, 5], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // (winterbeak)
    {
      offset: [91, 14],
      areas: [
        { rect: [10, 0, 7, 1], secondary: true },
        { rect: [16, 1, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [10, 1, 6, 1] },
        { rect: [0, 2, 16, 8] },
        { rect: [0, 10, 17, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [2, 11, 3, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.65
    },
    // Corridor
    {
      offset: [93, 26],
      areas: [
        { rect: [-3, 0, 10, 3] }
      ],
      zoom: 0.7
    },
    // (Dan Williams)
    {
      offset: [89, 29],
      areas: [
        { rect: [3, 0, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 11, 7] },
        { rect: [1, 8, 9, 1], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.7
    },
    // Main path lock
    {
      offset: [86, 30],
      areas: [
        { rect: [0, 0, 3, 5] }
      ],
      zoom: 0.7
    },
    // (Guilherme Tows (zaratustra))
    {
      offset: [82, 35],
      areas: [
        { rect: [0, 0, 8, 10] },
        { rect: [8, 3, 4, 8] },
        { rect: [3, 10, 5, 1] },
        { rect: [12, 3, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [13, 3, 1, 4], secondary: true, camera: 'pull-horizontal' },
        { rect: [-4, 4, 4, 5], secondary: true, camera: 'pull-horizontal' },
      ],
      zoom: 0.7
    },
    // (Muftwin)
    {
      offset: [75, 44],
      areas: [
        { rect: [3, 0, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 11, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 2, 11, 9] },
        { rect: [0, 11, 11, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [4, 12, 7, 2], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.6
    },
    // (Colin)
    {
      offset: [86, 47],
      areas: [
        { rect: [1, 0, 3, 2], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 2, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 3, 5, 1] },
        { rect: [-1, 4, 7, 5] },
        { rect: [0, 9, 5, 2], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.6
    },
    // Explosive intro
    {
      offset: [90, 46],
      areas: [
        { rect: [0, 0, 1, 5], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 1, 5] },
        { rect: [2, 0, 5, 6] },
        { rect: [7, 0, 1, 6], secondary: true, camera: 'pull-horizontal' },
      ],
      zoom: 0.6
    },
    // (Toombler)
    {
      offset: [98, 37],
      areas: [
        { rect: [2, 0, 11, 5] },
        { rect: [0, 5, 13, 1] },
        { rect: [1, 6, 10, 6] },
        { rect: [0, 6, 1, 6], secondary: true, camera: 'pull-horizontal' },
      ],
      zoom: 0.6
    },
    // stevenjmiller's bomb secret corridor
    {
      offset: [109, 43],
      areas: [
        { rect: [0, 0, 5, 5] },
        { rect: [1, 5, 3, 1] },
        { rect: [-1, 6, 5, 2] },
        { rect: [-1, 8, 6, 4] },
        { rect: [2, 12, 3, 1] },
        { rect: [-5, 8, 4, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6
    },
    // stevenjmiller's bomb secret
    {
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
      offset: [107, 55],
      areas: [
        { rect: [0, 0, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 5, 4] },
        { rect: [0, 5, 5, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.6
    },
    // Joseph Mansfield's secret #2
    {
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
      offset: [98, 51],
      areas: [
        { rect: [3, 0, 3, 3], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 3, 9, 13] },
        { rect: [3, 16, 3, 2], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.6
    },
    // Main path branch
    {
      offset: [99, 69],
      areas: [
        { rect: [0, 0, 5, 5] },
        { rect: [5, 0, 1, 5], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6
    },
    // (Joel)
    {
      offset: [105, 68],
      areas: [
        { rect: [0, 0, 1, 7], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 1, 7] },
        { rect: [2, 0, 4, 9] },
        { rect: [6, 0, 3, 8] },
        { rect: [9, 1, 1, 7], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6
    },
    // Corridor
    {
      offset: [115, 68],
      areas: [
        { rect: [0, 1, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 5, 10] },
        { rect: [6, 1, 2, 9] },
        { rect: [8, -1, 4, 6] }
      ],
      zoom: 0.6
    },
    // Corridor secret #1
    {
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
      offset: [123, 73],
      areas: [
        { rect: [0, 1, 1, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 5, 5] }
      ],
      zoom: 0.6,
      secret: true
    },
    // (Notan)
    {
      offset: [115, 57],
      areas: [
        { rect: [0, 0, 11, 5] },
        { rect: [0, 5, 9, 5] },
        { rect: [2, 10, 7, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [5, -2, 5, 2], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.6
    },
    // (Zach)
    {
      offset: [113, 40],
      areas: [
        { rect: [11, 0, 6, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [11, 1, 6, 1] },
        { rect: [2, 2, 15, 5] },
        { rect: [0, 7, 18, 5] },
        { rect: [7, 12, 5, 3], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.6
    },
    // (Zach) secret
    {
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
      offset: [111, 39],
      areas: [
        { rect: [0, 0, 8, 3], camera: 'follow-player' },
      ],
      zoom: 0.6
    },
    // (Joseph Mansfield) Vat introduction
    {
      offset: [123, 29],
      areas: [
        { rect: [0, 0, 1, 10], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 9] },
        { rect: [1, 9, 7, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [3, 10, 3, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.6
    },
    // (Shark)
    {
      offset: [100, 25],
      areas: [
        { rect: [0, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 8, 8] },
        { rect: [9, 0, 3, 9] },
        { rect: [12, 0, 9, 11] },
        { rect: [21, 1, 2, 10], secondary: true, camera: 'pull-horizontal' },
      ],
      zoom: 0.6
    },
    // (Shark) secret
    {
      offset: [120, 20],
      areas: [
        { rect: [0, 0, 5, 5] },
        { rect: [1, 5, 3, 1], secondary: true, camera: 'pull-vertical' },
      ],
      zoom: 0.7,
      secret: true
    },
    // (twak)
    {
      offset: [82, 17],
      areas: [
        { rect: [0, 0, 8, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 7, 10] },
        { rect: [5, 11, 2, 1] },
        { rect: [7, 1, 1, 11], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6
    },
    //////////////
    // MERGE
    //////////////
    // (Jack Lance)
    {
      offset: [77, -6],
      areas: [
        { rect: [1, 0, 12, 11] },
        { rect: [-3, -1, 7, 1], secondary: true },
        { rect: [-3, 0, 4, 5], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.6
    },
    // (Ethan Clark)
    {
      offset: [59, -2],
      areas: [
        { rect: [7, 0, 5, 1] },
        { rect: [0, 1, 12, 1] },
        { rect: [0, 2, 15, 2] },
        { rect: [1, 4, 13, 3] },
        { rect: [5, 7, 5, 1] },
        { rect: [14, 3, 5, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [15, 1, 4, 2], secondary: true, camera: 'pull-horizontal' },
        { rect: [0, -1, 3, 2], secondary: true, camera: 'follow-player' }
      ],
      zoom: 0.7
    },
    // Bonus level #1 (stevenjmiller)
    {
      offset: [48, -15],
      areas: [
        { rect: [0, 0, 17, 12] }
      ],
      zoom: 0.6
    },
    // Bonus level #1 secret
    {
      offset: [65, -7],
      areas: [
        { rect: [0, 1, 2, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 0, 5, 5] }
      ],
      zoom: 0.6,
      secret: true
    },
    // (Ethan Clark) -> (domcamus)
    {
      offset: [22, -6],
      areas: [
        { rect: [0, 0, 24, 3], camera: 'follow-player' },
        { rect: [21, 3, 16, 3], camera: 'follow-player' },
        { rect: [0, 3, 3, 11], camera: 'follow-player' },
        { rect: [1, 14, 2, 1], camera: 'follow-player' }
      ],
      zoom: 0.7
    },
    // (domcamus)
    {
      offset: [1, 5],
      areas: [
        { rect: [0, 0, 2, 7], secondary: true, camera: 'follow-player' },
        { rect: [0, 7, 2, 11] },
        { rect: [2, 0, 20, 18] }
      ],
      zoom: 0.50
    },
    // (stevenjmiller)
    {
      offset: [1, -8],
      areas: [
        { rect: [0, 0, 21, 13] }
      ],
      zoom: 0.58
    },
    // (D5R)
    {
      offset: [2, -19],
      areas: [
        { rect: [0, 0, 11, 11] },
        { rect: [11, 0, 2, 11], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.7
    },
    // (jackk)
    {
      offset: [15, -22],
      areas: [
        { rect: [0, 5, 2, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 3, 5, 11] },
        { rect: [7, 0, 26, 14] },
        { rect: [33, 0, 1, 14], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.48
    },
    // (jackk -> ending)
    {
      offset: [49, -22],
      areas: [
        { rect: [0, 0, 3, 4], camera: 'follow-player' },
        { rect: [0, 4, 20, 3], camera: 'follow-player' },
        { rect: [17, 7, 4, 1], camera: 'follow-player' },
        { rect: [20, 5, 1, 2], camera: 'follow-player' },
      ],
      zoom: 0.6
    },
    // (jackk -> ending)
    {
      offset: [70, -22],
      areas: [
        { rect: [0, 0, 13, 13] }
      ],
      zoom: 0.6
    },
  ]
];

var regionMap = [];
var secrets = [];

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
    }
    regionMap.push(regionMapColumn);
  }

  var secretCount = 0;

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
    region.simulateAll = !!region.simulateAll;

    if (region.secret) {
      for (var x = regionBounds.minX; x < regionBounds.maxX; x++) {
        for (var y = regionBounds.minY; y < regionBounds.maxY; y++) {
          var positionIndex = y + x * level.height;
          var cell = level.getCell(positionIndex);
          if (cell.anyBitsInCommon(state.objectMasks['button_below'])) {
            var secret = {
              buttonIndex: positionIndex,
              region: region,
              markerIndex: secretMarkerIndexes[secretCount]
            };
            secrets.push(secret);
            region.secret = secret;
            secretCount++;
          }
        }
      }
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
