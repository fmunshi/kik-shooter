var mongoose = require('mongoose');
 
var uristring = 
	process.env.MONGOLAB_URI || 
	process.env.MONGOHQ_URL || 
	'mongodb://localhost/kik-shooter';

mongoose.connect(uristring, function (err, res) {
  if (err) { 
  	console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  	console.log ('Succeeded connected to: ' + uristring);
  }
});



var UserSchema = new mongoose.Schema({
  name        :   {
    type      : String, 
    required  : true, 
    unique    : true
  },

  fireRate   	:   Number,

  maxHealth  	:   Number,

  highscore		:   Number,
  highlevel   	: 	Number,

  currentGame 	: 	Number
});

var User = mongoose.model('User', UserSchema);
// user = User.find();
// user.remove();


exports.createLogin = function (username, callback) {
	console.log(username);
	var user = User.findOne({ name: username }, function(err, u){
      if (err) console.log(err);
      else if (u === null) {
      	var newUser = new User({
    			name        :   username,

    			fireRate    :   750,

    			maxHealth   :   50,
    			
    			highscore	  : 	0,
    			highlevel	  : 	1,

    			currentGame : 	1
        });

        newUser.save(function(err){
          if(err) throw err;
          else {
            console.log(newUser);
            callback(newUser);    
          }
        });
      } else {
        console.log(u);
        callback(u);
      }
  });

}

exports.login = function (username, callback) {
	console.log(username);
	var user = User.findOne({ name: username }, function(err, u){
      if (err) console.log(err);
      else if (u === null) {
      	callback('User Does not exist');
      } else {
        console.log(u);
        callback(u);
      }
  });
};


exports.getHigh = function (callback) {
	var users = User
				.find({})
				.sort('-highscore')
				.limit(10)
				.exec(callback);
};

exports.updateUser = function(user, callback) {
  User.findOne({ name: user.name }, function(err, u){

    u.fireRate    = user.fireRate;
    u.maxHealth   = user.maxHealth;
    u.highscore   = user.highscore;
    u.highlevel   = user.highlevel;
    u.currentGame = user.currentGame;
    u.save();

    callback(u);
  });
}