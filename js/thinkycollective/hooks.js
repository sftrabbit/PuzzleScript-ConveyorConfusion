function onStateUpdate(againing, action) {
  if (curlevel !== 0) {
    return;
  }

  drawLevel();

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
  return curlevel === 0;
}
