var gamejs = require('gamejs');
var $Player = require('player');
var $Proj = require('projectile');
var $Enemy = require('enemy');

var GLOBALS = window.GLOBALS;
var canvas  = document.getElementById('gjs-canvas');
var context = canvas.getContext('2d');


  var StartScene = function(director) {
      this.director = director;
      this.bg = new Background();

      this.player = GLOBALS.player = new $Player.Player([29,64]);

      GLOBALS.score = 0;
      GLOBALS.level = 1;

      this.draw = function(display, msDuration) {
        context.fillStyle = '#20102F';
        context.fillRect(0, 0, window.innerWidth,  window.innerHeight);

        this.bg.update(msDuration);
        this.bg.draw(display);

        GLOBALS.player.draw(display);
        GLOBALS.player.update(msDuration);

        context.font = '20px Open Sans';
        context.textAlign = 'center';
        context.fillStyle = '#FFF';
        context.fillText('Touch to Start', canvas.width / 2, canvas.height / 2);
      };

      this.handle = function(event) {
        if (event.type === "touchstart"){
            var game = new GameScene(this.director, this.bg);
            this.director.replaceScene(game);
            GLOBALS.player.stats = GLOBALS.user;
            console.log(GLOBALS.continue);
            if (GLOBALS.continue) GLOBALS.player.health = GLOBALS.user.currentHealth;
            else GLOBALS.player.health = GLOBALS.player.stats.maxHealth;
        }
      };
    };

  var EndScene = function(director, bg) {

      this.director = director;
      this.bg = bg;


      this.draw = function(display, msDuration) {
        display.fill('#20102F');

        this.bg.update(msDuration);
        this.bg.draw(display);

        context.font = '20px Open Sans';
        context.textAlign = 'center';
        context.fillStyle = '#FFF';
        context.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 45);
        context.fillText('Score: ' + GLOBALS.score, canvas.width / 2, canvas.height / 2 - 15);
        context.fillText('Level: ' + GLOBALS.level, canvas.width / 2, canvas.height / 2 + 15);
        context.fillText('Touch to play again', canvas.width / 2, canvas.height / 2 + 45);

      };

      this.handle = function(event) {
        if (event.type === "touchstart"){
          var that = this;
            API.createLogin(GLOBALS.player.stats.name, function (user) {
                  console.log(user);
                  GLOBALS.user = user;
                  GLOBALS.continue = false;
                  GLOBALS.player = new $Player.Player([29,64]);
                  GLOBALS.player.stats = GLOBALS.user;
                  GLOBALS.player.health = GLOBALS.player.stats.maxHealth;
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

    GLOBALS.lasers = new gamejs.sprite.Group();
    GLOBALS.enemies = new gamejs.sprite.Group();
    GLOBALS.projectiles = new gamejs.sprite.Group();
    GLOBALS.eLasers = new gamejs.sprite.Group();

    console.log(GLOBALS.enemies.length());

    console.log("CONTINUE? : " + GLOBALS.continue)
    if (GLOBALS.continue) {
      this.setup(GLOBALS.player.stats.currentGame);
      GLOBALS.game = {
        score     : GLOBALS.player.stats.currentScore,
        level     : GLOBALS.player.stats.currentGame
      }
      GLOBALS.player.health = GLOBALS.player.currentHealth;
    } else {
      GLOBALS.game = {
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
      var proj = new $Proj.Proj([60, 50], GLOBALS.images.meteor);
      GLOBALS.projectiles.add(proj);  
      if (numOfProjs > lvl) clearInterval(projId);
    }, 1500);

    var numOfEnemies = 0;
    var enemId = setInterval(function(){
        numOfEnemies += 1
        var enemy = new $Enemy.Enemy([35,35], GLOBALS.images["e" + String(numOfEnemies%5 + 1)]);
        GLOBALS.enemies.add(enemy);
        if (numOfEnemies > Math.ceil(lvl/2)) {
          clearInterval(enemId);
          that.loading = false;
        }
    }, 1500);

  }

  GameScene.prototype.draw = function(display, msDuration) {
      var that = this;
      display.fill('#20102F');
      if (GLOBALS.player.health <= 0) {

        var stats = GLOBALS.player.stats;
        if (stats.highlevel < GLOBALS.level) stats.highlevel = GLOBALS.level;
        if (stats.highscore < GLOBALS.score) stats.highscore = GLOBALS.score;
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

      context.font = '20px Open Sans';
      context.textAlign = 'left';
      context.fillStyle = '#FFF';
      context.fillText('Score: ' + GLOBALS.score, 10, 20);
      context.fillText('Level: ' + GLOBALS.level, 10, 50);

      // Update the player
      GLOBALS.player.update(msDuration);
      GLOBALS.player.draw(display);

      // Update the players lasers
      GLOBALS.lasers.update(msDuration);
      GLOBALS.lasers.draw(display);

      // Update the enemies
      GLOBALS.enemies.update(msDuration);
      GLOBALS.enemies.draw(display);

      GLOBALS.eLasers.update(msDuration);
      GLOBALS.eLasers.draw(display);

      // Update all projectiles (including enemy sers)
      GLOBALS.projectiles.update(msDuration);
      GLOBALS.projectiles.draw(display);

      if (GLOBALS.enemies.length() === 0 && GLOBALS.projectiles.length() === 0 && !this.loading) {
        GLOBALS.level += 1;

        var stats = GLOBALS.player.stats;
        if (stats.highscore < GLOBALS.score) stats.highscore = GLOBALS.score;
        if (stats.highlevel < GLOBALS.level) stats.highlevel = GLOBALS.level;
        stats.currentGame = GLOBALS.level;
        stats.currentScore = GLOBALS.score;
        stats.currentHealth = GLOBALS.player.health;

        API.updateUser(stats, function(user){
          console.log(user);
        });

        this.loading = true;
        this.setup(GLOBALS.level);
        
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
    
    GLOBALS.player.handle(event);
  };


var SettingsScene = function (director, bg){
  this.director = director;
  this.bg = bg

  this.draw = function (display, msDuration){
      this.bg.update(msDuration);
      this.bg.draw(display); 

      context.font = '20px Open Sans';
      context.textAlign = 'center';
      context.fillStyle = '#FFF';
      context.fillText('Continue?', GLOBALS.canvas.width / 2, GLOBALS.canvas.height / 2 - 20);
      context.fillText('Quit?', GLOBALS.canvas.width / 2, GLOBALS.canvas.height / 2 + 20);
  };

  this.handle = function (event){
    if (event.type === "touchstart"){
      var point = [event.changedTouches[0].pageX, event.changedTouches[0].pageY]
      console.log(point)
      if (point[1] > GLOBALS.canvas.height / 2 - 60 && point[1] < GLOBALS.canvas.height / 2) {
        this.director.pop();
      } else if (point[1] < GLOBALS.canvas.height / 2 + 60 && point[1] > GLOBALS.canvas.height / 2){
        
        director.popAll();
        GLOBALS.hideAll();
        GLOBALS.resetGame();

        setTimeout(function(){
          GLOBALS.loadHome();
        },500)
        
      
        var firstScene = new StartScene(this.director);
        this.director.start(firstScene); 
      }
    }
    
  }

}

  var Background = function() {


    var that = this;

    var img = this.image = new Image();
        img.src = GLOBALS.images.bg
        
    this.settings = gamejs.image.load(GLOBALS.images.settings);
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
          var star = new $Proj.Star([15, 15], GLOBALS.images.star);
          that.stars.add(star);  
          if (numOfStars > 5) clearInterval(starId);
    }, 1500);

    
    this.update = function(msDuration) {
      if (this.moving) this.stars.update(msDuration);
    }

    this.draw = function(display) {

      context.fillStyle = context.createPattern(img, 'repeat');
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);


      display.blit(this.settings, [window.innerWidth-50, 0])

      var ratio =  GLOBALS.player.health / GLOBALS.player.stats.maxHealth;
      var color = "#00DD00"
      if (ratio < 0.3) color = "#DD0000"
      else if (ratio < 0.6) color = "DDDD00"

      gamejs.draw.rect(display, color, new gamejs.Rect([GLOBALS.screen.left, GLOBALS.screen.bot - 10], [GLOBALS.player.health / GLOBALS.player.stats.maxHealth * window.innerWidth, 20]), 0);

      if (this.moving) this.stars.draw(display);
    }
  }

  exports.StartScene = StartScene;
  exports.GameScene  = GameScene;