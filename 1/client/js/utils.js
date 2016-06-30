var Timer = (function(){
	var self;

	var init = function(element){
		self = this;
		self.element = element;
		self.interval;
		self.hour=0;
		self.minute=0;
		self.second=0;
		self.mSecond=1; 
	};
	init.prototype = {
		//var mus=document.getElementById("music");
		start:function(){
			clearInterval(self.interval);self.interval=setInterval(self.tick,1);
		},
		pause:function(){
			clearInterval(self.interval); 
			//mus.pause();
		},
		resume:function(){
			clearInterval(self.interval);self.interval=setInterval(self.tick,1);
		},
		stop:function(){
			clearInterval(self.interval);self.mSecond=1;self.minute=self.hour=self.second=0;
			self.element.value = "00:00:000";
		},
		tick:function(){
			if((self.mSecond%200)==0){self.second+=1;self.mSecond=1;} 
			if(self.second>0 && (self.second%60)==0){self.minute+=1;self.second=0;} 
			if(self.minute>0 && (self.minute%60)==0){self.hour+=1;self.minute=0;} 
			t=self.minute+":"+self.second+":"+self.mSecond; 
			$(self.element).html(t);
			self.mSecond+=1; 
		},
	};

	return init;
})();
