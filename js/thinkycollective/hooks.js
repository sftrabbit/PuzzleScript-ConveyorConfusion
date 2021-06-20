function onStateUpdate(againing, action) {
  if (curlevel !== 0) {
    return;
  }

  drawLevel();

  var region = getActiveRegion();

  if (region !== currentRegion) {
    transitionCameraToRegion(region);
    currentRegion = region;
  }
}

function isOpenWorldLevel() {
  return curlevel === 0;
}
