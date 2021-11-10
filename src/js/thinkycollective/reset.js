var objectTrackers = null;
var initialObjectTrackers = null;

function restoreActiveRegion(lev) {
  oldflickscreendat=lev.oldflickscreendat.concat([]);

  var playerPosition = getPlayerPositions()[0];
  var playerX = (playerPosition / level.height) | 0;
  var playerY = playerPosition % level.height;

  var activeRegionIndex = getRegionIndex(playerX, playerY);
  var regionBounds = getRegionBounds(regions[curlevel][activeRegionIndex], true);

  // Gather foreign objects that need to be recreated after restore
  // var foreignObjects = [];

  // for (var x = regionBounds.minX; x < regionBounds.maxX; x++) {
  //   for (var y = regionBounds.minY; y < regionBounds.maxY; y++) {
  //     var cellTrackers = objectTrackers[x][y];

  //     var trackerLayers = Object.keys(cellTrackers);
  //     for (var i = 0; i < trackerLayers.length; i++) {
  //       var trackerLayer = trackerLayers[i];
  //       var trackerRegionIndex = cellTrackers[trackerLayer];

  //       if (trackerRegionIndex !== activeRegionIndex) {
  //         var layerMask = state.layerMasks[trackerLayer];

  //         var objectMask = level.getCell(x * level.height + y);
  //         objectMask.iand(layerMask);

  //         foreignObjects.push({
  //           x: x,
  //           y: y,
  //           layer: trackerLayer,
  //           objectMask: objectMask,
  //           sourceRegion: trackerRegionIndex
  //         });
  //       }
  //     }
  //   }
  // }

  var dispersedObjectTrackers = getObjectTrackersFromOrigin(activeRegionIndex);
  for (var i = 0; i < dispersedObjectTrackers.length; i++) {
    var objectTracker = dispersedObjectTrackers[i];
    var positionIndex = objectTracker[1] * level.height + objectTracker[2];
    var cell = level.getCell(positionIndex);
    cell.iclear(state.objectMasks[objectTracker[0] ? 'dynamic_above' : 'dynamic_below']);
    level.setCell(positionIndex, cell);
  }
  removeObjectTrackers(dispersedObjectTrackers);

  // Copy original state of level for the active region
  for (var x = regionBounds.minX; x < regionBounds.maxX; x++) {
    for (var y = regionBounds.minY; y < regionBounds.maxY; y++) {
      var positionIndex = x * level.height + y;

      var inRegion = getRegionIndex(x, y) === activeRegionIndex;

      if (inRegion) {
        for (var i = 0; i < STRIDE_OBJ; i++) {
          level.objects[positionIndex * STRIDE_OBJ + i] = lev.dat[positionIndex * STRIDE_OBJ + i];
        }

        // objectTrackers[x][y] = JSON.parse(JSON.stringify(initialObjectTrackers[x][y]))
      } else {
        // var layers = Object.keys(objectTrackers[x][y]);
        // for (var i = 0; i < layers.length; i++) {
        //   var layer = layers[i];

        //   if (objectTrackers[x][y][layer] === activeRegionIndex) {
        //     var cell = level.getCell(positionIndex);
        //     var layerMask = state.layerMasks[layer];
        //     cell.iclear(layerMask);
        //     level.setCell(positionIndex, cell);

        //     delete objectTrackers[x][y][layer];
        //   }
        // }
      }
    }
  }

  // Recreate foreign objects
  // for (var i = 0; i < foreignObjects.length; i++) {
  //   var foreignObject = foreignObjects[i];

  //   var positionIndex = foreignObject.x * level.height + foreignObject.y;
  //   var cell = level.getCell(positionIndex);

  //   var layerMask = state.layerMasks[foreignObject.layer];

  //   // If the restored cell already has stuff in this layer, foreign object doesn't get to exist anymore
  //   if (cell.anyBitsInCommon(layerMask)) {
  //     continue;
  //   }

  //   cell.iclear(layerMask);
  //   cell.ior(foreignObject.objectMask);

  //   level.setCell(positionIndex, cell);

  //   objectTrackers[foreignObject.x][foreignObject.y][foreignObject.layer] = foreignObject.sourceRegion;
  // }

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
  objectTrackers = new Int32Array(0);
}

function isObjectTracked(above, objectType, x, y) {
  for (var i = 0; i < objectTrackers.length; i++) {
    if ((objectTrackers[i] & 0x00000080) > 0 === above
      && (objectTrackers[i] & 0x0000000F) === objectType
      && ((objectTrackers[i] & 0x0000FF00) >> 8) === x
      && ((objectTrackers[i] & 0x00FF0000) >> 16) === y) {
      return true;
    }
  }
  return false;
}

function startObjectTracker(above, objectType, x, y, originRegion) {
  var tracker = objectType
    | above << 7
    | x << 8
    | y << 16
    | originRegion << 24;

  var previousTrackers = objectTrackers;
  objectTrackers = new Int32Array(previousTrackers.length + 1);
  objectTrackers.set(previousTrackers);

  objectTrackers[objectTrackers.length - 1] = tracker;
}

function moveObjectTracker(above, fromX, fromY, toX, toY) {
  for (var i = 0; i < objectTrackers.length; i++) {
    if ((objectTrackers[i] & 0x00000080) > 0 === above
      && ((objectTrackers[i] & 0x0000FF00) >> 8) === fromX
      && ((objectTrackers[i] & 0x00FF0000) >> 16) === fromY) {
      objectTrackers[i] = (objectTrackers[i] & 0xFF0000FF) | (toX << 8) | (toY << 16);
      break;
    }
  }
}

function getObjectTrackersFromOrigin(originRegion) {
  var fromOrigin = [];
  for (var i = 0; i < objectTrackers.length; i++) {
    if (((objectTrackers[i] & 0xFF000000) >> 24) === originRegion) {
      fromOrigin.push([
        (objectTrackers[i] & 0x00000080) > 0,
        (objectTrackers[i] & 0x0000FF00) >> 8,
        (objectTrackers[i] & 0x00FF0000) >> 16
      ]);
    }
  }
  return fromOrigin;
}

function removeObjectTrackers(objectTrackersToRemove) {
  objectTrackers = objectTrackers.filter(function(objectTracker) {
    return !objectTrackersToRemove.find(function(objectTrackerToRemove) {
      return (objectTracker & 0x00000080) > 0 === objectTrackerToRemove[0]
        && ((objectTracker & 0x0000FF00) >> 8) === objectTrackerToRemove[1]
        && ((objectTracker & 0x00FF0000) >> 16) === objectTrackerToRemove[2];
    });
  });
}

var TRACKED_BELT = 0;
var TRACKED_EXPLOSIVE = 1;

var TRACKED_LAYERS = [[false, 'tracked_below', 'belt_below'], [true, 'tracked_above', 'belt_above']];

function printObjectTrackers() {
  for (var i = 0; i < objectTrackers.length; i++) {
    var line = '';
    line += (objectTrackers[i] & 0x0000000F) === TRACKED_BELT ? 'belt_' : 'explosive_';
    line += (objectTrackers[i] & 0x00000080) > 0 ? 'above ' : 'below ';
    line += ((objectTrackers[i] & 0x0000FF00) >> 8) + ',' + ((objectTrackers[i] & 0x00FF0000) >> 16);
    console.log(line)
  }
}
