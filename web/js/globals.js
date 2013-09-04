var gamejs = require('gamejs');

exports.images = {
	player 	: "./img/player.png",
	laser 	: "./img/laser.png",
	meteor 	: "./img/meteor.png"
}
exports.imageArray = [
	"./img/player.png",
	"./img/laser.png",
	"./img/meteor.png"
]

exports.screen = {
	top	 		: 	0,
	right 		: 	window.innerWidth,
	bot	 		: 	window.innerHeight,
	left 		: 	0
}

exports.lasers = new gamejs.sprite.Group();
exports.enemies = new gamejs.sprite.Group();
exports.projectiles = new gamejs.sprite.Group();

exports.player;