var camera = null;
var cameraTransition = null;
var cameraZoomTransition = null;

function transitionCameraToRegion(activeRegion) {
  if (cameraTransition && cameraTransition.to.position[0] === activeRegion.cameraAnchor[0] && cameraTransition.to.position[1] === activeRegion.cameraAnchor[1]) {
    return;
  }

  cameraTransition = {
    start: (new Date()).getTime(),
    from: {
      position: [camera.position[0], camera.position[1]],
      zoom: camera.zoom
    },
    to: {
      position: [activeRegion.cameraAnchor[0], activeRegion.cameraAnchor[1] - 0.8],
      zoom: activeRegion.zoom || 1
    }
  };
}

function transitionCameraPulledByPlayer(activeRegion, horizontal) {
  var targetPosition = [];
  if (horizontal) {
    var regionWidth = activeRegion.bounds.maxX - activeRegion.bounds.minX;
    var direction = Math.sign(playerPosition.x - activeRegion.cameraAnchor[0]);
    var playerOffset = Math.abs((playerPosition.x + 0.5) - activeRegion.cameraAnchor[0]) - (regionWidth / 2);

    targetPosition = [
      activeRegion.cameraAnchor[0] + (playerOffset * direction),
      activeRegion.cameraAnchor[1] - 0.8
    ];
  } else {
    targetPosition = [
      activeRegion.cameraAnchor[0],
      activeRegion.cameraAnchor[1] - 0.8 + (playerPosition.y - activeRegion.cameraAnchor[1] - 0.8) * 0.4
    ];
  }

  cameraTransition = {
    to: {
      position: targetPosition,
      zoom: activeRegion.zoom || 1
    }
  };
}

function transitionCameraToPlayer(activeRegion) {
  var zoom = activeRegion != null ? (activeRegion.zoom || 1) : 1;

  cameraTransition = {
    to: {
      position: [playerPosition.x + 0.5, playerPosition.y + 0.5],
      zoom: zoom
    }
  };
}

function transitionCameraToPlayerAnchored(activeRegion, horizontal) {
  if (horizontal) {
    cameraTransition = {
      to: {
        position: [activeRegion.cameraAnchor[0], playerPosition.y],
        zoom: activeRegion.zoom || 1
      }
    };
  } else {
    cameraTransition = {
      to: {
        position: [playerPosition.x, activeRegion.cameraAnchor[1] - 0.8],
        zoom: activeRegion.zoom || 1
      }
    };
  }
}

function initSmoothCamera() {
  var region = getActiveRegion();

  camera = {
    position: [region.cameraAnchor[0], region.cameraAnchor[1] - 0.8],
    zoom: region.zoom || 1
  };
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}
