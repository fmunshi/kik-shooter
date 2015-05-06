var gamejs = require("gamejs");
var $d = require("director");
var $s = require("scenes");

var $g = window.GLOBALS;


$g.resetGame = function (){
	$g.score = 0;
	$g.level = 0;

	$g.lasers = new gamejs.sprite.Group();
	$g.enemies = new gamejs.sprite.Group();
	$g.projectiles = new gamejs.sprite.Group();
	$g.eLasers = new gamejs.sprite.Group();
	$g.stars = new gamejs.sprite.Group();

	$g.continue = false
	$g.gameRunning = false;
}

var main = function(){

		var display = gamejs.display.setMode([window.innerWidth, window.innerHeight]);
		$g.resetGame();

		var director = $g.director = new $d.Director();
		var firstScene = new $s.StartScene(director);
		director.start(firstScene);

		var font = new gamejs.font.Font("20px monospace");

		var lastOrientationEvent, lastRenderedOrientationEvent;

	   	window.addEventListener("deviceorientation", function(event){
		   	if ($g.gameRunning) lastOrientationEvent = event;
	   	}, true);

	   	window.addEventListener("touchstart", function(event){
	   		if ($g.gameRunning) director.handle(event);
	   	}, true);

	   	window.addEventListener("click", function(event){
	   		if ($g.gameRunning) director.handle(event);
	   	}, true);

	   	window.addEventListener("keydown", function(event){
	   		if ($g.gameRunning) director.handle(event);
	   	}, true);

	   	var gameEnd = function(){
	   		director.popAll();
	   		$g.hideAll();
	   		$g.resetGame();
	   		$g.loadHome();
			
			var firstScene = new $s.StartScene(director);
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

	    });
};

gamejs.preload($g.imageArray);
gamejs.ready(main);