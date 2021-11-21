var camera = null;
var cameraTransition = null;
var cameraZoomTransition = null;

function transitionCameraToRegion(activeRegion) {
  var targetPosition = clampCameraPosition(activeRegion, [
    activeRegion.cameraAnchor[0],
    activeRegion.cameraAnchor[1] - 0.8
  ]);

  if (cameraTransition && cameraTransition.to.position[0] === targetPosition[0] && cameraTransition.to.position[1] === targetPosition[1]) {
    return;
  }

  cameraTransition = {
    start: (new Date()).getTime(),
    to: {
      position: targetPosition,
      zoom: activeRegion.zoom || 1
    }
  };

  if (camera != null) {
    cameraTransition.from = {
      position: [camera.position[0], camera.position[1]],
      zoom: camera.zoom
    };
  }
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
      position: clampCameraPosition(activeRegion, targetPosition),
      zoom: activeRegion.zoom || 1
    }
  };
}

function transitionCameraToPlayer(activeRegion) {
  var zoom = activeRegion != null ? (activeRegion.zoom || 1) : 1;

  cameraTransition = {
    to: {
      position: clampCameraPosition(activeRegion, [playerPosition.x + 0.5, playerPosition.y + 0.5]),
      zoom: zoom
    }
  };
}

function transitionCameraToPlayerAnchored(activeRegion, horizontal) {
  var targetPosition = [];

  if (horizontal) {
    targetPosition = [activeRegion.cameraAnchor[0], playerPosition.y]
  } else {
    targetPosition = [playerPosition.x, activeRegion.cameraAnchor[1] - 0.8]
  }

  cameraTransition = {
    to: {
      position: clampCameraPosition(activeRegion, targetPosition),
      zoom: activeRegion.zoom || 1
    }
  };
}

function initSmoothCamera() {
  var region = getActiveRegion();

  cameraTransition = null;

  if (cameraTransition != null) {
    camera = {
      position: cameraTransition.to.position,
      zoom: cameraTransition.to.zoom
    };
  } else {
    camera = {
      position: clampCameraPosition(region, [region.cameraAnchor[0], region.cameraAnchor[1] - 0.8]),
      zoom: region.zoom || 1
    };
  }
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

function clampCameraPosition(activeRegion, position) {
  var zoom = activeRegion ? activeRegion.zoom : camera.zoom;

  var cameraMarginX = (screenwidth / 2) / zoom;
  var cameraMarginY = (screenheight / 2) / zoom;

  return [
    Math.min(
      Math.max(
        position[0],
        cameraMarginX
      ),
      level.width - cameraMarginX
    ),
    Math.min(
      Math.max(
        position[1] - 0.8,
        cameraMarginY
      ),
      level.height - cameraMarginY
    )
  ];
}
