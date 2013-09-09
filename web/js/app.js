
var gamejs = require('gamejs');
var $g = require('globals');
var $Director = require('director');
var $Scenes = require('scenes');

var GLOBALS = window;

var main = function(){

		// var img = document.createElement('img');
		// $('#game-page').append(img);
		// $('#gjs-canvas').hide();

		var display = gamejs.display.setMode([window.innerWidth, window.innerHeight]);
		$g.game.diff = GLOBALS.diff;

		var director = $g.director = new $Director.Director();
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
	        $g.context.clear();
			if (lastOrientationEvent !== lastRenderedOrientationEvent) {
				lastRenderedOrientationEvent = lastOrientationEvent;
		   		director.handle(lastOrientationEvent);
		   	}
	    	director.draw(display, msDuration);
			// img.src = $g.canvas.toDataURL('img/png');
			// img.width = window.innerWidth;
			// img.height = window.innerHeight;
	    });
};

gamejs.preload($g.imageArray);
gamejs.ready(main);