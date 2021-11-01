var playerPosition = null;

var levelNeedsDraw = true;

function onStateUpdate(againing, action) {
  if (!isOpenWorldLevel()) {
    redraw();
    return;
  }

  var activeRegion = getActiveRegion();
  if (activeRegion == null) {
    transitionCameraToPlayer();
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
    transitionCameraToPlayer();
  } else if (activeArea.camera === 'follow-player-anchored-x') {
    transitionCameraToPlayerAnchored(activeRegion, true);
  } else if (activeArea.camera === 'follow-player-anchored-y') {
    transitionCameraToPlayerAnchored(activeRegion, false);
  }
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
