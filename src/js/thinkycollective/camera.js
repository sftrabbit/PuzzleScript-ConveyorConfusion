var camera = null;
var cameraTransition = null;

function transitionCameraToRegion(activeRegion) {
  if (cameraTransition && cameraTransition.to.position[0] === activeRegion.cameraAnchor[0] && cameraTransition.to.position[1] === activeRegion.cameraAnchor[1]) {
    return;
  }

  cameraTransition = {
    start: (new Date()).getTime(),
    from: {
      position: [camera.position[0], camera.position[1]]
    },
    to: {
      position: [activeRegion.cameraAnchor[0], activeRegion.cameraAnchor[1]]
    }
  };
}

function transitionCameraPulledByPlayer(activeRegion, horizontal) {
  var playerPositions = getPlayerPositions();

  const playerPosition = {
    x: (playerPositions[0]/(level.height))|0,
    y: (playerPositions[0]%level.height)|0
  };

  var targetPosition = [];
  if (horizontal) {
    var regionWidth = activeRegion.bounds.maxX - activeRegion.bounds.minX;
    var direction = Math.sign(playerPosition.x - activeRegion.cameraAnchor[0]);
    var playerOffset = Math.abs((playerPosition.x + 0.5) - activeRegion.cameraAnchor[0]) - (regionWidth / 2);

    targetPosition = [
      activeRegion.cameraAnchor[0] + (playerOffset * direction),
      activeRegion.cameraAnchor[1]
    ];
  } else {
    targetPosition = [
      activeRegion.cameraAnchor[0],
      activeRegion.cameraAnchor[1] + (playerPosition.y - activeRegion.cameraAnchor[1]) * 0.4
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
    // start: (new Date()).getTime(),
    // from: {
    //   position: [camera.position[0], camera.position[1]]
    // },
    to: {
      position: [playerPosition.x, playerPosition.y]
    }
  };
}

function initSmoothCamera() {
  var region = getActiveRegion();

  camera = {
    position: [region.cameraAnchor[0], region.cameraAnchor[1]]
  };
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}
