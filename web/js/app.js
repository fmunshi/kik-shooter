var gamejs = require('gamejs');
var $g = require('globals');
var $Proj = require('projectile').Proj;
var $Director = require('director').Director;
var $StartScene = require('scenes').StartScene;
var $GameScene = require('scenes').GameScene;

var main = window.main = function() {

	var display = gamejs.display.setMode([window.innerWidth, window.innerHeight]);
	$g.game.diff = window.diff;

	var director = new $Director();

	var firstScene = new $StartScene(director);
	director.start(firstScene);

	var font = new gamejs.font.Font('20px monospace');

	var lastOrientationEvent, lastRenderedOrientationEvent;

   	window.addEventListener("deviceorientation", function(event){
	   	lastOrientationEvent = event;
   	}, true);

   	$g.canvas.addEventListener("touchstart", function(event){
   		director.handle(event);
   	}, false);

   	gamejs.onEvent(function(event) {
   		director.handle(event);
   	});

	gamejs.onTick(function(msDuration) {
		display.clear();
		if (lastOrientationEvent !== lastRenderedOrientationEvent) {
			lastRenderedOrientationEvent = lastOrientationEvent;
	   		director.handle(lastOrientationEvent);
	   	}
    	director.draw(display, msDuration);
	});
	
};
gamejs.preload($g.imageArray);
gamejs.ready(main);

