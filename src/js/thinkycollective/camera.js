var camera = null;
var cameraTransition = null;
var currentRegion = null;
var currentRegionPrimary = null;

function transitionCameraToRegion(activeRegion) {
  var region = activeRegion[0];
  var isPrimary = activeRegion[1];

  cameraTransition = {
    start: (new Date()).getTime(),
    from: {
      position: [camera.position[0], camera.position[1]]
    },
    to: {
      position: [region.cameraAnchor[0], region.cameraAnchor[1]]
    }
  };
}

function transitionCameraPulledByPlayer() {
  var playerPositions = getPlayerPositions();

  const playerPosition = {
    x: (playerPositions[0]/(level.height))|0,
    y: (playerPositions[0]%level.height)|0
  };

  var xDiff = Math.abs(playerPosition.x - currentRegion.cameraAnchor[0]);
  var yDiff = Math.abs(playerPosition.y - currentRegion.cameraAnchor[1]);

  var targetPosition = [];
  if (xDiff >= yDiff) {
    targetPosition = [
      currentRegion.cameraAnchor[0] + (playerPosition.x - currentRegion.cameraAnchor[0]) * 0.4,
      currentRegion.cameraAnchor[1]
    ];
  } else {
    targetPosition = [
      currentRegion.cameraAnchor[0],
      currentRegion.cameraAnchor[1] + (playerPosition.y - currentRegion.cameraAnchor[1]) * 0.4
    ];
  }

  cameraTransition = {
    start: (new Date()).getTime(),
    from: {
      position: [camera.position[0], camera.position[1]]
    },
    to: {
      position: targetPosition
    }
  };
}

function transitionCameraToPlayer() {
  var playerPositions = getPlayerPositions();

  const playerPosition = {
    x: (playerPositions[0]/(level.height))|0,
    y: (playerPositions[0]%level.height)|0
  };

  cameraTransition = {
    start: (new Date()).getTime(),
    from: {
      position: [camera.position[0], camera.position[1]]
    },
    to: {
      position: [playerPosition.x, playerPosition.y]
    }
  };
}

function initSmoothCamera() {
  var region = getActiveRegion()[0];

  camera = {
    position: [region.cameraAnchor[0], region.cameraAnchor[1]]
  };
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}
