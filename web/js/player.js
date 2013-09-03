var gamejs = require("gamejs");
var $g = require("globals");
var $e = require("gamejs/event");
var $m = require("gamejs/utils/math");
var $Laser = require("laser").Laser;

Player = function(rect) {
  // call superconstructor
  Player.superConstructor.apply(this, arguments);
  this.image = gamejs.image.load($g.images.player);
  this.originalImage = gamejs.transform.scale(this.image, rect);
  this.image = gamejs.transform.rotate(this.originalImage, 0);
  
  // [x,y]
  this.pos = [$g.screen.right/2,$g.screen.bot-30];

  this.size = rect;
  this.velocity = [0,0];


  // Rect stuff
  this.rect = new gamejs.Rect(rect);
  this.rect.width = this.image.rect.width;
  this.rect.height = this.image.rect.height;
  this.rect.center = this.pos;

  return this;
};
gamejs.utils.objects.extend(Player, gamejs.sprite.Sprite);


Player.prototype.update = function(msDuration) {
	this.rect.moveIp(this.velocity);
	this.pos = this.rect.center;
};


Player.prototype.handle = function(event){

};

Player.prototype.shoot = function(pos) {
	var laser = new $Laser(pos);
	$g.lasers.add(laser);
}


Player.prototype.draw = function (display){
  display.blit(this.image, this.rect);
};

Player.prototype.move = function(gamma){
	this.velocity = [gamma/2, 0];
};

exports.Player = Player;