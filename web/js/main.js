// variable to store HTML5 audio element
var music;
var playbtn;

function playAudio() {
  if (music.paused) {
    music.play();
    playbtn.className = "";
    playbtn.className = "pause";
  } else {
    music.pause();
    playbtn.className = "";
    playbtn.className = "play";
  }
}

function resetAudio(){
//    console.log("her");
    music.currentTime = 0;
    if (music.paused) {
        music.play();
        playbtn.className = "";
        playbtn.className = "pause";
    }
}

function setVolume(volume) {
   music.volume = volume;
}

$( document ).ready(function(){
   
    music = document.getElementById('audio_player');
    playbtn = document.getElementById('pbtn');
//    console.log(pbtn);
//    console.log(test);
});