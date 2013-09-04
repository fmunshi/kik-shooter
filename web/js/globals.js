var gamejs = require('gamejs');

exports.images = {
	playerF1: "./img/player/f1.png",
	playerF2: "./img/player/f2.png",
	playerF3: "./img/player/f3.png",
	playerF4: "./img/player/f4.png",

	eF1		: "./img/enemies/e_f1.png",
	eF2		: "./img/enemies/e_f2.png",
	eF3		: "./img/enemies/e_f3.png",
	eF4		: "./img/enemies/e_f4.png",
	eF5		: "./img/enemies/e_f5.png",
	eF6		: "./img/enemies/e_f6.png",

	laser 	: "./img/laser.png",
	meteor 	: "./img/meteor.png",
	E1 		: "./img/E1.png",
	eLaser 	: "./img/eLaser.png"
}
exports.imageArray = [
	"./img/player/f1.png",
	"./img/player/f2.png",
	"./img/player/f3.png",
	"./img/player/f4.png",

	"./img/enemies/e_f1.png",
	"./img/enemies/e_f2.png",
	"./img/enemies/e_f3.png",
	"./img/enemies/e_f4.png",
	"./img/enemies/e_f5.png",
	"./img/enemies/e_f6.png",

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