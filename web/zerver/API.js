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
  exp      		:   Number,
  level   		:   Number,

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

			fireRate    :   100,

			maxHealth   :   1000,
			exp         :   100,
			level       :   1,
			
			highscore	: 	0,
			highlevel	: 	0,

			currentGame : 	0
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
				.sort('highscore')
				.limit(10)
				.exec(callback);
};