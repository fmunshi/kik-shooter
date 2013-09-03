var gamejs = require("gamejs");
var $g = require("globals");
var $e = require("gamejs/event");
var $m = require("gamejs/utils/math");

Laser = function(pos) {
  // call superconstructor
  var size = [5, 20];
  Laser.superConstructor.apply(this, arguments);
  this.image = gamejs.image.load($g.images.laser);
  this.originalImage = gamejs.transform.scale(this.image, size);
  this.image = gamejs.transform.rotate(this.originalImage, 0);
  
  // [x,y]
  this.pos = pos;

  this.size = size;
  this.velocity = [0,-10];


  // Rect stuff
  this.rect = new gamejs.Rect(size);
  this.rect.width = this.image.rect.width;
  this.rect.height = this.image.rect.height;
  this.rect.center = this.pos;

  return this;
};
gamejs.utils.objects.extend(Laser, gamejs.sprite.Sprite);


Laser.prototype.update = function(msDuration) {
	this.rect.moveIp(this.velocity);
	var pos = this.pos = this.rect.center;

  if ((pos[0] > $g.screen.right + 10) || (pos[0] < $g.screen.left - 10) || (pos[1] < $g.screen.top - 10) || (pos[1] > $g.screen.bot + 10)){
    console.log("Laser out of bounds");
    $g.lasers.remove(this);
  }
};

Laser.prototype.draw = function (display){
  display.blit(this.image, this.rect);
};

exports.Laser = Laser;