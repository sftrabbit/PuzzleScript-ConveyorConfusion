var camera = null;
var cameraTransition = null;
var cameraZoomTransition = null;

function transitionCameraToRegion(activeRegion, creditsOffset = false) {
  var targetPosition = clampCameraPosition(activeRegion, [
    activeRegion.cameraAnchor[0],
    creditsOffset ? (activeRegion.cameraAnchor[1] + 0.6) : (activeRegion.cameraAnchor[1] - 0.4)
  ]);

  if (cameraTransition && cameraTransition.to.position[0] === targetPosition[0] && cameraTransition.to.position[1] === targetPosition[1]) {
    return;
  }

  cameraTransition = {
    to: {
      position: targetPosition,
      zoom: (creditsOffset ? (activeRegion.zoom * 0.9) : activeRegion.zoom) || 1
    }
  };

  if (camera != null) {
    cameraTransition.start = (new Date()).getTime()
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
      activeRegion.cameraAnchor[1] - 0.4
    ];
  } else {
    targetPosition = [
      activeRegion.cameraAnchor[0],
      activeRegion.cameraAnchor[1] - 0.4 + (playerPosition.y - activeRegion.cameraAnchor[1] - 0.4) * 0.4
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
    targetPosition = [playerPosition.x, activeRegion.cameraAnchor[1] - 0.4]
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

  if (cameraTransition != null) {
    camera = {
      position: cameraTransition.to.position,
      zoom: cameraTransition.to.zoom
    };
    cameraTransition = null;
  } else {
    camera = {
      position: clampCameraPosition(region, [region.cameraAnchor[0], region.cameraAnchor[1] - 0.4]),
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
        position[1] - 0.4,
        cameraMarginY
      ),
      level.height - cameraMarginY
    )
  ];
}

var creditsState = {
  stage: null,
  ending1Progress: null,
  creditsRegionIndex: null,
  listScrollProgress: null
};

var creditsTimeoutId = null;

function startEnding1 () {
  if (creditsState.stage != null) {
    return;
  }

  playAudioElement('rumble');

  creditsState.stage = 'ending1';
  creditsState.ending1Progress = 0;
}

function startEnding2 () {
  if (creditsState.stage != null) {
    return;
  }

  creditsState.stage = 'ending2';
  setTimeout(function() {
    startCredits()
  }, 2500);
}

function startCredits () {
  creditsState.stage = 'levels';
  creditsState.creditsRegionIndex = 0;
  restoreOriginalLevel();
  removePlayers();

  startMusic();
  showNextCredit();
}

function showNextCredit () {
  while (!regions[curlevel][creditsState.creditsRegionIndex].credit) {
    creditsState.creditsRegionIndex++;

    if (creditsState.creditsRegionIndex >= regions[curlevel].length) {
      creditsState.stage = 'list';
      creditsState.listScrollProgress = 0;
      return;
    }
  }

  transitionCameraToRegion(regions[curlevel][creditsState.creditsRegionIndex], true);

  if (creditsTimeoutId != null) {
    clearTimeout(creditsTimeoutId);
  }

  creditsTimeoutId = setTimeout(function() {
    creditsState.creditsRegionIndex++;
    showNextCredit();
  }, 2700);
}

function stopCredits() {
  creditsState.stage = null;
  creditsState.ending1Progress = null;
  creditsState.creditsRegionIndex = null;
  creditsState.listScrollProgress = null;
}

var listCredits = [
  'Made collaboratively',
  'by members of the',
  'Thinky Puzzle Games',
  'Discord server',
  '',
  '',
  ['Aspeon', 'Auroriax'],
  ['Blookerstein', 'CHz'],
  ['clementsparrow', 'clickmazes'],
  ['Colin', 'Corey Hardt'],
  ['crychair', 'D5R'],
  ['Dan Williams', 'Deusovi'],
  ['domcamus', 'Draknek'],
  ['Ethan Clark', 'Harry Damm'],
  ['Jack Lance', 'jackk'],
  ['Joel', 'Joseph Mansfield'],
  ['JumbleTheCircle', 'Justas'],
  ['KirraLuan', '~kjeann'],
  ['knexator', 'Kristian Hedeholm'],
  ['Le Slo', 'marcosd'],
  ['Menderbug', 'Mischka Kamener'],
  ['Muftwin', 'Norgg'],
  ['Notan', 'pancelor'],
  ['Patrick', 'Pedro PSI'],
  ['Pichusuperlover', 'shark'],
  ['winterbeak', 'stevenjmiller'],
  ['That Scar', 'Zach'],
  ['Toombler', 'twak'],
  ['zaratustra', 'Zomulgustar'],
  '',
  '',
  'Blippy Trance by Kevin MacLeod',
  'Link: https://incompetech.filmmusic.io',
  '       /song/5659-blippy-trance',
  'License: https://filmmusic.io/standard-license'
];
