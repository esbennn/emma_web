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
        scrollTop: $(element).offset().top - 70
    },600, 'swing');
}


$( document ).ready(function(){
   // Player vars
    music = document.getElementById('audio_player');
    playbtn = document.getElementById('pbtn');
    
    //Eventlisteners for menu buttons 
    $('#menu_player').on('click', function(){
        
    });
    
//    $('.navbar-nav li a').each(function(i,e){
//		console.log($(this).attr('href'));
//        $(this).on('click', function(){
//            var target = $(this).attr('href');
//            console.log(target);
//            scrollTo(target);
//        });
//    });
	
	 $('.navbar-nav li a').click(function(){
		var target = $(this).attr('href');
		console.log(target); 
		scrollTo(target);
//		 console.log($(this).parent().siblings());	
		$(this).parent().siblings().removeClass("active"); 	
		$(this).parent().addClass("active");
	 });
	
	$('a.navbar-brand').click(function(){
		scrollTo('#landing');
		$('.navbar-nav li').removeClass("active");
		$('.navbar-nav li').first().addClass("active");
		
	});
	 
	
	$(window).on('scroll', function() {
          $('.target').each(function() {
              if($(window).scrollTop() >= $(this).offset().top - 75) {
                  var id = $(this).attr('id');
				  console.log($(window).scrollTop());
				  console.log($(this).offset().top);
				  console.log(id);
                  $('.navbar-nav li').removeClass("active");
                  $('.navbar-nav li a[href="#'+ id +'"]').parent().addClass('active');
              }
          });
      });
	
	$('#buy_form').submit(function(e){
        e.preventDefault();
		console.log('her');
		var datastring = $(this).serializeArray();
		$.ajax({
            url: "api/index.php",
            data: datastring,
            type: "POST",
            dataType: "json",
            timeout: 3000,
            complete: function(obj, status){
                console.log("done " + status);
                console.log(obj);
            },
            success: function(data, status, jqxhr){
				console.log(data);
                if (data.status == "OK" && status == "success"){
//                if (data.status == "OK" && status == "success"){
//                    alert("Mail sendt!!");
					$('#modalSuccess').modal('show');
					$('#buy_form')[0].reset();
                } else {
					$('#modalError').modal('show');
//                    alert("Der skete en fejl")
                } 
            },
            error: function(jqxhr, status, error){
				$('#modalError').modal('show');
//                alert("Der skete en fejl:" + error);
                console.log(jqxhr);
//                console.log(jqxhr);
            },
        });
	});
});