var gamejs = require('gamejs');
var $Director = require('director');
var $Scenes = require('scenes');

var GLOBALS = window.GLOBALS;


GLOBALS.resetGame = function (){
	GLOBALS.score = 0;
	GLOBALS.level = 0;

	GLOBALS.lasers = new gamejs.sprite.Group();
	GLOBALS.enemies = new gamejs.sprite.Group();
	GLOBALS.projectiles = new gamejs.sprite.Group();
	GLOBALS.eLasers = new gamejs.sprite.Group();
	GLOBALS.stars = new gamejs.sprite.Group();

	GLOBALS.continue = false
	GLOBALS.gameRunning = false;
}

var main = function(){

		var display = gamejs.display.setMode([window.innerWidth, window.innerHeight]);
		GLOBALS.resetGame();

		var director = GLOBALS.director = new $Director.Director();
		var firstScene = new $Scenes.StartScene(director);
		director.start(firstScene);

		var font = new gamejs.font.Font('20px monospace');

		var lastOrientationEvent, lastRenderedOrientationEvent;

	   	window.addEventListener("deviceorientation", function(event){
		   	if (GLOBALS.gameRunning) lastOrientationEvent = event;
	   	}, true);

	   	window.addEventListener("touchstart", function(event){
	   		if (GLOBALS.gameRunning) director.handle(event);
	   	}, true);

	   	var gameEnd = function(){
	   		director.popAll();
	   		GLOBALS.hideAll();
	   		GLOBALS.resetGame();
	   		GLOBALS.loadHome();
			
			var firstScene = new $Scenes.StartScene(director);
			director.start(firstScene);	
	   	}

	   	try {
	   		cards.browser.back(gameEnd);
	   		App.back = gameEnd;
	   	} catch(err) {
		   	App.back = gameEnd;
	   	}

	   	gamejs.onTick(function(msDuration) {
	        GLOBALS.context.clear();
			if (lastOrientationEvent !== lastRenderedOrientationEvent) {
				lastRenderedOrientationEvent = lastOrientationEvent;
		   		director.handle(lastOrientationEvent);
		   	}
	    	director.draw(display, msDuration);

	    });
};

gamejs.preload(GLOBALS.imageArray);
gamejs.ready(main);