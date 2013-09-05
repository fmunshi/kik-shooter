var gamejs = require('gamejs');
var $g = require('globals');
var $Player = require('player').Player;
var $Proj = require('projectile').Proj;
var $Star = require('projectile').Star;
var $Enemy = require('enemy').Enemy;

var StartScene = function(director) {
    this.director = director;
    this.image = gamejs.image.load($g.images.bg);

    $g.stars = new gamejs.sprite.Group();

    // var numOfStars = 0;
    // var starId = setInterval(function(){
    //   numOfStars += 1
    //     var star = new $Star([15, 15], $g.images.star);
    //     $g.stars.add(star);  
    //     if (numOfStars > 5) clearInterval(starId);
    // }, 500);

    this.player = $g.player = new $Player([29,64]);

    this.font = new gamejs.font.Font('20px monospace');

    this.draw = function(display, msDuration) {
      display.fill('#101010');

      if ($g.y1 > 1781) $g.y1 = -1782;
      if ($g.y2 > 1781) $g.y2 = -1782;

      $g.y1 += msDuration/30;
      $g.y2 += msDuration/30;

      display.blit(this.image, [0,$g.y1]);
      display.blit(this.image, [0,$g.y2]);

      $g.player.draw(display);
      $g.player.update(msDuration);
      $g.stars.draw(display);
      $g.stars.update(msDuration);

      display.blit(this.font.render("Touch to start", '#FFF0F0'), [$g.screen.right/2-100,$g.screen.bot/2]);
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

  this.loading = true;
  this.image = gamejs.image.load($g.images.bg);

  $g.lasers = new gamejs.sprite.Group();
  $g.enemies = new gamejs.sprite.Group();
  $g.projectiles = new gamejs.sprite.Group();
  $g.eLasers = new gamejs.sprite.Group();

  console.log($g.enemies.length());

  $g.game = {
    score     : 0,
    level     : 1
  }

  this.setup(1);

};

GameScene.prototype.setup = function (lvl){
  var that = this;
  var a = 0;
  var projId = setInterval(function(){
    a += 1
    var proj = new $Proj([60, 50], $g.images.meteor);
    $g.projectiles.add(proj);  
    if (a > lvl) clearInterval(projId);
  }, 1500);

  var b = 0;
  var enemId = setInterval(function(){
      b += 1
      var enemy = new $Enemy([35,35], $g.images["e" + String(b%5 + 1)]);
      $g.enemies.add(enemy);
      if (b > lvl) {
        clearInterval(enemId);
        that.loading = false;
      }
  }, 1500);

}

GameScene.prototype.draw = function(display, msDuration) {
    display.fill('#101010');
    
      if ($g.y1 > 1781) $g.y1 = -1782;
      if ($g.y2 > 1781) $g.y2 = -1782;

      $g.y1 += msDuration/30;
      $g.y2 += msDuration/30;

      display.blit(this.image, [0,$g.y1]);
      display.blit(this.image, [0,$g.y2]);

    var font = new gamejs.font.Font('20px monospace');
    display.blit(font.render("Score: " + $g.game.score, '#FFF'), [10, 20]);
    display.blit(font.render("Wave: " + $g.game.level, '#FFF'), [10, 50]);

    if ($g.player.health < 0) {
          var start = new StartScene(this.director);
          this.director.replaceScene(start);
    }

    // Update the player
    $g.player.update(msDuration);
    $g.player.draw(display);

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


    $g.stars.draw(display);
    $g.stars.update(msDuration);

    if ($g.enemies.length() === 0 && $g.projectiles.length() === 0 && !this.loading) {
      $g.game.level += 1;
      this.loading = true;
      this.setup($g.game.level);
      
    }
};

GameScene.prototype.handle = function(event) {
  $g.player.handle(event);
};

exports.StartScene = StartScene;
exports.GameScene = GameScene;