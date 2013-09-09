var gamejs = require('gamejs');
var $g = require('globals');
var $Player = require('player');
var $Proj = require('projectile');
var $Enemy = require('enemy');

var GLOBALS = window;

  var StartScene = function(director) {
      this.director = director;
      this.bg = new Background();
      this.canvas = document.getElementById('gjs-canvas');
      this.context = this.canvas.getContext('2d');

      this.player = $g.player = new $Player.Player([29,64]);
      $g.player.stats = GLOBALS.user;
      $g.player.health = $g.player.stats.maxHealth;

      $g.game.score = 0;
      $g.game.level = 1;

      this.draw = function(display, msDuration) {
        display.fill('#20102F');

        this.bg.update(msDuration);
        this.bg.draw(display);

        $g.player.draw(display);
        $g.player.update(msDuration);

        this.context.font = '20px monospace';
        this.context.textAlign = 'center';
        this.context.fillStyle = '#FFF';
        this.context.fillText('Touch to Start', this.canvas.width / 2, this.canvas.height / 2);
      };

      this.handle = function(event) {
        if (event.type === "touchstart"){
            var game = new GameScene(this.director, this.bg);
            this.director.replaceScene(game);
        }
      };
    };

  var EndScene = function(director, bg) {

      this.director = director;
      this.bg = bg;

      this.canvas = document.getElementById('gjs-canvas');
      this.context = this.canvas.getContext('2d');

      this.draw = function(display, msDuration) {
        display.fill('#20102F');

        this.bg.update(msDuration);
        this.bg.draw(display);

        this.context.font = '20px monospace';
        this.context.textAlign = 'center';
        this.context.fillStyle = '#FFF';
        this.context.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2 - 45);
        this.context.fillText('Score: ' + $g.game.score, this.canvas.width / 2, this.canvas.height / 2 - 15);
        this.context.fillText('Level: ' + $g.game.level, this.canvas.width / 2, this.canvas.height / 2 + 15);
        this.context.fillText('Touch to play again', this.canvas.width / 2, this.canvas.height / 2 + 45);

      };

      this.handle = function(event) {
        if (event.type === "touchstart"){
          var that = this;
            API.createLogin($g.player.stats.name, function (user) {
                  console.log(user);
                  GLOBALS.user = user;
                  GLOBALS.continue = false;
                  $g.player = new $Player.Player([29,64]);
                  $g.player.stats = GLOBALS.user;
                  $g.player.health = $g.player.stats.maxHealth;
                  var game = new GameScene(that.director, that.bg);
                  that.director.replaceScene(game);
            });
        }
      };

  }

  var GameScene = function(director, bg) {
    this.director = director;
    this.loading = true;
    if (bg) this.bg = bg;
    else this.bg = new Background();


    this.canvas = document.getElementById('gjs-canvas');
    this.context = this.canvas.getContext('2d');

    $g.lasers = new gamejs.sprite.Group();
    $g.enemies = new gamejs.sprite.Group();
    $g.projectiles = new gamejs.sprite.Group();
    $g.eLasers = new gamejs.sprite.Group();

    console.log($g.enemies.length());

    console.log("CONTINUE? : " + GLOBALS.continue)
    if (GLOBALS.continue) {
      this.setup($g.player.stats.currentGame);
      $g.game = {
        score     : $g.player.stats.currentScore,
        level     : $g.player.stats.currentGame
      }
      $g.player.health = $g.player.currentHealth;
    } else {
      $g.game = {
        score     : 0,
        level     : 1
      }
      this.setup(1);
    } 

  };

  GameScene.prototype.setup = function (lvl){
    var that = this;

    var numOfProjs = 0;
    var projId = setInterval(function(){
      numOfProjs += 1
      var proj = new $Proj.Proj([60, 50], $g.images.meteor);
      $g.projectiles.add(proj);  
      if (numOfProjs > lvl) clearInterval(projId);
    }, 1500);

    var numOfEnemies = 0;
    var enemId = setInterval(function(){
        numOfEnemies += 1
        var enemy = new $Enemy.Enemy([35,35], $g.images["e" + String(numOfEnemies%5 + 1)]);
        $g.enemies.add(enemy);
        if (numOfEnemies > Math.ceil(lvl/2)) {
          clearInterval(enemId);
          that.loading = false;
        }
    }, 1500);

  }

  GameScene.prototype.draw = function(display, msDuration) {
      var that = this;
      display.fill('#20102F');
      if ($g.player.health <= 0) {

        var stats = $g.player.stats;
        if (stats.highlevel < $g.game.level) stats.highlevel = $g.game.level;
        if (stats.highscore < $g.game.score) stats.highscore = $g.game.score;
        stats.currentGame = 1;
        stats.currentScore = 0;

        API.updateUser(stats, function(user){
          var end = new EndScene(that.director, that.bg)
          that.director.replaceScene(end);
        });
      }

      // Update the background 
      this.bg.update(msDuration);
      this.bg.draw(display);

      this.context.font = '20px monospace';
      this.context.textAlign = 'left';
      this.context.fillStyle = '#FFF';
      this.context.fillText('Score: ' + $g.game.score, 10, 20);
      this.context.fillText('Level: ' + $g.game.level, 10, 50);

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

        var stats = $g.player.stats;
        if (stats.highscore < $g.game.score) stats.highscore = $g.game.score;
        if (stats.highlevel < $g.game.level) stats.highlevel = $g.game.level;
        stats.currentGame = $g.game.level;
        stats.currentScore = $g.game.score;
        stats.currentHealth = $g.player.health;

        API.updateUser(stats, function(user){
          console.log(user);
        });

        this.loading = true;
        this.setup($g.game.level);
        
      }
  };

  GameScene.prototype.handle = function(event) {
    if (event.type === "touchstart"){
      var point = [event.changedTouches[0].pageX, event.changedTouches[0].pageY]
      console.log(point)
      if ( point[0] < window.innerWidth && point[0] > (window.innerWidth - 75) ) {
        if ( point[1] < 75 && point[1] > 0 ) {
          this.director.push(new SettingsScene(this.director, this.bg));
        }
      }
    }
    
    $g.player.handle(event);
  };


var SettingsScene = function (director, bg){
  this.director = director;
  this.bg = bg

  this.draw = function (display, msDuration){
      this.bg.update(msDuration);
      this.bg.draw(display); 

      $g.context.font = '30px monospace';
      $g.context.textAlign = 'center';
      $g.context.fillStyle = '#FFF';
      $g.context.fillText('Continue?', $g.canvas.width / 2, $g.canvas.height / 2 - 30);
      $g.context.fillText('Quit?', $g.canvas.width / 2, $g.canvas.height / 2 + 30);
  };

  this.handle = function (event){
    if (event.type === "touchstart"){
      var point = [event.changedTouches[0].pageX, event.changedTouches[0].pageY]
      console.log(point)
      if (point[1] > $g.canvas.height / 2 - 60 && point[1] < $g.canvas.height / 2) {
        this.director.pop();
      } else if (point[1] < $g.canvas.height / 2 + 60 && point[1] > $g.canvas.height / 2){
        
        director.popAll();
        GLOBALS.hideAll();
        GLOBALS.resetGame();

        setTimeout(function(){
          GLOBALS.loadHome();
        },100)
        
      
        var firstScene = new StartScene(this.director);
        this.director.start(firstScene); 
      }
    }
    
  }

}

  var Background = function(){

    this.i = 0;
    while(this.i*254 < window.innerWidth + 100 && this.i*256 < window.innerHeight + 100) this.i++; 

    var that = this;

    this.image = gamejs.image.load($g.images.bg);
    this.settings = gamejs.image.load($g.images.settings);
    this.settings = gamejs.transform.scale(this.settings, [50,50])

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

    this.stars = new gamejs.sprite.Group();
      var numOfStars = 0;
      var starId = setInterval(function(){
        numOfStars += 1
          var star = new $Proj.Star([15, 15], $g.images.star);
          that.stars.add(star);  
          if (numOfStars > 5) clearInterval(starId);
    }, 1500);

    
    this.update = function(msDuration) {
      if (this.moving) this.stars.update(msDuration);
    }

    this.draw = function(display) {

      var a = this.i;
      var b = this.i;

      while (a >= 0){
        while (b >= 0){
          display.blit(this.image, [a*254, b*256]);
          b--;
        }
        b = this.i;
        a--;
      }
      display.blit(this.settings, [window.innerWidth-50, 0])

      var ratio =  $g.player.health / $g.player.stats.maxHealth;
      var color = "#00DD00"
      if (ratio < 0.3) color = "#DD0000"
      else if (ratio < 0.6) color = "DDDD00"

      gamejs.draw.rect(display, color, new gamejs.Rect([$g.screen.left, $g.screen.bot - 10], [$g.player.health / $g.player.stats.maxHealth * window.innerWidth, 20]), 0);

      if (this.moving) this.stars.draw(display);
    }
  }

  exports.StartScene = StartScene;
  exports.GameScene  = GameScene;