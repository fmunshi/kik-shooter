var gamejs = require("gamejs");
var $g = require("globals");
var $e = require("gamejs/event");
var $m = require("gamejs/utils/math");

Player = function(rect) {
  // call superconstructor
  Player.superConstructor.apply(this, arguments);
  this.image = gamejs.image.load($g.images.player);
  this.originalImage = gamejs.transform.scale(this.image, rect);
  this.image = gamejs.transform.rotate(this.originalImage, 0);
  
  // [x,y]
  this.pos = [0,0];
  this.size = rect


  // Rect stuff
  this.rect = new gamejs.Rect(rect);
  this.rect.width = this.image.rect.width;
  this.rect.height = this.image.rect.height;
  this.rect.center = this.pos;

  return this;
};
gamejs.utils.objects.extend(Player, gamejs.sprite.Sprite);


Player.prototype.update = function(msDuration) {
   	this.moveIp(velocity);
};


Player.prototype.handle = function(event){

};


Player.prototype.draw = function (display){
  display.blit(this.image, this.rect);
};

Player.prototype.moveIp = function(velocity){

};

Player.prototype.move = function(){

};

exports = Player;