var objectTrackers = null;
var explosionTrackers = {};
var initialObjectTrackers = null;

function restoreActiveRegion(lev) {
  var activeRegionIndex = activeRegion.index;
  var regionBounds = getRegionBounds(regions[curlevel][activeRegionIndex], true);

  var trackersToRemove = getObjectTrackersFromOrigin(activeRegionIndex);

  var foreignRegionIndexes = [];

  for (var i = 0; i < trackersToRemove.length; i++) {
    var objectTracker = trackersToRemove[i];
    var x = objectTracker[1];
    var y = objectTracker[2];
    var above = objectTracker[0];
    var positionIndex = x * level.height + y;
    var cell = level.getCell(positionIndex);
    cell.iclear(state.objectMasks[above ? 'dynamic_above' : 'dynamic_below']);
    cell.iclear(state.objectMasks[above ? 'sticky_above' : 'sticky_below']);
    level.setCell(positionIndex, cell);

    if (!above) {
      var cellUp = level.getCell(positionIndex - 1);
      cellUp.iclear(state.objectMasks['ladderd']);
      level.setCell(positionIndex - 1, cellUp);

      var cellDown = level.getCell(positionIndex + 1);
      cellDown.iclear(state.objectMasks['ladderu']);
      level.setCell(positionIndex + 1, cellDown);

      var cellLeft = level.getCell(positionIndex - level.height);
      cellLeft.iclear(state.objectMasks['ladderr']);
      level.setCell(positionIndex - level.height, cellLeft);

      var cellRight = level.getCell(positionIndex + level.height);
      cellRight.iclear(state.objectMasks['ladderl']);
      level.setCell(positionIndex + level.height, cellRight);
    }

    var foreignRegionIndex = getRegionIndex(x, y);
    if (foreignRegionIndex !== activeRegionIndex) {
      foreignRegionIndexes.push(foreignRegionIndex);
    }
  }

  var explosionTrackersToRemove = [];

  // Copy original state of level for the active region
  for (var x = regionBounds.minX; x < regionBounds.maxX; x++) {
    for (var y = regionBounds.minY; y < regionBounds.maxY; y++) {
      var positionIndex = x * level.height + y;

      var inRegion = getRegionIndex(x, y) === activeRegionIndex;
      var aboveOutsideRegion = getRegionIndex(x, y+2) !== activeRegionIndex;

      if (inRegion) {
        var cell = level.getCell(positionIndex);
        if (cell.anyBitsInCommon(state.objectMasks['dynamic_above'])) {
          trackersToRemove.push([true, x, y]);
        }
        if (cell.anyBitsInCommon(state.objectMasks['dynamic_below'])) {
          trackersToRemove.push([false, x, y]);
        }

        explosionTrackersToRemove.push([x, y]);

        for (var i = 0; i < STRIDE_OBJ; i++) {
          if (aboveOutsideRegion) {
            var mask = state.objectMasks['render_above_top2'].data[i];
            level.objects[positionIndex * STRIDE_OBJ + i] = originalLevel.dat[positionIndex * STRIDE_OBJ + i] & (~mask);
          } else {
            level.objects[positionIndex * STRIDE_OBJ + i] = originalLevel.dat[positionIndex * STRIDE_OBJ + i];
          }
        }
      }
    }
  }

  removeExplosionTrackersForPositions(explosionTrackersToRemove);

  var regionExplosionTrackers = extractExplosionTrackersForRegion(activeRegionIndex);
  for (var i = 0; i < regionExplosionTrackers.length; i++) {
    var regionExplosionTracker = regionExplosionTrackers[i];
    var x = regionExplosionTracker.x;
    var y = regionExplosionTracker.y;

    var positionIndex = x * level.height + y;

    var cell = level.getCell(positionIndex);
    if (cell.anyBitsInCommon(state.objectMasks['dynamic_above'])) {
      trackersToRemove.push([true, x, y]);
    }
    if (cell.anyBitsInCommon(state.objectMasks['dynamic_below'])) {
      trackersToRemove.push([false, x, y]);
    }

    for (var j = 0; j < STRIDE_OBJ; j++) {
      level.objects[positionIndex * STRIDE_OBJ + j] = originalLevel.dat[positionIndex * STRIDE_OBJ + j];
    }
  }

  removeObjectTrackers(trackersToRemove);

  if (activeRegion.id === 'second ending secret room') {
    updateAllSecretMarkers();
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

    return foreignRegionIndexes;
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

function moveObjectTracker(fromAbove, fromX, fromY, toAbove, toX, toY) {
  for (var i = 0; i < objectTrackers.length; i++) {
    if ((objectTrackers[i] & 0x00000080) > 0 === fromAbove
      && ((objectTrackers[i] & 0x0000FF00) >> 8) === fromX
      && ((objectTrackers[i] & 0x00FF0000) >> 16) === fromY) {
      objectTrackers[i] = (objectTrackers[i] & 0xFF00007F) | (toAbove << 7) | (toX << 8) | (toY << 16);
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

function getExplosiveTrackerOriginRegion(x, y, above) {
  for (var i = 0; i < objectTrackers.length; i++) {
    if ((objectTrackers[i] & 0x00000080) > 0 === above
      && ((objectTrackers[i] & 0x0000FF00) >> 8) === x
      && ((objectTrackers[i] & 0x00FF0000) >> 16) === y
      && ((objectTrackers[i] & 0x0000000F) === TRACKED_EXPLOSIVE)) {
      return (objectTrackers[i] & 0xFF000000) >> 24;
    }
  }
  return null;
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

function initExplosionTrackers() {
  explosionTrackers = new Int32Array(0);
}

function addExplosionTracker(x, y, above, originRegion) {
  var tracker = above << 7
    | x << 8
    | y << 16
    | originRegion << 24;

  var previousTrackers = explosionTrackers;
  explosionTrackers = new Int32Array(previousTrackers.length + 1);
  explosionTrackers.set(previousTrackers);

  explosionTrackers[explosionTrackers.length - 1] = tracker;
}

function extractExplosionTrackersForRegion(originRegion) {
  var extracted = [];
  explosionTrackers = explosionTrackers.filter(function(explosionTracker) {
    var shouldExtract = ((explosionTracker & 0xFF000000) >> 24) === originRegion;
    if (shouldExtract) {
      extracted.push({
        x: (explosionTracker & 0x0000FF00) >> 8,
        y: (explosionTracker & 0x00FF0000) >> 16,
        above: (explosionTracker & 0x00000080) > 0
      });
    }
    return !shouldExtract;
  });
  return extracted;
}

function removeExplosionTrackersForPositions(positionsToRemove) {
  explosionTrackers = explosionTrackers.filter(function(explosionTracker) {
    return !positionsToRemove.find(function(positionToRemove) {
      return ((explosionTracker & 0x0000FF00) >> 8) === positionToRemove[0]
        && ((explosionTracker & 0x00FF0000) >> 16) === positionToRemove[1];
    });
  });
}

function printExplosionTrackers() {
  for (var i = 0; i < explosionTrackers.length; i++) {
    var line = '';
    line += (explosionTrackers[i] & 0x00000080) > 0 ? 'above ' : 'below ';
    line += ((explosionTrackers[i] & 0x0000FF00) >> 8) + ',' + ((explosionTrackers[i] & 0x00FF0000) >> 16);
    console.log(line)
  }
}
