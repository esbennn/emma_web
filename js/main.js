// variable to store HTML5 audio element
var music;
var playbtn;

function playAudio() {
  if (music.paused) {
    music.play();
//    playbtn.className = "";
//    playbtn.className = "pause";
      $('#pbtn').css('background-image', 'url("graphics/pause_large.png")');
  } else {
    music.pause();
//    playbtn.className = "";
//    playbtn.className = "play";
      $('#pbtn').css('background-image', 'url("graphics/play_large.png")');
  }
}

function resetAudio(){
//    console.log("her");
    music.currentTime = 0;
    if (music.paused) {
        music.play();
        $('#pbtn').css('background-image', 'url("graphics/pause_large.png")');
//        playbtn.className = "";
//        playbtn.className = "pause";
    }
}

function setVolume(volume) {
   music.volume = volume;
}


function scrollTo(element){
    $('html, body').animate({
        scrollTop: $(element).offset().top
    },600, 'swing');
}

$( document ).ready(function(){
   // Player vars
    music = document.getElementById('audio_player');
    playbtn = document.getElementById('pbtn');
    
    //Eventlisteners for menu buttons
    $('#menu_player').on('click', function(){
        
    });
    
    $('#menu div').each(function(i,e){
        $(this).on('click', function(){
            var target = $(this).attr('data-target');
            console.log(target);
            scrollTo(target);
        });
    });
});