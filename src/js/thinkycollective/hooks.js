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

var setSigilA = false;
var setSigilB = false;
var setSigilC = false;

var isLevelLatestVersion = true;

function onStateUpdate(isAgaining, action) {
  if (!isOpenWorldLevel()) {
    redraw();
    return;
  }

  if (firstTurn) {
    return;
  }

  var activeRegion = getActiveRegion();
  var previousOverrideActiveRegion = overrideActiveRegion;

  if (activeRegion.secret) {
    updateSecretMarker(activeRegion.secret);
  } else if (activeRegion.indirectSecret) {
    updateSecretMarker(regions[curlevel][regionIds[activeRegion.indirectSecret]].secret);
  }

  if (activeRegion.finish || activeRegion.secondEndingGate) {
    if (!setSigilA && state.objectMasks['sigila_on'].anyBitsInCommon(level.mapCellContents)) {
      setSigilA = true;

      var sigilCell = level.getCell(sigilPositions[0]);
      sigilCell.iclear(state.objectMasks['sigila_off']);
      sigilCell.ior(state.objectMasks['sigila_on']);
      level.setCell(sigilPositions[0], sigilCell);

      var sigilCellTop = level.getCell(sigilPositions[0] - 1);
      sigilCellTop.iclear(state.objectMasks['sigila_off_top']);
      sigilCellTop.ior(state.objectMasks['sigila_on_top']);
      level.setCell(sigilPositions[0] - 1, sigilCellTop);

      overrideActiveRegion = regions[curlevel][regionIds['second ending gate']];
      againing = true;
    }

    if (!setSigilB && state.objectMasks['sigilb_on'].anyBitsInCommon(level.mapCellContents)) {
      setSigilB = true;
      
      var sigilCell = level.getCell(sigilPositions[1]);
      sigilCell.iclear(state.objectMasks['sigilb_off']);
      sigilCell.ior(state.objectMasks['sigilb_on']);
      level.setCell(sigilPositions[1], sigilCell);

      var sigilCellTop = level.getCell(sigilPositions[1] - 1);
      sigilCellTop.iclear(state.objectMasks['sigilb_off_top']);
      sigilCellTop.ior(state.objectMasks['sigilb_on_top']);
      level.setCell(sigilPositions[1] - 1, sigilCellTop);

      overrideActiveRegion = regions[curlevel][regionIds['second ending gate']];
      againing = true;
    }
  }

  var changedRegion = activeRegion.index !== previousActiveRegionIndex;

  if (changedRegion) {
    if (previousActiveRegionIndex != null) {
      var previousRegion = regions[curlevel][previousActiveRegionIndex];

      if (activeRegion.allowSave && previousRegion.allowSave) {
        pendingSave = true;
      }

      // Track belts released from merge levels
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

    isLevelLatestVersion = determineLatest(activeRegion);
  }

  if (state.objectMasks['ending1trigger'].bitsSetInArray(level.mapCellContents.data)) {
    startEnding1();
  }

  if (state.objectMasks['ending2secretchar2'].bitsSetInArray(level.mapCellContents.data)) {
    startEnding2();
  }

  if (!isAgaining) {
    if (pendingSave) {
      saveLevelState();
      pendingSave = false;
    }

    if (overrideActiveRegion != null && overrideActiveRegion === previousOverrideActiveRegion) {
      overrideActiveRegion = null;
      againing = true;
    }
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

  if (secretsComplete && !setSigilC) {
    setSigilC = true;

    for (var i = 0; i < sigilCPositions.length; i++) {
      var sigilCell = level.getCell(sigilCPositions[i]);
      sigilCell.iclear(state.objectMasks['sigilc_off']);
      sigilCell.ior(state.objectMasks['sigilc_on']);
      level.setCell(sigilCPositions[i], sigilCell);

      var sigilCellTop = level.getCell(sigilCPositions[i] - 1);
      sigilCellTop.iclear(state.objectMasks['sigilc_off_top']);
      sigilCellTop.ior(state.objectMasks['sigilc_on_top']);
      level.setCell(sigilCPositions[i] - 1, sigilCellTop);
    }

    overrideActiveRegion = regions[curlevel][regionIds['second ending secret room']];

    againing = true;
  }
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
