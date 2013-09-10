(function (App) {

	var GLOBALS = window;

	GLOBALS.hideAll = function (){
		$('#home-page').hide();
		$('#game-page').hide();
		$('#high-page').hide();
		$('#highscores').html('')
		GLOBALS.gameRunning = false;
	}

	GLOBALS.loadGame = function(){
		hideAll();
		$('#game-page').show();
		GLOBALS.gameRunning = true;
	}

	GLOBALS.loadHome = function() {
		hideAll();
		$('#home-page').show();
		GLOBALS.gameRunning = false;
	}

	try {
		cards.browser.back(loadHome);
		cards.browser.setOrientationLock('portrait');
		App.back = loadHome
	} catch(err) {
		App.back = loadHome
	}

	// Set a default user
	GLOBALS.user = {
	    name        	:   "anonymous",

	    fireRate    	:   750,

	    maxHealth   	:   50,

	    highscore   	:   0,
	    highlevel   	:   1,

	    currentGame 	:   1,
	    currentScore	:   0,
	    currentHealth	: 	100
	}

	GLOBALS.diff = 1;
	GLOBALS.gameRunning = false;
	GLOBALS.continue = false;

	App.populator('Home', function (page) {

		require.setModuleRoot("js/");
		require.run("app");

		$(page)
			.find('#normal')
			.on('click', function(event){
				hideAll();
				$('#loading').show();
				cards.kik.getUser(function (user) {
			      if ( !user ) {
			         	GLOBALS.diff = 1;
			         	GLOBALS.loadGame();
						return;
			      }

				API.createLogin(user.username, function (user) {
					GLOBALS.diff = 1;
					GLOBALS.user = user;
					GLOBALS.loadGame();
				});
			});
		});

		$(page)
			.find('#hard')
			.on('click', function(event){
				hideAll();
				$('#loading').show();
				cards.kik.getUser(function (user) {
			      if ( !user ) {
					GLOBALS.diff = 2;
					GLOBALS.loadGame();
			      }


				API.createLogin(user.username, function (user) {
					GLOBALS.diff = 2
					GLOBALS.user = user;
					GLOBALS.loadGame();
				});
			});
		});

		$(page)
			.find('#continue')
			.on('click', function(event){
				hideAll();
				$('#loading').show();
				cards.kik.getUser(function (user) {
			      if ( !user ) {
			          alert('You need an account to continue');
			          return;
			      }

					API.createLogin(user.username, function (user) {
					    GLOBALS.user = user;
					    GLOBALS.continue = true;
					    GLOBALS.loadGame();
					});
			    });
			});

		/*
			HIGH SCORE PAGE
		*/

		$(page)
			.find('#high')
			.on('click', function(event){
				hideAll();
				$('#loading').show();
				API.getHigh(function (err, users) {
					if (err) console.log(err);
					else {
						console.log(users);
						for (var i = 0; i < users.length; i++){
							console.log(users[i]);
							$('#highscores').append( '<li>' + users[i].name + ': ' + users[i]['highscore'] + '</li>' );
						}
						$('#loading').hide();
						$('#high-page').show();
					}
				});
		});

		$(page)
			.find('#back')
			.on('click', function(event){
				GLOBALS.hideAll();
				$('#loading').show();
				$('#highscores').html('')
				$('#home-page').show();
		});

		/* 
			END HIGH SCORE PAGE
		*/

	});

	try {
		App.restore();
	} catch (err) {
		App.load('Home');
	}

})(App);

CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (preserveTransform) {
      this.restore();
    }           
};