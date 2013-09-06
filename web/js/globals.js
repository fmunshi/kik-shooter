var gamejs = require('gamejs');

exports.images = {
	playerF1: "./img/player/f1.png",
	playerF2: "./img/player/f2.png",
	playerF3: "./img/player/f3.png",
	playerF4: "./img/player/f4.png",

	e1		: "./img/enemies/e1.png",
	e2		: "./img/enemies/e2.png",
	e3		: "./img/enemies/e3.png",
	e4		: "./img/enemies/e4.png",
	e5		: "./img/enemies/e5.png",

	bg 		: "./img/starBackground.png",

	laser 	: "./img/laser.png",
	meteor 	: "./img/meteor.png",
	eLaser 	: "./img/eLaser.png",

	star 	: "./img/star.png"
}

exports.imageArray = [
	"./img/player/f1.png",
	"./img/player/f2.png",
	"./img/player/f3.png",
	"./img/player/f4.png",

	"./img/enemies/e1.png",
	"./img/enemies/e2.png",
	"./img/enemies/e3.png",
	"./img/enemies/e4.png",
	"./img/enemies/e5.png",

	"./img/starBackground.png",

	"./img/laser.png",
	"./img/meteor.png",
	"./img/eLaser.png",

	"./img/star.png"

]

exports.screen = {
	top	 		: 	0,
	right 		: 	window.innerWidth,
	bot	 		: 	window.innerHeight,
	left 		: 	0
}


exports.game = {
	score 		: 0,
	level		: 1,
	diff	 	: window.diff
}

exports.lasers = new gamejs.sprite.Group();
exports.enemies = new gamejs.sprite.Group();
exports.projectiles = new gamejs.sprite.Group();
exports.eLasers = new gamejs.sprite.Group();
exports.stars = new gamejs.sprite.Group();

exports.player;

exports.y1 = 0;
exports.y2 = -1782;


var canvas = exports.canvas = document.getElementById('gjs-canvas');
var context = exports.context = canvas.getContext('2d');