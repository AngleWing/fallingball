	var toolimgSrc = ['img/bomb.png',
			'img/fire.png',
			'img/shield.png',];
	var toolimgs = [];
	for (var i=0; i<3; i++) {
		var img = new Image();
		img.src = toolimgSrc[i];
		img.onload = function(){
			this.ready = true;
		}
		toolimgs.push(img);
	}

var Ball = (function(){
	//静态常量
	var WIDTH , HEIGHT;

	//constructor
	var init = function(canvas, type){
		//实例常量

		WIDTH = canvas.width;
		HEIGHT = canvas.height;
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.type = type;//小球或道具
		if (this.type == 0) {
			this.radius= Math.floor(Math.random()*30) + 10;//半径
			this.DX = 1.5;//单位X位移
			this.DY = 2;//单位Y位移
			this.x = Math.floor(Math.random()*2)*WIDTH;
			this.y = Math.floor(Math.random()*HEIGHT/2);//当前位置
		}
		else {
			this.DX = 0;//单位X位移
			this.DY = 2;//单位Y位移
			this.x = Math.floor(Math.random()*(WIDTH - 70));
			this.y = 0;
		}
		
		switch (this.type)
		{
			case 0:
				this.color = "#000000";
				break;
			case 1:		//地雷，停止
				this.img = toolimgs[0];
				this.width = 68;
				this.height = 60;
				break;
			case 2:		//火，加速
				this.img = toolimgs[1];
				this.width = 29;
				this.height = 60;
				break;
			case 3:		//无敌状态
				this.img = toolimgs[2];
				this.width = 48;
				this.height = 50;
				break;
			default:
				this.color = "#000000"
		}
	};

	//instance field
	init.prototype = {
		//移动 
		move:function(){
			if (this.type == 0) {
				this.changeDir();
				this.x += this.DX;
				this.y += this.DY;
			}
			else {
				if (this.y + this.DY < HEIGHT-this.height) {
					this.x += this.DX;
					this.y += this.DY;
				}
			}
		},
		//绘制
		// draw:function(){
			// this.ctx.save();
			// this.ctx.clearRect(0,0,WIDTH,HEIGHT);
			// this.ctx.lineWidth = 3;
			// this.ctx.beginPath();
			// this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
			// this.ctx.closePath();
			// this.ctx.stroke();
			// this.ctx.restore();
		// },
		//改变方向
		changeDir:function(){
			this.x + this.DX > WIDTH ? this.left() : 0;
			this.x + this.DX < 0 ? this.right() : 0;
			this.y + this.DY > HEIGHT ? this.up() : 0;
			this.y + this.DY < 0 ? this.down() : 0;
		},
		up:function(){
			//DY为负
			this.DY = this.DY < 0 ? this.DY : -this.DY;
		},
		down:function(){
			//DY为正
			this.DY = this.DY > 0 ? this.DY : -this.DY;
		},
		left:function(){
			//DX为负
			this.DX = this.DX < 0 ? this.DX : -this.DX;
		},
		right:function(){
			//DX为正
			this.DX = this.DX > 0 ? this.DX : -this.DX;
		},
		getData: function(){
			return {
				x: this.x,
				y: this.y,
				radius: this.radius
			};
		},
		getType: function(){
			return this.type;
		},
		toolDraw: function(){
			this.ctx.save();
			this.ctx.drawImage(this.img, this.x, this.y);
			this.ctx.restore();
		}
	};

	return init;
})();
