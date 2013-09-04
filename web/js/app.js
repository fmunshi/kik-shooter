var gamejs = require('gamejs');
var $g = require('globals');
var $Proj = require('projectile').Proj;
var $Director = require('director').Director;
var $StartScene = require('scenes').StartScene;
var $GameScene = require('scenes').GameScene;

function main() {

	   var display = gamejs.display.setMode([window.innerWidth, window.innerHeight]);

	   var director = new $Director();

	   var firstScene = new $StartScene(director);
	   director.start(firstScene);

	   var font = new gamejs.font.Font('20px monospace');

	   window.addEventListener("deviceorientation", function(event){
	   		event.type = "tilt";
	   		director.handle(event);
	   }, true);

	   window.addEventListener("touchstart", function(event){
	   		event.type = "touch";
	   		director.handle(event);
	   }, false);

	   gamejs.onEvent(function(event) {
	   		director.handle(event);
	   });

   		gamejs.onTick(function(msDuration) {
			display.clear();
	      	director.draw(display, msDuration);
   		});
	
};
gamejs.preload($g.imageArray);
gamejs.ready(main);
