require.config({
    paths: {
        zepto      	: 'lib/zepto',
        underscore  : 'lib/underscore',
        gamejs      : 'lib/gamejs/gamejs',
    }
});

require(['zepto', 'gamejs', 'game/app', 'game/globals'], function($, gamejs, game, $g) {

	var hideAll = function (){
		$('#home-page').hide();
		$('#game-page').hide();
		$('#high-page').hide();
		$('#highscores').html('')
	}

	var loadGame = function(){
		hideAll();
		$('#game-page').show();
		gamejs.preload($g.imageArray);
		gamejs.ready(game);
	}

	var loadHome = function() {
		hideAll();
		$('#home-page').show();
	}

	try {
		cards.browser.back(loadHome);
	} catch(err) {
		App.back = loadHome
	}


	try {
		cards.browser.setOrientationLock('portrait');
	}
	catch (err) {
		console.log(err);
	}

	// Set a default user
	window.user = {
	    name        :   "anonymous",

	    fireRate    :   750,

	    maxHealth   :   50,

	    highscore   :   0,
	    highlevel   :   1,

	    currentGame :   1,
	    currentScore:   0
    }

    window.diff = 1;

	App.populator('Home', function (page) {

		$(page)
			.find('#normal')
			.on('click', function(event){
				loadGame();
				return;
				cards.kik.getUser(function (user) {
			      if ( !user ) {
			         	window.diff = 1;
			         	loadGame();
						return;
			      }

			      console.log(user.username);

				API.createLogin(user.username, function (user) {
					console.log(user);
					window.diff = 1;
					window.user = user;
					loadGame();
				});
			});
		});

		$(page)
			.find('#hard')
			.on('click', function(event){
				cards.kik.getUser(function (user) {
			      if ( !user ) {
					window.diff = 2;
					loadGame();
					return;
			      }


				API.createLogin(user.username, function (user) {
					console.log(user);
					window.diff = 2
					window.user = user;
					loadGame();
				});
			});
		});

		$(page)
			.find('#continue')
			.on('click', function(event){
				cards.kik.getUser(function (user) {
			      if ( !user ) {
			          alert('You need an account to continue');
			          return;
			      }

			      console.log(user.username);

					API.createLogin(user.username, function (user) {
					    console.log(user);
					    window.user = user;
					    window.continue = true;
					    loadGame();
					});
			    });
			});

		// HIGH SCORE PAGE

		$(page)
			.find('#high')
			.on('click', function(event){
				hideAll();
				$('#high-page').show()
				API.getHigh(function (err, users) {
					if (err) console.log(err);
					else {
						console.log(users);
						for (var i = 0; i < users.length; i++){
							console.log(users[i]);
							$('#highscores').append( '<li>' + users[i].name + ': ' + users[i]['highscore'] + '</li>' );
						}
						$('#loading').hide();
						$('#highscores li').first().css('border', 'none!important');
					}
				});
		});

		$(page)
			.find('#back')
			.on('click', function(event){
				hideAll();
				$('#loading').show();
				$('#highscores').html('')
				$('#home-page').show();
		});

		// END HIGH SCORE PAGE
	});

	try {
		App.restore();
	} catch (err) {
		App.load('Home');
	}


});
