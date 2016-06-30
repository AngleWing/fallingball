	var bounceball;
var BounceBall = function () {
	//静态常量
	var WIDTH = 854;//默认宽度
	var HEIGHT = 480-50;//默认高度
	
	var self;//对象本身
	var persons = [];
	var balls = [];
	var removeIndex = [];
	var intervals = [];//所有计时器
	var timeouts = [];
	var element;
	var ctx;

	var init = function(e){
		self = this;
		element = e;
	}
	
	init.prototype = {
		//新建物体
		create:function(){
			canvas = $('<canvas></canvas>').attr({
				width:WIDTH,
				height:HEIGHT
			});
			ctx = canvas[0].getContext('2d');
			persons.push(new Person(canvas[0], 1));
			//persons.push(new Person(canvas[0], 2));
			$(element).append(canvas);

			//球
			for(var i=0;i<10;i++){
				self.timeout = setTimeout(function(){
					balls.push(new Ball(canvas[0], 0));
				}, i*13000);		//小球出现的频率
				timeouts.push(self.timeout);
			};
			
			//道具
				self.createTools(1);
				self.createTools(2);
				self.createTools(3);

			//计时器
			self.timer = new Timer($('#timer')[0]);
			self.timer.start();
		},
		createTools: function(type){
			var time = Math.floor(Math.random()*3)*4300+10000;
			self.timeout = setTimeout(function(){
				balls.push(new Ball(canvas[0], type));
				var ballsLen = balls.length;
				removeIndex.push(ballsLen-1);
				var t = setTimeout(function(){
					if (removeIndex.length > 0 && balls[removeIndex[0]].type == type) {
						balls.splice(removeIndex[0], 1);
						removeIndex.shift();
						var len = removeIndex.length;
						for (var i=0; i<len; i++) {
							removeIndex[i]--;
						}
						self.createTools(type);
					};
				}, 8000);
				timeouts.push(t);
			}, time);
			timeouts.push(self.timeout);
		},
		deleteStatus: function(index){
			var status = persons[index].status[0];
			self.timeout = setTimeout(function(){
				persons[index].status.shift();
				persons[index].setStatus(0);
			}, 10000);
			timeouts.push(self.timeout);
			//alert(status);
			self.createTools(status);
		},
		ballsdraw: function(){
			ctx.save();
			ctx.clearRect(0,0,WIDTH,HEIGHT);
			ctx.lineWidth = 3;
			var len = balls.length;
			for (var i=0; i<len; ++i){
				if (balls[i].type == 0)
				{
					ctx.save();
					ctx.beginPath();
					ctx.strokeStyle = balls[i].color;
					var ballData = balls[i].getData();
					ctx.moveTo(ballData.x+ballData.radius, ballData.y);
					ctx.arc(ballData.x,ballData.y,ballData.radius,0,Math.PI*2,true);	
					ctx.stroke();
					ctx.closePath();
					ctx.restore();
				}
				else
				{
					balls[i].toolDraw();
				}
			}
			ctx.restore();
		},
		start: function(){
			$('#rank').css('display','block');
			$('#music').css('display','block');
			$('#home').css('display','block');
			self.listen();
			self.create();
			//绘制
			self.ballsdraw();
			var len = persons.length;
			for (var i=0; i<len; ++i){
				persons[i].draw();
			}
			self.run();
		},
		run: function(){
			self.interval = setInterval(function(){
				self.collision();
				
				self.ballsdraw();
				balls.forEach(function(ball){
					ball.move();
				});
				var len = persons.length;
				for (var i=0; i<len; ++i){
					persons[i].draw();
				}
			},1);	//小球跑的速度
			intervals.push(self.interval);
		},
		//暂停
		pause:function(){
			intervals.forEach(function(interval){
				clearInterval(interval);
			});
			var len = intervals.length;
			intervals.splice(0, len);
			timeouts.forEach(function(timeout){
				clearTimeout(timeout);
			});
			len = timeouts.length;
			timeouts.splice(0, len);
			self.timer.pause();
		},
		//恢复
		resume:function(){
			var i;
			self.interval = setInterval(function(){
				self.collision();
				balls.forEach(function(ball){
					ball.move();
				});
				self.ballsdraw();
				var len = persons.length;
				for (var i=0; i<len; ++i){
					persons[i].draw();
				}
			}, 1);
			var remainballs = balls.length - removeIndex.length;
			var type = [1, 2, 3];
			var n = removeIndex.length;
			for(i = 0;i < n; i++){
				type[balls[i].type-1] = 0;
				var type = balls[removeIndex[i]].type;
				var t = setTimeout(function(){
					if (balls[removeIndex[0]].type == type) {
						balls.splice(removeIndex[0], 1);
						removeIndex.shift();
						var len = removeIndex.length;
						for (var i=0; i<len; i++) {
							removeIndex[i]--;
						}
						self.createTools(type);
					};
				}, 8000);
				timeouts.push(t);
			};
			for (i = 0; i<3; i++){
				if (type[i] !=0){
					self.createTools(type[i]);
				}
			}
			
			for (i = 0; i<remainballs; i++) {
				self.timeout = setTimeout(function(){
					balls.push(new Ball(canvas[0], 0));
				}, i*13000);
				timeouts.push(self.timeout);
			};
			
			var len = persons.length;
			for(i = 0;i < len; i++){
				var slen = persons[i].status.length;
				for(var j = 0;j < slen; j++){
					if (persons[i].status[j] != 0){
						self.deleteStatus(i);
					}
				}
			};
			self.timer.resume();
			intervals.push(self.interval);
			self.listen();
		},
		//碰撞
		collision:function(){
			for(var i=balls.length-1;i >= 0;i--){
				var len = persons.length;
				for (var j=0; j<len; ++j){
					var range = persons[j].getRect();
					var x = balls[i].x;
					var y = balls[i].y;
					if( x > range.sx && x < range.ex && y > range.sy && y < range.ey ){
						switch (balls[i].type){
							case 0:
							case 1:
								if (persons[j].isSuper != 1) {
									self.stop(j);
								}
								break;
							case 2:
								persons[j].setStatus(2);
								balls.splice(i, 1);
								removeIndex.shift();
								var len = removeIndex.length;
								for (var i=0; i<len; i++) {
									removeIndex[i]--;
								}
								self.deleteStatus(j);
								break;
							case 3:
								persons[j].setStatus(3);
								balls.splice(i, 1);
								removeIndex.shift();
								var len = removeIndex.length;
								for (var i=0; i<len; i++) {
									removeIndex[i]--;
								}
								self.deleteStatus(j);
								break;
						}
					}
				}
			};
		},
		// 键盘事件绑定
		listen: function () {
			$(document).bind('keydown',function(e){
				switch(e.keyCode){
					case 37:
						persons[0].left();
						break;
					case 39:
						persons[0].right();
						break;
					default:
						persons[0].middle();
						//persons[1].middle();
						break;
				};
				//person.draw();
			});
			$(document).bind('keyup',function(e){
				switch(e.keyCode){
					case 37:
					case 39:
						persons[0].middle();
						break;
				};
			});
			
			$('#blockA').bind("mouseover",function(){
				persons[0].left();
			});
			$("#blockB").bind("mouseover",function(){
				persons[0].right();
			});
			$("#blockA").bind("mouseleave",function(){
				persons[0].middle();
			});
			$("#blockB").bind("mouseleave",function(){
				persons[0].middle();
			});
			
			/*
			$('#blockA').bind(" ",function(){
				persons[0].left();
			});
			$("#blockA").bind("mouseup",function(){
				persons[0].middle();
			});
			$("#blockB").bind("mousedown",function(){
				persons[0].right();
			});
			$("#blockB").bind("mouseup",function(){
				persons[0].middle();
			});
			*/
			
		},
		//清除计时器和物体
		clear: function(){
			intervals.forEach(function(interval){
				clearInterval(interval);
			});
			timeouts.forEach(function(timeout){
				clearTimeout(timeout);
			});
		//	clearTimeout(self.timeout);
			self.timer.stop();
			var n = balls.length;
			balls.splice(0, n);
			n = intervals.length;
			intervals.splice(0, n);
			n = timeouts.length;
			timeouts.splice(0, n);
			n = persons.length;
			persons.splice(0, n);
			n = removeIndex.length;
			removeIndex.splice(0, n);
			element = null;
		},
		//停止游戏
		stop: function (player) {
			$(document).unbind();
			$('#blockA').unbind();
			$('#blockB').unbind();
			$('#box h2 span').html("Player1");
			$('h4').html($('#timer').html());
			$('#box').show();
			$('#pause').hide();
			$('#time').hide();
			self.clear();
			//$('footer').hide(); 
		}
	};
	return init;
}();
