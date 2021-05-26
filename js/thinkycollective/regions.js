var regionsOffset = [1, 10];
var regions = [
  {
    offset: [0, 0],
    primaryRects: [
      [2, 0, 8, 7]
    ],
    secondaryRects: [
      [0, 1, 11, 1]
    ],
    zoom: 1,
  },
  {
    offset: [11, 1],
    primaryRects: [
      [1, 0, 7, 7]
    ],
    secondaryRects: [
      [0, 0, 1, 1],
      [8, 6, 2, 1]
    ],
    zoom: 0.9
  },
  {
    offset: [21, 1],
    primaryRects: [
      [0, 0, 7, 7]
    ],
    secondaryRects: [
      [5, -1, 1, 1]
    ],
    zoom: 0.8
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

    for (var j = 0; j < region.primaryRects.length; j++) {
      var rect = region.primaryRects[j];

      var positionX = offsetX + rect[0];
      var positionY = offsetY + rect[1];

      for (var x = positionX; x < positionX + rect[2]; x++) {
        for (var y = positionY; y < positionY + rect[3]; y++) {
          regionMap[x][y] = i;
        }
      }

      if (positionX < minX) {
        minX = positionX;
      }
      if (positionY < minY) {
        minY = positionY;
      }

      if (positionX + rect[2] > maxX) {
        maxX = positionX + rect[2];
      }
      if (positionY + rect[3] > maxY) {
        maxY = positionY + rect[3];
      }
    }

    for (var j = 0; j < region.secondaryRects.length; j++) {
      var rect = region.secondaryRects[j];

      var positionX = offsetX + rect[0];
      var positionY = offsetY + rect[1];

      for (var x = positionX; x < positionX + rect[2]; x++) {
        for (var y = positionY; y < positionY + rect[3]; y++) {
          regionMap[x][y] = i;
        }
      }
    }

    var cameraAnchorX = minX + ((maxX - minX) / 2);
    var cameraAnchorY = minY + ((maxY - minY) / 2);

    region.cameraAnchor = [cameraAnchorX, cameraAnchorY];
  }
}

function getRegion(position) {
  return regions[regionMap[position.x][position.y]];
}

function getActiveRegion () {
  var playerPositions = getPlayerPositions();

  const playerPosition = {
    x: (playerPositions[0]/(level.height))|0,
    y: (playerPositions[0]%level.height)|0
  };

  return getRegion(playerPosition);
}

function formatRegionMap() {
  var output = '';
  for (var y = 0; y < regionMap[0].length; y++) {
    for (var x = 0; x < regionMap.length; x++) {
      output += regionMap[x][y] != null ? regionMap[x][y] : '-';
    }
    output += '\n';
  }
  return output;
}
