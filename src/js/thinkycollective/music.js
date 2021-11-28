var music = null;

function startMusic () {
  if (music == null) {
    music = document.getElementById('music');
  }
  music.loop = true;
  music.currentTime = 0;
  music.volume = 0.2;
  music.play();
}

function setMusicVolume (volume) {
  music.volume = Math.max(0.2 * volume, 0);
}

