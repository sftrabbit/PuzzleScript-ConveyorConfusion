var regionsOffset = [1, 10];
var regions = [
  [
    {
      offset: [0, 0],
      areas: [
        { rect: [2, 0, 8, 8] },
        { rect: [0, -1, 2, 4], secondary: true, camera: 'pull-horizontal' },
        { rect: [10, -1, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [2, -1, 8, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [1, 3, 1, 5], secondary: true },
        { rect: [4, -4, 3, 3], secondary: true, camera: 'follow-player' },
        { rect: [4, -7, 9, 3], secondary: true, camera: 'follow-player' }
      ]
    },
    {
      offset: [11, 1],
      areas: [
        { rect: [1, -1, 7, 9] },
        { rect: [0, -1, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [8, -1, 1, 9], secondary: true, camera: 'pull-horizontal' }
      ]
    },
    {
      offset: [21, 1],
      areas: [
        { rect: [0, 0, 8, 8] },
        { rect: [-1, -1, 1, 9], secondary: true, camera: 'pull-horizontal' },
        { rect: [0, -1, 8, 1], secondary: true, camera: 'pull-vertical' }
      ]
    },
    {
      offset: [26, -8],
      areas: [
        { rect: [-1, 0, 8, 7] },
        { rect: [-1, -1, 8, 1], secondary: true, camera: 'pull-vertical' },
        { rect: [-1, 7, 8, 1], secondary: true, camera: 'pull-vertical' }
      ]
    }
  ]
];

var regionMap = [];

function initRegions() {
  regionMap = [];

  var levelRegions = regions[curlevel] || [];

  for (var x = 0; x < level.width; x++) {
    var regionMapColumn = [];
    for (var y = 0; y < level.height; y++) {
      regionMapColumn.push(null)
    }
    regionMap.push(regionMapColumn);
  }

  for (var i = 0; i < levelRegions.length; i++) {
    var region = levelRegions[i];

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
  var playerPositions = getPlayerPositions();

  const playerPosition = {
    x: (playerPositions[0]/(level.height))|0,
    y: (playerPositions[0]%level.height)|0
  };

  return getRegion(playerPosition);
}

function getActiveArea () {
  var playerPositions = getPlayerPositions();

  const playerPosition = {
    x: (playerPositions[0]/(level.height))|0,
    y: (playerPositions[0]%level.height)|0
  };

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
