	var music_onoff = true;
$(document).ready(function(){
	var audio = $("#audio-music")[0];
	$('#music').click(function(){
		if (music_onoff){
			$('#music').css('background', 'url(img/music-off.png)');
			audio.pause();
			music_onoff = false;
			$('#music').attr('title', '音乐:关');
		}
		else{
			$('#music').css('background', 'url(img/music-on.png)');
			audio.play();
			music_onoff = true;
			$('#music').attr('title', '音乐:开');
		}
	});
});