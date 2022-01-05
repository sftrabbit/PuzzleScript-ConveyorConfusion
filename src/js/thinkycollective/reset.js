var objectTrackers = null;
var explosionTrackers = {};
var initialObjectTrackers = null;

function restoreActiveRegion(lev) {
  var activeRegionIndex = activeRegion.index;
  var regionBounds = getRegionBounds(regions[curlevel][activeRegionIndex], true);

  var trackersToRemove = getObjectTrackersFromOrigin(activeRegionIndex);

  var foreignRegionIndexes = [];

  var hasCoolHat = state.objectMasks['coolhat'].anyBitsInCommon(level.mapCellContents);

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

    var cellUp = level.getCell(positionIndex - 1);
    cellUp.iclear(state.objectMasks[above ? 'render_above_top' : 'render_below_top']);
    level.setCell(positionIndex - 1, cellUp);

    if (above) {
      var cellUp2 = level.getCell(positionIndex - 2);
      cellUp2.iclear(state.objectMasks['render_above_top2']);
      level.setCell(positionIndex - 2, cellUp2);
    }

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

    var originalCell = new BitVec(originalLevel.dat.subarray(positionIndex * STRIDE_OBJ, positionIndex * STRIDE_OBJ + STRIDE_OBJ));
    originalCell.iclear(state.objectMasks['render']);
    originalCell.iclear(state.objectMasks['player']);
    var cell = level.getCell(positionIndex);
    cell.ior(originalCell);
    level.setCell(positionIndex, cell);

    var topPositionIndex = positionIndex - 1;
    var originalCellTop = new BitVec(originalLevel.dat.subarray(topPositionIndex * STRIDE_OBJ, topPositionIndex * STRIDE_OBJ + STRIDE_OBJ));
    var topMask = state.objectMasks['render_below_top'].clone();
    topMask.ior(state.objectMasks['render_above_top']);
    topMask.ior(state.objectMasks['platform_top']);
    topMask.ior(state.objectMasks['button_above_top']);
    topMask.ior(state.objectMasks['inflatable_top']);
    topMask.ior(state.objectMasks['slimevat_above_top']);
    originalCellTop.iand(topMask);
    var cellTop = level.getCell(topPositionIndex);
    cellTop.ior(originalCellTop);
    cellTop.iclear(state.objectMasks['platform_front']);
    level.setCell(topPositionIndex, cellTop);

    var top2PositionIndex = positionIndex - 2;
    var originalCellTop2 = new BitVec(originalLevel.dat.subarray(top2PositionIndex * STRIDE_OBJ, top2PositionIndex * STRIDE_OBJ + STRIDE_OBJ));
    var top2Mask = state.objectMasks['render_above_top2'].clone();
    top2Mask.ior(state.objectMasks['slimevat_above_top2']);
    originalCellTop2.iand(top2Mask);
    var cellTop2 = level.getCell(top2PositionIndex);
    cellTop2.ior(originalCellTop2);
    level.setCell(top2PositionIndex, cellTop2);
  }

  removeObjectTrackers(trackersToRemove);

  if (activeRegion.id === 'second ending secret room') {
    updateAllSecretMarkers();
  }

  if (hasCoolHat) {
    var playerPositions = getPlayerPositions();
    if (playerPositions.length > 0) {
      var playerCell = level.getCell(playerPositions[0]);
      var isPlayerAbove = playerCell.anyBitsInCommon(state.objectMasks['player_above']);
      playerCell.iclear(state.objectMasks['player']);
      playerCell.ior(state.objectMasks[isPlayerAbove ? 'coolhat_above' : 'coolhat_below']);
      level.setCell(playerPositions[0], playerCell);
    }
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
