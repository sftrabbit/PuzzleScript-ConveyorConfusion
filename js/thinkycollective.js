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

function restoreActiveRegion(lev) {
  oldflickscreendat=lev.oldflickscreendat.concat([]);

  var playerPosition = getPlayerPositions()[0];
  var playerX = (playerPosition / level.height) | 0;
  var playerY = playerPosition % level.height;

  var activeRegion = playerX > 9 ? 1 : 0;

  // Copy original state of level for the active region
  for (var x = 0; x < level.width; x++) {
    for (var y = 0; y < level.height; y++) {
      var positionIndex = x * level.height + y;

      var inRegion = activeRegion === 1 ? (x > 9) : (x <= 9);

      if (inRegion) {
        for (var i = 0; i < STRIDE_OBJ; i++) {
          level.objects[positionIndex * STRIDE_OBJ + i] = lev.dat[positionIndex * STRIDE_OBJ + i];
        }

        objectTrackers[x][y] = JSON.parse(JSON.stringify(initialObjectTrackers[x][y]))
      } else {
        var layers = Object.keys(objectTrackers[x][y]);
        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];

          if (objectTrackers[x][y][layer] === activeRegion) {
            var cell = level.getCell(positionIndex);
            var layerMask = state.layerMasks[layer];
            cell.iclear(layerMask);
            level.setCell(positionIndex, cell);

            delete objectTrackers[x][y][layer];
          }
        }
      }
    }
  }

  if (level.width !== lev.width || level.height !== lev.height) {
    level.width = lev.width;
    level.height = lev.height;
    level.n_tiles = lev.width * lev.height;
    RebuildLevelArrays();
    //regenerate all other stride-related stuff
  }
  else 
  {
  // layercount doesn't change

    for (var i=0;i<level.n_tiles;i++) {
      level.movements[i]=0;
      level.rigidMovementAppliedMask[i]=0;
      level.rigidGroupIndexMask[i]=0;
    } 

      for (var i=0;i<level.height;i++) {
        var rcc = level.rowCellContents[i];
        rcc.setZero();
      }
      for (var i=0;i<level.width;i++) {
        var ccc = level.colCellContents[i];
        ccc.setZero();
      }
  }

    againing=false;
    level.commandQueue=[];
    level.commandQueueSourceRules=[];
}

var objectTrackers = null;
var initialObjectTrackers = null;

function initObjectTrackers() {
  objectTrackers = [];

  var objectNames = Object.keys(state.moverObjectLayers);

  for (var x = 0; x < level.width; x++) {
    var objectTrackersColumn = [];

    for (var y = 0; y < level.height; y++) {
      var positionIndex = x * level.height + y;
      var cell = level.getCell(positionIndex);

      var trackers = {};

      if (cell.anyBitsInCommon(state.moverMask)) {
        for (var i = 0; i < objectNames.length; i++) {
          trackers[state.moverObjectLayers[objectNames[i]]] = x > 9 ? 1 : 0;
        }
      }

      objectTrackersColumn.push(trackers);
    }

    objectTrackers.push(objectTrackersColumn);
  }

  initialObjectTrackers = JSON.parse(JSON.stringify(objectTrackers));
}

function generateMoverObjectLayers(state) {
  state.moverObjectLayers = Object.keys(state.objects)
    .reduce(function(moverObjectLayers, objectName) {
      var objectMask = state.objectMasks[objectName];

      if (objectMask.anyBitsInCommon(state.moverMask)) {
        moverObjectLayers[objectName] = state.objects[objectName].layer;
      }

      return moverObjectLayers;
    }, {});
}

var camera = null;
var cameraTransition = null;
var currentRegion = null;

function onStateUpdate(againing, action) {
  if (curlevel !== 0) {
    return;
  }

  drawLevel();

  var region = getActiveRegion();

  if (region !== currentRegion) {
    transitionCameraToRegion(region);
    currentRegion = region;
  }
}

function transitionCameraToRegion(region) {
  cameraTransition = {
    start: (new Date()).getTime(),
    from: {
      position: [camera.position[0], camera.position[1]],
      zoom: camera.zoom
    },
    to: {
      position: [region.cameraAnchor[0], region.cameraAnchor[1]],
      zoom: region.zoom
    }
  };
}

function initSmoothCamera() {
  var region = getActiveRegion();

  camera = {
    position: [region.cameraAnchor[0], region.cameraAnchor[1]],
    zoom: region.zoom
  };
}

function getActiveRegion () {
  var playerPositions = getPlayerPositions();

  const playerPosition = {
    x: (playerPositions[0]/(level.height))|0,
    y: (playerPositions[0]%level.height)|0
  };

  return getRegion(playerPosition);
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}
