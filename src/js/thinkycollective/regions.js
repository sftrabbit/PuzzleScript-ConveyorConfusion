var regionsOffset = [0, 0];
var regions = [
  [
    //////////////
    // INTRO
    //////////////
    // Intro
    {
      offset: [64, 70],
      areas: [
        { rect: [-1, 0, 17, 10], camera: 'follow-player-anchored-x' },
        { rect: [5, -34, 5, 34], secondary: true, camera: 'follow-player-anchored-x' },
        // Bottom left arm
        { rect: [-14, -7, 19, 4], secondary: true, camera: 'follow-player' },
        { rect: [-14, -3, 4, 6], secondary: true, camera: 'follow-player' },
        { rect: [-31, -1, 17, 4], secondary: true, camera: 'follow-player' },
        // Bottom right arm
        { rect: [10, -7, 25, 4], secondary: true, camera: 'follow-player' },
        // Top left arm
        { rect: [-6, -30, 11, 4], secondary: true, camera: 'follow-player' },
        // Top right arm
        { rect: [10, -30, 1, 4], secondary: true, camera: 'follow-player' },
        { rect: [11, -36, 4, 10], secondary: true, camera: 'follow-player' },
        { rect: [15, -40, 4, 8], secondary: true, camera: 'follow-player' },
        { rect: [19, -40, 3, 4], secondary: true, camera: 'follow-player' }
      ],
      zoom: 0.7,
      start: true
    },
    // Block push intro (Jumble)
    {
      offset: [60, 33],
      areas: [
        { rect: [-1, 0, 10, 7] },
        { rect: [9, 0, 5, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [-5, 0, 4, 3], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.8
    },
    // Block push intro secret
    {
      offset: [50, 32],
      areas: [
        { rect: [0, 0, 4, 5] },
        { rect: [4, 0, 1, 5], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.8
    },
    // Two level intro (Patrick)
    {
      offset: [52, 22],
      areas: [
        { rect: [0, 0, 12, 11] },
      ],
      zoom: 0.7
    },
    // Seed level (Joseph Mansfield)
    {
      offset: [64, 21],
      areas: [
        { rect: [0, 0, 3, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 0, 1, 8] },
        { rect: [4, 0, 5, 9] },
        { rect: [9, 0, 1, 5] },
        { rect: [9, 5, 3, 3] },
        { rect: [10, 0, 1, 5] }
      ],
      zoom: 0.8
    },
    // Infinite loop intro (Blookerstein)
    {
      offset: [75, 19],
      areas: [
        { rect: [0, 0, 1, 7], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 5, 11] }
      ],
      zoom: 0.7
    },
    // Seed level secret
    {
      offset: [72, 29],
      areas: [
        { rect: [0, 0, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 7, 4] }
      ],
      zoom: 0.8
    },
    // Hub
    {
      offset: [72, 10],
      areas: [
        { rect: [0, 0, 14, 9] },
        { rect: [2, -4, 10, 4] }
      ],
      zoom: 0.6
    },
    //////////////
    // BRANCH A
    //////////////
    // (marcosd)
    {
      offset: [63, 11],
      areas: [
        { rect: [0, 0, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 9] },
        { rect: [8, 0, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.8
    },
    // (knexator)
    {
      offset: [54, 11],
      areas: [
        { rect: [0, 0, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 0, 7, 9] },
        { rect: [8, 0, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ],
      zoom: 0.8
    },
    // (knexator) - secret
    {
      offset: [49, 13],
      areas: [
        { rect: [0, 0, 1, 5], secondary: true },
        { rect: [1, 0, 3, 5] },
        { rect: [4, 0, 1, 5], secondary: true, camera: 'pull-horizontal' },
        { rect: [1, 5, 3, 4], secondary: true, camera: 'follow-player-anchored-y' },
        { rect: [4, 6, 8, 3], secondary: true, camera: 'follow-player-anchored-y' },
        { rect: [12, 7, 2, 2], secondary: true, camera: 'follow-player-anchored-y' }
      ],
      zoom: 0.8
    },
    // Branch A exit corridor
    {
      offset: [33, 9],
      areas: [
        { rect: [0, 0, 27, 3], camera: 'follow-player' },
        { rect: [22, -2, 3, 2], camera: 'follow-player' }
      ],
      zoom: 0.8
    },
    // (Corey Hardt)
    {
      offset: [43, 2],
      areas: [
        { rect: [0, 4, 2, 3], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, 0, 1, 8], secondary: true, camera: 'pull-horizontal' },
        { rect: [3, 0, 7, 8] },
        { rect: [10, 0, 2, 8], secondary: true, camera: 'pull-horizontal' },
      ],
      zoom: 0.8
    },
    // (Auroriax)
    {
      offset: [40, 12],
      areas: [
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
      zoom: 0.4
    },
    // Clock shortcut surround
    {
      offset: [32, 31],
      areas: [
        { rect: [0, 0, 3, 5] },
        { rect: [3, 0, 1, 2] },
        { rect: [4, 0, 4, 5] }
      ]
    },
    // Clock shortcut
    {
      offset: [32, 31],
      areas: [
        { rect: [3, 2, 1, 3] }
      ]
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
      zoom: 0.75
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
      zoom: 0.75
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
        { rect: [11, 1, 1, 8], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.7
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
      zoom: 0.7
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
      zoom: 0.7
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
      zoom: 0.7
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
      offset: [30, 23],
      areas: [
        { rect: [0, 0, 9, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [0, 1, 9, 6] },
        { rect: [0, 7, 9, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.7
    },
    // (PedroPSI)
    {
      offset: [28, 12],
      areas: [
        { rect: [4, 0, 5, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [4, 1, 5, 1] },
        { rect: [3, 2, 7, 1] },
        { rect: [0, 3, 13, 7] },
        { rect: [0, 10, 13, 1], secondary: true, camera: 'pull-vertical' }
      ],
      zoom: 0.7
    }
  ]
  // [
  //   {
  //     offset: [0, 0],
  //     areas: [
  //       { rect: [2, 0, 8, 8] },
  //       { rect: [0, -1, 2, 4], secondary: true, camera: 'pull-horizontal' },
  //       { rect: [10, -1, 1, 9], secondary: true, camera: 'pull-horizontal' },
  //       { rect: [2, -1, 8, 1], secondary: true, camera: 'pull-vertical' },
  //       { rect: [1, 3, 1, 5], secondary: true },
  //       { rect: [4, -4, 3, 3], secondary: true, camera: 'follow-player' },
  //       { rect: [4, -7, 9, 3], secondary: true, camera: 'follow-player' }
  //     ]
  //   },
  //   {
  //     offset: [11, 1],
  //     areas: [
  //       { rect: [1, -1, 7, 9] },
  //       { rect: [0, -1, 1, 9], secondary: true, camera: 'pull-horizontal' },
  //       { rect: [8, -1, 1, 9], secondary: true, camera: 'pull-horizontal' }
  //     ]
  //   },
  //   {
  //     offset: [21, 1],
  //     areas: [
  //       { rect: [0, 0, 8, 8] },
  //       { rect: [-1, -1, 1, 9], secondary: true, camera: 'pull-horizontal' },
  //       { rect: [0, -1, 8, 1], secondary: true, camera: 'pull-vertical' }
  //     ]
  //   },
  //   {
  //     offset: [26, -8],
  //     areas: [
  //       { rect: [-1, 0, 8, 7] },
  //       { rect: [-1, -1, 8, 1], secondary: true, camera: 'pull-vertical' },
  //       { rect: [-1, 7, 8, 1], secondary: true, camera: 'pull-vertical' }
  //     ]
  //   }
  // ]
];

var regionMap = [];

function initRegions() {
  regionMap = [];

  var levelRegions = regions[curlevel] || [];

  var haveStartRegion = false;

  for (var x = 0; x < level.width; x++) {
    var regionMapColumn = [];
    for (var y = 0; y < level.height; y++) {
      regionMapColumn.push(null)
    }
    regionMap.push(regionMapColumn);
  }

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

    region.outlinePolygon = calculateOutlinePolygon(region);
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