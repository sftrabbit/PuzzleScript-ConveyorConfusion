var camera = null;
var cameraTransition = null;
var currentRegion = null;

function transitionCameraToRegion(region) {
  cameraTransition = {
    start: (new Date()).getTime(),
    from: {
      position: [camera.position[0], camera.position[1]],
      zoom: camera.zoom
    },
    to: {
      position: [region.cameraAnchor[0], region.cameraAnchor[1]],
      zoom: region.zoom
    }
  };
}

function initSmoothCamera() {
  var region = getActiveRegion();

  camera = {
    position: [region.cameraAnchor[0], region.cameraAnchor[1]],
    zoom: region.zoom
  };
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}
