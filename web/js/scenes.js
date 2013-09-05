var gamejs = require('gamejs');
var $g = require('globals');
var $Player = require('player').Player;
var $Proj = require('projectile').Proj;
var $Star = require('projectile').Star;
var $Enemy = require('enemy').Enemy;

var StartScene = function(director) {
    this.director = director;
    this.bg = new Background();

    this.player = $g.player = new $Player([29,64]);
    $g.player.stats = window.user

    this.font = new gamejs.font.Font('20px monospace');

    this.draw = function(display, msDuration) {
      display.fill('#20102F');

      this.bg.update(msDuration);
      this.bg.draw(display);

      $g.player.draw(display);
      $g.player.update(msDuration);

      $g.context.font = '20px monospace';
      $g.context.textAlign = 'center';
      $g.context.fillStyle = '#EEE';
      $g.context.fillText('Touch to Start', $g.canvas.width / 2, $g.canvas.height / 2);

    };

    this.handle = function(event) {
      if (event.type === "touchstart"){
          var pos = [event.targetTouches[0].pageX, event.targetTouches[0].pageY]
          var game = new GameScene(this.director, this.bg);
          this.director.replaceScene(game);
      }
    };
  };

var GameScene = function(director, bg) {
  this.director = director;
  this.loading = true;
  if (bg) this.bg = bg;
  else this.bg = new Background();

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

  var numOfProjs = 0;
  var projId = setInterval(function(){
    numOfProjs += 1
    var proj = new $Proj([60, 50], $g.images.meteor);
    $g.projectiles.add(proj);  
    if (numOfProjs > lvl) clearInterval(projId);
  }, 1500);

  var numOfEnemies = 0;
  var enemId = setInterval(function(){
      numOfEnemies += 1
      var enemy = new $Enemy([35,35], $g.images["e" + String(numOfEnemies%5 + 1)]);
      $g.enemies.add(enemy);
      if (numOfEnemies > lvl) {
        clearInterval(enemId);
        that.loading = false;
      }
  }, 1500);

}

GameScene.prototype.draw = function(display, msDuration) {
    display.fill('#20102F'); 

    if ($g.player.health < 0) {
      var restart = new StartScene(this.director)
      this.director.replaceScene(restart);
    }

    // Update the background 
    this.bg.update(msDuration);
    this.bg.draw(display);

    var font = new gamejs.font.Font('20px monospace');
    display.blit(font.render("Score: " + $g.game.score, '#FFF'), [10, 20]);
    display.blit(font.render("Wave: " + $g.game.level, '#FFF'), [10, 50]);

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

    if ($g.enemies.length() === 0 && $g.projectiles.length() === 0 && !this.loading) {
      $g.game.level += 1;
      this.loading = true;
      this.setup($g.game.level);
      
    }
};

GameScene.prototype.handle = function(event) {
  $g.player.handle(event);
};


var Background = function(){
  var that = this;

  this.image = gamejs.image.load($g.images.bg);
  this.rightImage = gamejs.transform.rotate(this.image, 0);

  try {
    var os = cards.utils.platform.os;

    if ((os.name === 'android' && os.version < 4.3) || (os.name === 'windows') || (os.name === 'ios' && os.version < 5)){
      this.moving = false;  
    } else {
      this.moving = true;
    }
  } catch (err) { 
    console.log(err)
  }

  this.y1 = 0;
  this.y2 = -1782;

  this.stars = new gamejs.sprite.Group();
    var numOfStars = 0;
    var starId = setInterval(function(){
      numOfStars += 1
        var star = new $Star([15, 15], $g.images.star);
        that.stars.add(star);  
        if (numOfStars > 5) clearInterval(starId);
  }, 1500);
  
  this.update = function(msDuration) {
    if (this.moving){
      if (this.y1 > 1781) this.y1 = -1782;
      if (this.y2 > 1781) this.y2 = -1782;

      this.y1 += msDuration/30;
      this.y2 += msDuration/30;

      this.stars.update(msDuration);
    }
  }

  this.draw = function(display) {
    if (this.moving) {
      display.blit(this.image, [0,this.y1]);
      display.blit(this.image, [0,this.y2]);
      display.blit(this.rightImage, [600,this.y2]);
      display.blit(this.rightImage, [600,this.y1]);
      this.stars.draw(display);
    } else {
      display.blit(this.image, [0,0]);
      display.blit(this.rightImage, [600,0]);
    }
  }
}

exports.StartScene = StartScene;
exports.GameScene = GameScene;