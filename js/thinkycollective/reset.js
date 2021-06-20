var objectTrackers = null;
var initialObjectTrackers = null;

function restoreActiveRegion(lev) {
  oldflickscreendat=lev.oldflickscreendat.concat([]);

  var playerPosition = getPlayerPositions()[0];
  var playerX = (playerPosition / level.height) | 0;
  var playerY = playerPosition % level.height;

  var activeRegion = getRegionIndex(playerX, playerY);

  // Copy original state of level for the active region
  for (var x = 0; x < level.width; x++) {
    for (var y = 0; y < level.height; y++) {
      var positionIndex = x * level.height + y;

      var inRegion = getRegionIndex(x, y) === activeRegion;

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

function initObjectTrackers() {
  objectTrackers = [];

  var objectNames = Object.keys(state.moverObjectLayers);

  for (var x = 0; x < level.width; x++) {
    var objectTrackersColumn = [];

    for (var y = 0; y < level.height; y++) {
      var positionIndex = x * level.height + y;
      var cell = level.getCell(positionIndex);

      var trackers = {};

      var region = getRegionIndex(x, y);

      if (cell.anyBitsInCommon(state.moverMask)) {
        for (var i = 0; i < objectNames.length; i++) {
          trackers[state.moverObjectLayers[objectNames[i]]] = region;
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
