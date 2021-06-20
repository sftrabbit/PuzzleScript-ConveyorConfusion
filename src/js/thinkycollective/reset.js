var objectTrackers = null;
var initialObjectTrackers = null;

function restoreActiveRegion(lev) {
  oldflickscreendat=lev.oldflickscreendat.concat([]);

  var playerPosition = getPlayerPositions()[0];
  var playerX = (playerPosition / level.height) | 0;
  var playerY = playerPosition % level.height;

  var activeRegionIndex = getRegionIndex(playerX, playerY);
  var regionBounds = getRegionBounds(regions[activeRegionIndex], true);

  // Gather foreign objects that need to be recreated after restore
  var foreignObjects = [];

  for (var x = regionBounds.minX; x < regionBounds.maxX; x++) {
    for (var y = regionBounds.minY; y < regionBounds.maxY; y++) {
      var cellTrackers = objectTrackers[x][y];

      var trackerLayers = Object.keys(cellTrackers);
      for (var i = 0; i < trackerLayers.length; i++) {
        var trackerLayer = trackerLayers[i];
        var trackerRegionIndex = cellTrackers[trackerLayer];

        if (trackerRegionIndex !== activeRegionIndex) {
          var layerMask = state.layerMasks[trackerLayer];

          var objectMask = level.getCell(x * level.height + y);
          objectMask.iand(layerMask);

          foreignObjects.push({
            x: x,
            y: y,
            layer: trackerLayer,
            objectMask: objectMask,
            sourceRegion: trackerRegionIndex
          });
        }
      }
    }
  }

  // Copy original state of level for the active region
  for (var x = 0; x < level.width; x++) {
    for (var y = 0; y < level.height; y++) {
      var positionIndex = x * level.height + y;

      var inRegion = getRegionIndex(x, y) === activeRegionIndex;

      if (inRegion) {
        for (var i = 0; i < STRIDE_OBJ; i++) {
          level.objects[positionIndex * STRIDE_OBJ + i] = lev.dat[positionIndex * STRIDE_OBJ + i];
        }

        objectTrackers[x][y] = JSON.parse(JSON.stringify(initialObjectTrackers[x][y]))
      } else {
        var layers = Object.keys(objectTrackers[x][y]);
        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];

          if (objectTrackers[x][y][layer] === activeRegionIndex) {
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

  // Recreate foreign objects
  for (var i = 0; i < foreignObjects.length; i++) {
    var foreignObject = foreignObjects[i];

    var positionIndex = foreignObject.x * level.height + foreignObject.y;
    var cell = level.getCell(positionIndex);

    var layerMask = state.layerMasks[foreignObject.layer];

    if (cell.anyBitsInCommon(layerMask)) {
      continue;
    }

    cell.iclear(layerMask);
    cell.ior(foreignObject.objectMask);

    level.setCell(positionIndex, cell);

    objectTrackers[foreignObject.x][foreignObject.y][foreignObject.layer] = foreignObject.sourceRegion;
  }

  // Stuff copied from the normal restore function (could probably do with tidying up)
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
