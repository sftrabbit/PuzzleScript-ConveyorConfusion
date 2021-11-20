var playerPosition = null;
var previousActiveRegionIndex = null;

var levelNeedsDraw = true;

function initOpenWorld() {
  initRegions();
  initLevelState();
  initObjectTrackers();
}

function onStateUpdate(againing, action) {
  if (!isOpenWorldLevel()) {
    redraw();
    return;
  }

  var activeRegion = getActiveRegion();
  if (activeRegion == null) {
    transitionCameraToPlayer(activeRegion);
    return;
  }

  if (previousActiveRegionIndex != null && activeRegion.index !== previousActiveRegionIndex) {
    saveLevelState();
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
