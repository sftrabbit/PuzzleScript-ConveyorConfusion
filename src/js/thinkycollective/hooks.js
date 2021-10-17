function onStateUpdate(againing, action) {
  drawLevel();
  redraw();

  if (!isOpenWorldLevel()) {
    return;
  }

  var activeRegion = getActiveRegion();
  var region = activeRegion[0];
  var isPrimary = activeRegion[1];

  if (currentRegion == null) {
    currentRegion = region;
    currentRegionPrimary = isPrimary;
  }

  if (region.cameraFollowPlayer) {
    transitionCameraToPlayer();

    if (isPrimary) {
      currentRegion = region;
    }
  } else {
    if (isPrimary) {
      if (region !== currentRegion || isPrimary !== currentRegionPrimary) {
        transitionCameraToRegion(activeRegion);
      }

      currentRegion = region;
    } else {
      transitionCameraPulledByPlayer();
    }
  }

  currentRegionPrimary = isPrimary;
}

function isOpenWorldLevel() {
  return !textMode && regions[curlevel] != null;
}

function clearOpenWorldState() {
  window.cancelAnimationFrame(currentAnimationFrameId);

  regionMap = [];
  camera = null;
  cameraTransition = null;
  currentRegion = null;
  currentRegionPrimary = null;
  objectTrackers = [];
}
