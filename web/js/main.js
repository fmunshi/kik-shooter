(function (App) {

	try {
		cards.browser.setOrientationLock('portrait');
	}
	catch (err) {
		console.log(err);
	}


	cards.browser.back(function () {
       	require.reset();
        return false;
    });


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
				cards.kik.getUser(function (user) {
			      if ( !user ) {
			         	window.diff = 1;
						App.load('game');
						return;
			      }

			      console.log(user.username);

				API.createLogin(user.username, function (user) {
					console.log(user);
					window.diff = 1;
					window.user = user;
					App.load('game');
				});
			});
		});

		$(page)
			.find('#hard')
			.on('click', function(event){
				cards.kik.getUser(function (user) {
			      if ( !user ) {
					window.diff = 2;
					App.load('game');
					return;
			      }


				API.createLogin(user.username, function (user) {
					console.log(user);
					window.diff = 2
					window.user = user;
					App.load('game');
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
					    App.load('game');
					});
			    });
			});
		$(page)
		.find('#high')
		.on('click', function(event){
			App.load('high');
		});
	});

	App.populator('game', function (page) {
		require.setModuleRoot("js/");
		require.run("app");

		$(page).on('appHide', function () {
			require.reset();
			require.setModuleRoot("js/");
			require.run("app");
  		});
	});

	App.populator('high', function (page){
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

		$(page)
			.find('#back')
			.on('click', function(event){
				App.back();
			});

	});

	try {
		App.load('Home');
	} catch (err) {
		App.load('Home');
	}
})(App);
