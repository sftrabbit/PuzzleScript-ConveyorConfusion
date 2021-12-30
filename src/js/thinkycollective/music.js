var music = null;

function startMusic () {
  if (music == null) {
    music = document.getElementById('music');
  }
  music.loop = true;
  music.currentTime = 0;
  music.volume = 0.7;
  music.play();
}

function setMusicVolume (volume) {
  music.volume = Math.max(0.3 * volume, 0);
}

function playAudioElement(soundName) {
  var sound = document.getElementById(soundName);
  sound.loop = false;
  sound.currentTime = 0;
  sound.volume = 0.7;
  sound.play();
}
