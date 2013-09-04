var gamejs = require('gamejs');
var $g = require('globals');
var $Player = require('player').Player;
var $Proj = require('projectile').Proj;
var $Enemy = require('enemy').Enemy;

var StartScene = function(director) {
    this.director = director;

    this.draw = function(display, msDuration) {
      display.fill('#eee');
      var font = new gamejs.font.Font('20px monospace');
      display.blit(font.render("Touch to start"), [0, 0]);
    };

    this.handle = function(event) {
      if (event.type === "touchstart"){
          var game = new GameScene(this.director);
          this.director.replaceScene(game);
      }
    };
  };

var GameScene = function(director) {
  this.director = director;

  this.player = $g.player = new $Player([29,64]);

  this.setup($g.game.level);
};

GameScene.prototype.setup = function (){
   for (var i = 0; i < 5; i++){
      var timeout = setTimeout(function(){
        var proj = new $Proj([35,35], $g.images.meteor);
        $g.projectiles.add(proj);  
        clearTimeout(timeout);
      }, 100)
      
   }


   for (var i = 0; i < 5; i++){
    var timeout = setTimeout(function(){
        var enemy = new $Enemy([40,40], $g.images.E1);
        $g.enemies.add(enemy);
        clearTimeout(timeout);
      }, 1000)
   }
}

GameScene.prototype.draw = function(display, msDuration) {
    display.fill('#504050');
    // console.log(msDuration);

    // Update the player
    this.player.update(msDuration);
    this.player.draw(display);

    // Update the players lasers
    $g.lasers.update(msDuration);
    $g.lasers.draw(display);

    // Update the enemies
    $g.enemies.update(msDuration);
    $g.enemies.draw(display);

    $g.eLasers.update(msDuration);
    $g.eLasers.draw(display);

    // Update all projectiles (including enemy lasers)
    $g.projectiles.update(msDuration);
    $g.projectiles.draw(display);
};

GameScene.prototype.handle = function(event) {

  if(event.type === "deviceorientation") {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;

    console.log([absolute, alpha, beta, gamma]);

    this.player.move(gamma);    
  }

  if (event.type === "touchstart"){
    this.player.shoot();
  }

  if (event.type === gamejs.event.KEY_DOWN){
    if (event.key === 37){
      this.player.move(-5);
    }
    else if (event.key === 39){
      this.player.move(5);
    }
  }
};

exports.StartScene = StartScene;
exports.GameScene = GameScene;