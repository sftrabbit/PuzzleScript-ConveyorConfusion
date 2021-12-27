var playerPosition = null;
var previousActiveRegionIndex = null;

var levelNeedsDraw = true;

var pendingSave = false;

function initOpenWorld() {
  initRegions();
  initObjectTrackers();
  initExplosionTrackers();
}

var releasedBlockFrom = null;

function onStateUpdate(againing, action) {
  if (!isOpenWorldLevel()) {
    redraw();
    return;
  }

  var activeRegion = getActiveRegion();

  if (activeRegion.secret) {
    updateSecretMarker(activeRegion.secret);
  }

  var changedRegion = previousActiveRegionIndex != null && activeRegion.index !== previousActiveRegionIndex;

  if (changedRegion) {
    pendingSave = true;

    var previousRegion = regions[curlevel][previousActiveRegionIndex];
    if (previousRegion.blockRelease && activeRegion.mergeCorridor) {
      var releasedBlockX = regionsOffset[0] + previousRegion.offset[0] + previousRegion.blockRelease[0];
      var releasedBlockY = regionsOffset[1] + previousRegion.offset[1] + previousRegion.blockRelease[1];
      var releasedBlockPositionIndex = (releasedBlockX) * level.height + (releasedBlockY);
      var releasedBlockCell = level.getCell(releasedBlockPositionIndex);
      if (releasedBlockCell.anyBitsInCommon(state.objectMasks['belt_above'])) {
        releasedBlockFrom = previousActiveRegionIndex;
      }
    } else if (previousRegion.mergeCorridor && activeRegion.endingGate) {
      if (releasedBlockFrom != null) {
        removeObjectTrackers([[true, 67, 32]]);
        startObjectTracker(true, TRACKED_BELT, 67, 32, releasedBlockFrom);
        releasedBlockFrom = null;
      }
    }
  }

  if (!againing && pendingSave) {
    saveLevelState();
    pendingSave = false;
  }

  transitionCamera(activeRegion);
}

function updateSecretMarker(secret) {
  var buttonCell = level.getCell(secret.buttonIndex);
  if (buttonCell.anyBitsInCommon(state.objectMasks['dynamic_below'])) {
    var markerCell = level.getCell(secret.markerIndex);
    if (markerCell.anyBitsInCommon(state.objectMasks['secret_off'])) {
      markerCell.iclear(state.objectMasks['secret_off']);
      markerCell.ior(state.objectMasks['secret_on']);
      level.setCell(secret.markerIndex, markerCell);

      checkSecretMarkers();
    }
  }
}

function updateAllSecretMarkers() {
  for (var i = 0; i < regions[0].length; i++) {
    var region = regions[0][i];
    if (region.secret) {
      updateSecretMarker(region.secret);
    }
  }
}

function checkSecretMarkers() {
  var secretsComplete = true;
  for (var i = 0; i < secrets.length; i++) {
    var secret = secrets[i];
    var markerCell = level.getCell(secret.markerIndex);
    if (!markerCell.anyBitsInCommon(state.objectMasks['secret_on'])) {
      secretsComplete = false;
      break;
    }
  }

  if (secretsComplete) {
    againing = true;
  }
  console.log('Secrets complete?', secretsComplete);
}

function transitionCamera(activeRegion) {
  if (activeRegion == null) {
    transitionCameraToPlayer(activeRegion);
    return;
  }

  var activeArea = getActiveArea();
  if (activeArea.camera === 'region-center') {
    transitionCameraToRegion(activeRegion);
  } else if (activeArea.camera === 'pull-horizontal') {
    transitionCameraPulledByPlayer(activeRegion, true);
  } else if (activeArea.camera === 'pull-vertical') {
    transitionCameraPulledByPlayer(activeRegion, false);
  } else if (activeArea.camera === 'follow-player') {
    transitionCameraToPlayer(activeRegion);
  } else if (activeArea.camera === 'follow-player-anchored-x') {
    transitionCameraToPlayerAnchored(activeRegion, true);
  } else if (activeArea.camera === 'follow-player-anchored-y') {
    transitionCameraToPlayerAnchored(activeRegion, false);
  }

  previousActiveRegionIndex = activeRegion.index;
}

function isOpenWorldLevel() {
  return !textMode && regions[curlevel] != null;
}

function clearOpenWorldState() {
  window.cancelAnimationFrame(currentAnimationFrameId);

  regionMap = [];
  camera = null;
  cameraTransition = null;
  objectTrackers = [];
}

function removePlayerDecorations() {
  for (var y = 0; y < level.height; y++) {
    for (var x = 0; x < level.width; x++) {
      var index = x * level.height + y;
      var cell = level.getCellInto(index, _o10);

      if (cell.anyBitsInCommon(state.objectMasks['playerdecorations'])) {
        cell.iclear(state.objectMasks['playerdecorations']);
        level.setCell(index, _o10);
      }
    }
  }
}

function removePlayers() {
  for (var y = 0; y < level.height; y++) {
    for (var x = 0; x < level.width; x++) {
      var index = x * level.height + y;
      var cell = level.getCellInto(index, _o10);

      if (cell.anyBitsInCommon(state.objectMasks['player'])) {
        var region = getRegion({ x: x, y: y });
        if (!region.start) {
          cell.iclear(state.objectMasks['player']);
          cell.iclear(state.objectMasks['moved']);
          level.setCell(index, _o10);
        }
      }
    }
  }
}

function restoreOriginalLevel () {
  for (var x = 0; x < level.width; x++) {
    for (var y = 0; y < level.height; y++) {
      var positionIndex = x * level.height + y;

      for (var i = 0; i < STRIDE_OBJ; i++) {
        level.objects[positionIndex * STRIDE_OBJ + i] = originalLevel.dat[positionIndex * STRIDE_OBJ + i];
      }
    }
  }
}
