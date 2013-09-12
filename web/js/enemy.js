var GLOBALS = window.GLOBALS;
var gamejs = require('gamejs');

  var Enemy = function(rect, image) {
    // call superconstructor
    Enemy.superConstructor.apply(this, arguments);

    this.image = gamejs.image.load(image);

    // [x,y]
    this.pos = [Math.random()*GLOBALS.screen.right,GLOBALS.screen.top-10];

    this.size = rect;
    this.velocity = [0,Math.random()*2 + 1];

    // Rect stuff
    this.rect = new gamejs.Rect(rect);
    this.rect.width = this.image.rect.width;
    this.rect.height = this.image.rect.height;
    this.rect.center = this.pos;

    this.stats = {
      fireRate  : 3000/GLOBALS.difficulty
    };

    this.fireRate = 1500/GLOBALS.difficulty;

    return this;
  };
  gamejs.utils.objects.extend(Enemy, gamejs.sprite.Sprite);


  Enemy.prototype.update = function(msDuration) {
    var vel = [0, this.velocity[1]*msDuration/30];
    
  	this.rect.moveIp(vel);
  	this.pos = this.rect.center;
    this.checkbounds();
    this.collide();

    this.fireRate -= msDuration;

    if (this.fireRate < 0){
      this.shoot();
    }
  };

  Enemy.prototype.shoot = function() {
    this.fireRate = this.stats['fireRate'];
    var pos = this.pos;
    var velocity = this.velocity;
  	var laser = new eLaser(pos, velocity);
  	GLOBALS.eLasers.add(laser);
  };


  Enemy.prototype.draw = function (display){
    display.blit(this.image, this.rect);
  };


  Enemy.prototype.checkbounds = function(){
    var pos = this.pos
    if (pos[1] > GLOBALS.screen.bot){
      // bye bye
      this.rect.center = this.pos = [pos[0],GLOBALS.screen.top-10];
    }
  };

  Enemy.prototype.collide = function(){
    var collide = gamejs.sprite.spriteCollide(this, GLOBALS.projectiles, true);
    var killed = gamejs.sprite.spriteCollide(this, GLOBALS.lasers, true);
    if (killed.length > 0){
      this.kill();
      GLOBALS.score += 10;
    }
  };

  Enemy.prototype.kill = function(){
    GLOBALS.enemies.remove(this);
  };

  var eLaser = function(pos, vel) {
    // call superconstructor
    var size = [10,10];
    eLaser.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load(GLOBALS.images.eLaser);
    this.originalImage = gamejs.transform.scale(this.image, size);
    this.image = gamejs.transform.rotate(this.originalImage, 0);
    
    // [x,y]
    this.pos = pos

    this.size = size;
    this.velocity = [0, 3 + vel[1]];


    // Rect stuff
    this.rect = new gamejs.Rect(size);
    this.rect.width = this.image.rect.width;
    this.rect.height = this.image.rect.height;
    this.rect.center = this.pos;

    return this;
  };
  gamejs.utils.objects.extend(eLaser, gamejs.sprite.Sprite);


  eLaser.prototype.update = function(msDuration) {
    var vel = [0, this.velocity[1]*msDuration/30];
    this.rect.moveIp(vel);
    this.pos = this.rect.center;
    this.checkbounds();
  };

  eLaser.prototype.draw = function (display){
    display.blit(this.image, this.rect);
  };

  eLaser.prototype.checkbounds = function(){
    var pos = this.pos
    if (pos[1] > GLOBALS.screen.bot){
      // bye bye
      GLOBALS.eLasers.remove(this);
    }
  };

  exports.eLaser = eLaser;
  exports.Enemy  = Enemy;