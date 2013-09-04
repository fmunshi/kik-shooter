var gamejs = require('gamejs');

exports.images = {
	player 	: "./img/player.png",
	laser 	: "./img/laser.png",
	meteor 	: "./img/meteor.png",
	E1 		: "./img/E1.png",
	eLaser 	: "./img/eLaser.png"
}
exports.imageArray = [
	"./img/player.png",
	"./img/laser.png",
	"./img/meteor.png",
	"./img/E1.png",
	"./img/eLaser.png"
]

exports.screen = {
	top	 		: 	0,
	right 		: 	window.innerWidth,
	bot	 		: 	window.innerHeight,
	left 		: 	0
}


exports.game = {
	score 		: 0,
	level		: 1
}

exports.lasers = new gamejs.sprite.Group();
exports.enemies = new gamejs.sprite.Group();
exports.projectiles = new gamejs.sprite.Group();
exports.eLasers = new gamejs.sprite.Group();

exports.player;