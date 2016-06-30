	var imgSrc = ['img/character.png',
			'img/run_left.png',
			'img/run_left_2.png',
			'img/run_right.png',
			'img/run_right_2.png',
			'img/character_slowDown.png',
			'img/character-speedUp.png',
			'img/character_superman.png'];
	var imgs = [];
	var imgSrcLen = imgSrc.length;
	for (var i=0; i<imgSrcLen; i++) {
		var img = new Image();
		img.src = imgSrc[i];
		img.onload = function(){
			this.ready = true;
		}
		imgs.push(img);
	}
	
var Person = (function(){
	//静态常量
	var WIDTH , HEIGHT;//canvas长宽

	var canvas , ctx;
	var width = 42 , height = 75;//人物长宽
	
	//constructor
	var init = function(c, type){
		this.direction = 'middle';//运动方向
		this.speed = 3;//单位位移
		this.type = type;	//1为玩家1,2为玩家2
		this.status = [];	//道具状态
		this.isSuper = 0;

		canvas = c;
		ctx = canvas.getContext('2d');
		WIDTH = canvas.width;
		HEIGHT = canvas.height; 
		//当前坐标
		this.sx = 250 + this.type * 100 , this.sy = HEIGHT - height;
		this.ex = this.sx + width , this.ey = HEIGHT;
		this.animation = {
			duration: 11,
			index: 0,
			height: 4,
			width: 4
		};
	};

	init.prototype = {
		draw:function(){
			ctx.save();
			//ctx.clearRect(0,0,WIDTH,HEIGHT);
			var animate = (this.animation.index % this.animation.duration <= this.animation.duration/2);
			switch(this.direction){
				case 'left':
					if (animate) {
						ctx.drawImage(imgs[1], this.sx - 3, this.sy - 2);
					}
					else {
						ctx.drawImage(imgs[2], this.sx - 3, this.sy - 2);
					}
					break;
				case 'right':
					if (animate) {
						ctx.drawImage(imgs[3], this.sx - 3, this.sy - 2);
					}
					else {
						ctx.drawImage(imgs[4], this.sx - 3, this.sy - 2);
					}
					break;
				case 'middle':
				default:
					if (animate) {
						ctx.drawImage(imgs[0], this.sx, this.sy);
					}
					else {
						ctx.drawImage(imgs[0], this.sx, this.sy - this.animation.height,
										width, height + this.animation.height);
					}
					break;
			};
			if (this.isSuper == 0)
			{
				switch (this.status[this.status.length-1])
				{
					case 0:
						break;
					case 1:
						if (animate) {
							ctx.drawImage(imgs[5], this.sx - 33, this.sy - 39);
						}
						else {
							ctx.drawImage(imgs[5], this.sx - 33, this.sy - 39 - this.animation.height, 
											109, 114 + this.animation.height);
						}
						break;
					case 2:
						if (animate) {
							ctx.drawImage(imgs[6], this.sx - 33, this.sy - 39);
						}
						else {
							ctx.drawImage(imgs[6], this.sx - 33, this.sy - 39 - this.animation.height, 
											109, 114 + this.animation.height);
						}
						break;
				}
			}
			else
			{	
				if (animate)
				{
					ctx.drawImage(imgs[7], this.sx - 33, this.sy - 39);
				}
				else {
					ctx.drawImage(imgs[7], this.sx - 33, this.sy - 39 - this.animation.height, 
											109, 114 + this.animation.height);
				}
			}
			this.animation.index++;
			//ctx.stroke();
			ctx.restore();
			this.move();
		},
		move:function(){
			switch(this.direction){
				case 'right':
					if( this.sx+this.speed > WIDTH-width )
						break;
					this.sx += this.speed;
					this.ex += this.speed;
					break;
				case 'left':
					if( this.sx-this.speed < 0 )
						break;
					this.sx -= this.speed;
					this.ex -= this.speed;
					break;
				case 'middle':
					break;
				default:
					break;
			}
		},
		right:function(){
			this.direction = 'right';
		},
		left:function(){
			this.direction = 'left';
		},
		middle:function(){
			this.direction = 'middle';
		},
		//当前人物位置
		getRect:function(){
			return {sx:this.sx,sy:this.sy,ex:this.ex,ey:this.ey};
		},
		setStatus: function(status){
			switch(status){
				case 0:
					// this.status = 0;
					this.speed = 3;
					if (this.status.length == 0) {
						this.status.push(status);
						this.isSuper = 0;
					}
					break;
				case 1:
					break;
				case 2: {
					// this.status = 2;
					this.speed += 5;
					this.status.push(status);
					break;
				}
				case 3: {
					// this.status = 3;
					this.isSuper = 1;
					if (this.speed <= 3) {
						this.speed = 3;
					}
					this.status.push(status);
					break;
				}
			}
		},
	};

	return init;
})();
