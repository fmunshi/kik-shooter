var gamejs = require("gamejs");
var $g = require("globals");
var $e = require("gamejs/event");

var Proj = function(rect, image, pos) {
  // call superconstructor
  Proj.superConstructor.apply(this, arguments);
  this.image = gamejs.image.load(image);
  this.originalImage = gamejs.transform.scale(this.image, rect);
  this.image = gamejs.transform.rotate(this.originalImage, 0);
  
  // [x,y]
  this.pos = [Math.random()*$g.screen.right,$g.screen.top-10];

  this.size = rect;
  this.velocity = [0,Math.random()*5 + 5];


  // Rect stuff
  this.rect = new gamejs.Rect(rect);
  this.rect.width = this.image.rect.width;
  this.rect.height = this.image.rect.height;
  this.rect.center = this.pos;

  return this;
};
gamejs.utils.objects.extend(Proj, gamejs.sprite.Sprite);


Proj.prototype.update = function(msDuration) {
	this.rect.moveIp(this.velocity);
	this.pos = this.rect.center;
	this.checkbounds();
};

Proj.prototype.draw = function (display){
  display.blit(this.image, this.rect);
};

Proj.prototype.checkbounds = function(){
	var pos = this.pos
	if (pos[1] > $g.screen.bot){
		// bye bye
		this.rect.center = this.pos = [Math.random()*$g.screen.right,$g.screen.top-10];
		// $g.projectiles.remove(this);
	}
};


exports.Proj = Proj; 