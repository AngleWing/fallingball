$(document).ready(function(){
		//$("#button").click(function(){
			show();	
		//});
	});	
	
 var show=function(){
		$.getJSON("http://localhost/ball2/core/searchscore.php",function(data){
				var i=$("#topscore").html(data[length].score);
				$("#rankul").empty();
				$count=0;
				//<li><span>1.</span><span class='left'>name</span><span class='right'>1298</span></li>
				$.each(data,function(entryIndex,entry){
					$count++;
					var html = '<li><span class="num">'+$count+'.</span>';
					html += '<span class="left">' + entry['player'] + '</span>';
					html += '<span class="right">' + entry['score'] + '</span>';
					html += '</li>';	
					$('#rankul').append(html);
				});				
			});		
	}