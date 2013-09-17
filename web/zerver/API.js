  var mongoose = require('mongoose');
   
  var uristring = process.env.MONGOLAB_URI ||  process.env.MONGOHQ_URL ||  'mongodb://localhost/kik-shooter';

  mongoose.connect(uristring, function (err, res) {
    if (err) { 
    	console.log ('Error connecting to: ' + uristring + '. ' + err);
    } else {
    	console.log ('Successfully connected to: ' + uristring);
    }
  });


  var UserSchema = new mongoose.Schema({
    name  :   {
        type      : String, 
        required  : true, 
        unique    : true
    },

    fireRate   	  :   Number,

    maxHealth  	  :   Number,

    highscore		  :   Number,
    highlevel     : 	Number,

    currentGame 	: 	Number,
    currentScore  :   Number,

    currentHealth :   Number

  });

  var User = mongoose.model('User', UserSchema);
  // user = User.find();
  // user.remove();

    exports.createLogin = function (username, callback) {

      var user = User.findOne({ name: username }, function(err, u){
          if (err) console.log(err);
          else if (u === null) {
            if (username === null) {
              callback(null);
              return;
            }
            var newUser = new User({
              name          :   username,

              fireRate      :   750,

              maxHealth     :   50,
              
              highscore     :   0,
              highlevel     :   1,

              currentGame   :   1,
              currentScore  :   0,
              currentHealth :   100
            });

            newUser.save(function(err){
              if(err) throw err;
              else {
                callback(newUser);    
              }
            });
          } else {
            callback(u);
          }
      });

    }

  exports.getHigh = function (callback) {
      User
        .find({})
        .sort('-highscore')
        .limit(10)
        .exec(callback);
    }

  exports.updateUser = function(user, callback) {
      User.findOne({ name: user.name }, function(err, u){
        for (prop in user){
          if (prop !== '_id') u[prop] = user[prop];
        }
        if (u.name === 'anonymous'){
          u.currentGame = 1;
          u.currentScore = 0;
          u.currentHealth = 100;
        }
        u.save();

        callback(u);
      });
    }