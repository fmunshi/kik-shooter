(function (App) {

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

	    maxHealth   :   100,
	    exp         :   100,
	    level       :   1,

	    highscore   :   0,
	    highlevel   :   1,

	    currentGame :   1
    }

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

					API.login(user.username, function (user) {
					    console.log(user);
					    window.user = user;
					    App.load('game');
					});
			    });
			});
	});

	App.populator('game', function (page) {
		require.setModuleRoot("js/");
		require.run("app");

		document.addEventListener("gameEnd",function(){
			App.load('Home');
		}, false);

	});

	App.populator('high', function (page){
		API.getHigh(function (err, users) {
			if (err) console.log(err);
			else {
				console.log(users);
				for (var i = 0; i < users.length; i++){
					console.log(users[i]);
					$('#highscores').append( '<li>' + users[i].name + ' ------ ' + users[i]['highscore'] + '</li>' );
				}
				$('#loading').hide();
			}
		});
	});

	try {
		App.load('Home');
	} catch (err) {
		App.load('Home');
	}
})(App);
