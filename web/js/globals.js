var gamejs = require('gamejs');

exports.images = {
	player 	: "./img/player.svg",
	laser 	: "./img/laser.png"
}

exports.screen = {
	top	 		: 	0,
	right 		: 	window.innerWidth,
	bot	 		: 	window.innerHeight,
	left 		: 	0
}

exports.lasers = new gamejs.sprite.Group();