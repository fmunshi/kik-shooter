var gamejs = require('gamejs');
var $Player = require('player').Player;
var $g = require('globals');
var $e = require('gamejs/event');

function main() {

	   var display = gamejs.display.setMode([window.innerWidth, window.innerHeight]);
	   var player = new $Player([50,50]);

	   var font = new gamejs.font.Font('20px monospace');

	   window.addEventListener("deviceorientation", function(event){
			var absolute = event.absolute;
			var alpha    = event.alpha;
			var beta     = event.beta;
			var gamma    = event.gamma;

			console.log([absolute, alpha, beta, gamma]);

			player.move(gamma);

	   }, true);

	   gamejs.onEvent(function(event) {
	      if (event.type === $e.MOUSE_DOWN) {
	      	player.shoot(player.pos);
	      }
	   });

   		gamejs.onTick(function(msDuration) {
			display.clear();
			display.fill('#304050');
	      	player.update(msDuration);
	      	player.draw(display);
	      	$g.lasers.update(msDuration);
	      	$g.lasers.draw(display);
   		});
	
};
for (img in $g.images){
	gamejs.preload([$g.images[img]]);
}
gamejs.ready(main);
