define(['zepto', 'underscore', 'gamejs', 'game/globals', 'game/director', 'game/scenes'], 
		function($, _, gamejs, $g, $Director, $Scenes) {
			return function() {

			var display = gamejs.display.setMode([window.innerWidth, window.innerHeight]);
			$g.game.diff = window.diff;

			var director = $g.director = new $Director.Director();

			var firstScene = new $Scenes.StartScene(director);
			director.start(firstScene);

			var font = new gamejs.font.Font('20px monospace');

			var lastOrientationEvent, lastRenderedOrientationEvent;

		   	window.addEventListener("deviceorientation", function(event){
			   	lastOrientationEvent = event;
		   	}, true);

		   	window.addEventListener("touchstart", function(event){
		   		director.handle(event);
		   	}, true);

		   	var gameEnd = function(){
		   		director.popAll();
				$('#game-page').hide();
				$('#home-page').show();
				$g.game.score = 0;
				$g.game.level = 1;
				window.continue = false;
		   	}
		   	try {
		   		cards.browser.back(gameEnd);
		   	}
		   	catch(err){
			   		App.back = gameEnd
		   	}

	        var tick = function(msDuration) {
	            display.clear();
				if (lastOrientationEvent !== lastRenderedOrientationEvent) {
					lastRenderedOrientationEvent = lastOrientationEvent;
			   		director.handle(lastOrientationEvent);
			   	}
		    	director.draw(display, msDuration);

	        };

	        gamejs.time.fpsCallback(tick, this, 32);
		};
});

