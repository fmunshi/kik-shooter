var gamejs = require('gamejs');
var $g = require('globals');
var $Player = require('player').Player;
var $Proj = require('projectile').Proj;
var $Enemy = require('enemy').Enemy;

var StartScene = function(director) {
    this.director = director;

    this.draw = function(display, msDuration) {
      display.fill('#545');
      var font = new gamejs.font.Font('20px monospace');
      display.blit(font.render("Touch to start"), [$g.right/2 - 10, $g.bot/2 - 10]);
    };

    this.handle = function(event) {
      if (event.type === "touchstart" || event.type === gamejs.event.MOUSE_DOWN){
          var game = new GameScene(this.director);
          this.director.replaceScene(game);
      }
    };
  };

var GameScene = function(director) {
  this.director = director;

  this.player = $g.player = new $Player([29,64]);

  this.loading = true;

  $g.game.level = 1;
  this.setup(1);

};

GameScene.prototype.setup = function (lvl){
  var that = this;
   for (var i = 0; i <= lvl; i++){
      setTimeout(function(){
        var proj = new $Proj([35,35], $g.images.meteor);
        $g.projectiles.add(proj);  
      }, 1000)
   }

   for (var i = 0; i <= lvl; i++){
      setTimeout(function(){
        var enemy = new $Enemy([40,40], $g.images.E1);
        $g.enemies.add(enemy);
        that.loading = false;
      }, 1000)
   }

}

GameScene.prototype.draw = function(display, msDuration) {
    display.fill('#403040');
    var font = new gamejs.font.Font('20px monospace');
    display.blit(font.render("Score: " + $g.game.score, '#FFF'), [10, 20]);
    display.blit(font.render("Wave: " + $g.game.level, '#FFF'), [10, 50]);
    // console.log(msDuration);


    // this.bg = gamejs.image.load($g.images.bg);
    // display.blit(this.bg, [0,0]);
    // display.blit(this.bg, [0,400]);


    if (this.player.health < 0) {
          var start = new StartScene(this.director);
          this.director.replaceScene(start);
    }

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

    // Update all projectiles (including enemy sers)
    $g.projectiles.update(msDuration);
    $g.projectiles.draw(display);

    if ($g.enemies.length() === 0 && $g.projectiles.length() === 0 && !this.loading) {
      $g.game.level += 1;
      this.loading = true;
      this.setup($g.game.level);
      
    }
};

GameScene.prototype.handle = function(event) {

  if(event.type === "deviceorientation") {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;

    // console.log([absolute, alpha, beta, gamma]);

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