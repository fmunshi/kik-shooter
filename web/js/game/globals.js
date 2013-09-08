define(['gamejs'], function(gamejs) {
	var images = {
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

	var imageArray = [
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

	var screen = {
		top	 		: 	0,
		right 		: 	window.innerWidth,
		bot	 		: 	window.innerHeight,
		left 		: 	0
	}


	var game = {
		score 		: 0,
		level		: 1,
		diff	 	: window.diff
	}

	var lasers = new gamejs.sprite.Group();
	var enemies = new gamejs.sprite.Group();
	var projectiles = new gamejs.sprite.Group();
	var eLasers = new gamejs.sprite.Group();
	var stars = new gamejs.sprite.Group();

	var player;
	var director;

	var canvas = document.getElementById('gjs-canvas');
	var context = canvas.getContext('2d');

	return {
		images 		: images,
		imageArray 	: imageArray,
		screen 		: screen,
		game 		: game,
		lasers 		: lasers,
		enemies 	: enemies,
		projectiles : projectiles,
		eLasers 	: eLasers,
		stars 		: stars,
		player 		: player,
		canvas 		: canvas,
		context 	: context,
		director 	: director
	}
});