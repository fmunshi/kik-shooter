var Director = function() {
  this.onAir = false;
  this.activeScene = null;
  this.sceneStack = [];

  return this;
};

Director.prototype.update = function(msDuration) {
  if (!this.onAir) return;

  if (this.activeScene.update) {
    this.activeScene.update(msDuration);
  }
};

Director.prototype.draw = function(display) {
  if (!this.onAir) return;
  if (this.activeScene.draw) {
    this.activeScene.draw(display);
  }
};

Director.prototype.handle = function(event) {
  if (!this.onAir) return;
  if (this.activeScene.handle) {
    this.activeScene.handle(event);
  } else {
    console.warn("Director handle, no map handle");
  }
};

Director.prototype.start = function(scene) {
  this.onAir = true;
  this.replaceScene(scene);
  return;
};

Director.prototype.replaceScene = function(scene) {
  this.activeScene = scene;
  this.sceneStack.pop();
  this.sceneStack.push(scene);
};

Director.prototype.push = function(scene) {
  this.sceneStack.push(scene);
  this.activeScene = scene;
};

Director.prototype.pop = function() {
  this.sceneStack.pop();
  if (this.sceneStack.length >= 1) {
    this.activeScene = this.sceneStack[this.sceneStack.length - 1];
  } else {
    this.activeScene = null;
    console.warn("Warn: No scenes left in stack");
    this.onAir = false;
  }
};

Director.prototype.popAll = function () {
  this.sceneStack = [];
  this.activeScene = null;
  this.onAir = false;
};

Director.prototype.getScene = function() {
  return this.activeScene;
};

exports.Director = Director;