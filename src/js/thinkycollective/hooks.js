var playerPosition = null;
var previousActiveRegionIndex = null;

var levelNeedsDraw = true;

var pendingSave = false;

function initOpenWorld() {
  initRegions();
  initObjectTrackers();
}

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
  }

  if (!againing && pendingSave) {
    saveLevelState();
    pendingSave = false;
  }

  transitionCamera(activeRegion);
}

function updateSecretMarker(secret) {
  for (var i = 0; i < secrets.length; i++) {
    if (i !== 10) {
      var secretX = secrets[i];
      var markerCell = level.getCell(secretX.markerIndex);
      markerCell.iclear(state.objectMasks['secret_off']);
      markerCell.ior(state.objectMasks['secret_on']);
      level.setCell(secretX.markerIndex, markerCell);
    }
  }

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

function initLevelState() {
  for (var y = 0; y < level.height; y++) {
    for (var x = 0; x < level.width; x++) {
      var index = x * level.height + y;
      var cell = level.getCellInto(index, _o10);

      if (cell.anyBitsInCommon(state.objectMasks['player'])) {
        var region = getRegion({ x: x, y: y });
        if (!region.start) {
          cell.iclear(state.objectMasks['player']);
          level.setCell(index, _o10);
        }
      }
    }
  }
}
