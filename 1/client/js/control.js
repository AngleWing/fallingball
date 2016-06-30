$(document).ready(function(){
	var bounceball = new BounceBall($('#game')[0]);
	var pause_state;
	var audio = $("#audio-music")[0];
	$('#start').click(function(){
		bounceball.start();
		$('#show').css('display','none');
		$('#pause').css('display','block');
		$('#time').css('display','block');
		audio.src = "music/caihongdao.mp3";
		if (!music_onoff)
		{
			audio.pause();
		}
		pause_state = false;
	});
	$('#pause').click(function(){
		if (!pause_state){
			$('#pause').css('background', 'url(img/start.png)');
			bounceball.pause();
			pause_state = true;
			if (music_onoff)
			{
				audio.pause();
			}
		}
		else if (pause_state){
			$('#pause').css('background', 'url(img/pause.png)');
			bounceball.resume();
			pause_state = false;
			if (music_onoff)
			{
				audio.play();
			}
		}
	});
	$('#agin').click(function(){
		$('canvas').remove();
		bounceball = null;
		bounceball = new BounceBall($('#game')[0]);
		bounceball.start();
		pause_state = false;
		$('#box').hide();
		$('#pause').show();
		$('.status').show();
		$('#time').show();
	});
	$('#submit').click(function(){
		$('#box').hide();
		$("#box_submit").show();

	});
	$('#exit').click(function(){
		if (music_onoff)
		{
			audio.pause();
		}
		audio.src="music/bg2.mp3";
		if (!music_onoff)
		{
			audio.pause();
		}
		$('canvas').remove();
		bounceball = null;
		bounceball = new BounceBall($('#game')[0]);
		$('#box').hide();
		$('#show').show();
		$('#home').css("display","none");
	});
	$('#ok').click(function(){
	
		//提交分数
		$score=$('#box h4').html();
		$playername=$('#playerName').val();
		$.ajax({
			url:'http://localhost/ball2/core/addscore.php',
			type:'POST',
			data:{player:$playername,score:$score},
			dataType:'html',
			timeout:1000,
			error:function(){
				alert('some error');
			},
			success:function(result){
				if(result=='namenull'){
					alert('名字不能为空！');
				}else if(result=='namedouble'){
					alert('您输入的名字已存在!');
				}else{
					//提交成功后跳转到排名页面
					window.location.href="rank.html";
				}
			}
		});
	});
	
});
