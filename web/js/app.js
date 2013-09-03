var gamejs = require('gamejs');
var $Player = require('player');

function main() {

   // var display = gamejs.display.setMode(gamejs.display.FULLSCREEN);
   var display = gamejs.display.setMode([window.innerWidth, window.innerHeight]);
   var player = new $Player();

   var font = new gamejs.font.Font('20px monospace');

   gamejs.onEvent(function(event) {
      console.log(event.type);
   });

   gamejs.onTick(function(msDuration) {
		display.clear();
		display.fill('#000000');
		console.log(msDuration);
      	// player.update(msDuration);
      	// player.draw(display);
   });
};

gamejs.preload([

]);

gamejs.ready(main);
