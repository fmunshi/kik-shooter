var gamejs = require('gamejs');
var GLOBALS = window.GLOBALS;

  var Proj = function(rect, image, pos) {
    // call superconstructor
    Proj.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load(image);
    this.originalImage = gamejs.transform.scale(this.image, rect);
    this.image = gamejs.transform.rotate(this.originalImage, 0);
    
    // [x,y]
    this.pos = [Math.random()*GLOBALS.screen.right,GLOBALS.screen.top-10];

    this.size = rect;
    this.velocity = [0, Math.random() + 2];


    // Rect stuff
    this.rect = new gamejs.Rect(rect);
    this.rect.width = this.image.rect.width;
    this.rect.height = this.image.rect.height;
    this.rect.center = this.pos;

    return this;
  };
  gamejs.utils.objects.extend(Proj, gamejs.sprite.Sprite);


  Proj.prototype.update = function(msDuration) {
  	var vel = [0, this.velocity[1]*msDuration/30]
  	this.rect.moveIp(vel);
  	this.pos = this.rect.center;
  	this.checkbounds();
  };

  Proj.prototype.draw = function (display){
    display.blit(this.image, this.rect);
  };

  Proj.prototype.checkbounds = function(){
  	var pos = this.pos
  	if (pos[1] > GLOBALS.screen.bot){
  		GLOBALS.projectiles.remove(this);
  	}
  };



  var Star = function(rect, image, pos) {
    // call superconstructor
    Star.superConstructor.apply(this, arguments);
    this.image = gamejs.image.load(image);
    this.originalImage = gamejs.transform.scale(this.image, rect);
    this.image = gamejs.transform.rotate(this.originalImage, 0);

    this.velocity = [0, 2];

    return this;
  };
  gamejs.utils.objects.extend(Star, Proj);

  Star.prototype.checkbounds = function(){
    var pos = this.pos
    if (pos[1] > GLOBALS.screen.bot){
      this.rect.center = this.pos = [Math.random()*GLOBALS.screen.right,GLOBALS.screen.top-10];
    }
  };

exports.Proj = Proj;
exports.Star = Star;