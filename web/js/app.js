
var gamejs = require('gamejs');
var $g = require('globals');
var $Director = require('director');
var $Scenes = require('scenes');

var main = function(){
		var display = gamejs.display.setMode([window.innerWidth, window.innerHeight]);
		$g.game.diff = window.diff;

		var director = $g.director = new $Director.Director();
		var firstScene = new $Scenes.StartScene(director);
		director.start(firstScene);

		var font = new gamejs.font.Font('20px monospace');

		var lastOrientationEvent, lastRenderedOrientationEvent;

	   	window.addEventListener("deviceorientation", function(event){
		   	if (window.gameRunning) lastOrientationEvent = event;
	   	}, true);

	   	window.addEventListener("touchstart", function(event){
	   		if (window.gameRunning) director.handle(event);
	   	}, true);

	   	var gameEnd = function(){
	   		director.popAll();
	   		$('#loading').show();
			$('#highscores').html('')
			$('#game-page').hide();
			$('#home-page').show();
			$g.game.score = 0;
			$g.game.level = 1;
			window.continue = false;
			var firstScene = new $Scenes.StartScene(director);
			director.start(firstScene);
			window.gameRunning = false;
	   	}
	   	try {
	   		cards.browser.back(gameEnd);
	   		App.back = gameEnd
	   	}
	   	catch(err){
		   	App.back = gameEnd
	   	}

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