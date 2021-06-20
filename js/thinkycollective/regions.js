var regionsOffset = [1, 10];
var regions = [
  {
    offset: [0, 0],
    primaryRects: [
      [2, 0, 8, 7]
    ],
    secondaryRects: [
      [0, 1, 11, 1]
    ]
  },
  {
    offset: [11, 1],
    primaryRects: [
      [1, 0, 7, 7]
    ],
    secondaryRects: [
      [0, 0, 1, 1],
      [8, 6, 2, 1]
    ]
  },
  {
    offset: [21, 1],
    primaryRects: [
      [0, 0, 7, 7]
    ],
    secondaryRects: [
      [5, -1, 1, 1]
    ]
  }
];

var regionMap = [];

function initRegions() {
  if (curlevel !== 0) {
    return;
  }

  for (var x = 0; x < level.width; x++) {
    var regionMapColumn = [];
    for (var y = 0; y < level.height; y++) {
      regionMapColumn.push(null)
    }
    regionMap.push(regionMapColumn);
  }

  for (var i = 0; i < regions.length; i++) {
    var region = regions[i];

    var offsetX = regionsOffset[0] + region.offset[0];
    var offsetY = regionsOffset[1] + region.offset[1];

    var minX = Infinity;
    var maxX = 0;
    var minY = Infinity;
    var maxY = 0;

    var regionBounds = getRegionBounds(region);

    for (var j = 0; j < region.secondaryRects.length; j++) {
      var rect = region.secondaryRects[j];

      var positionX = offsetX + rect[0];
      var positionY = offsetY + rect[1];

      for (var x = positionX; x < positionX + rect[2]; x++) {
        for (var y = positionY; y < positionY + rect[3]; y++) {
          regionMap[x][y] = [i, false];
        }
      }
    }

    for (var j = 0; j < region.primaryRects.length; j++) {
      var rect = region.primaryRects[j];

      var positionX = offsetX + rect[0];
      var positionY = offsetY + rect[1];

      for (var x = positionX; x < positionX + rect[2]; x++) {
        for (var y = positionY; y < positionY + rect[3]; y++) {
          regionMap[x][y] = [i, true];
        }
      }
    }

    var cameraAnchorX = regionBounds.minX + ((regionBounds.maxX - regionBounds.minX) / 2);
    var cameraAnchorY = regionBounds.minY + ((regionBounds.maxY - regionBounds.minY) / 2);

    region.cameraAnchor = [cameraAnchorX, cameraAnchorY];
  }

  console.log(formatRegionMap())
}

function getRegion(position) {
  return regions[getRegionIndex(position.x, position.y)];
}

function isRegionPrimary(position) {
  return regionMap[position.x][position.y][1];
}

function getRegionIndex(x, y) {
  if (regionMap[x][y] == null) {
    return null;
  }

  return regionMap[x][y][0];
}

function getActiveRegion () {
  var playerPositions = getPlayerPositions();

  const playerPosition = {
    x: (playerPositions[0]/(level.height))|0,
    y: (playerPositions[0]%level.height)|0
  };

  return [getRegion(playerPosition), isRegionPrimary(playerPosition)];
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

function getRegionBounds(region) {
  var bounds = {
    minX: Infinity,
    maxX: 0,
    minY: Infinity,
    maxY: 0
  };

  var offsetX = regionsOffset[0] + region.offset[0];
  var offsetY = regionsOffset[1] + region.offset[1];

  for (var j = 0; j < region.primaryRects.length; j++) {
    var rect = region.primaryRects[j];

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

  for (var i = 0; i < regions.length; i++) {
    var regionBounds = getRegionBounds(regions[i]);
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
