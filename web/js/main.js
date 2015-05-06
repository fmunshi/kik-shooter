(function (App) {

	var $g = window.GLOBALS 	= {};

	$g.WIDTH 	= window.innerWidth;
	$g.HEIGHT 	= window.innerHeight;

	var hideAll = $g.hideAll = function (){
		$('#home-page').addClass("hidden");
		$('#game-page').addClass("hidden");
		$('#high-page').addClass("hidden");
		$('#highscores').html('');
		$g.gameRunning = false;
	}

	var loadGame = $g.loadGame = function(){
		hideAll();
		$('#game-page').show();
		$g.gameRunning = true;
	}

	var loadHome = $g.loadHome = function() {
		hideAll();
		$('#home-page').show();
		$g.gameRunning = false;
	}

	try {
		cards.browser.back(loadHome);
		cards.browser.setOrientationLock('portrait');
		App.back = loadHome
	} catch(err) {
		App.back = loadHome
	}

	// Set a default user
	$g.user = {
	    name        	:   "anonymous",
	    fireRate    	:   750,
	    maxHealth   	:   50,
	    highscore   	:   0,
	    highlevel   	:   1,
	    currentGame 	:   1,
	    currentScore	:   0,
	    currentHealth	: 	100
	}

	$g.difficulty = 1;
	$g.gameRunning = false;
	$g.continue = false;

	App.populator('Home', function (page) {

		require.setModuleRoot("js/");
		require.run("app");


		$g.login = function (user) {
			API.createLogin(user.username, function (user) {
				if (user !== null) $g.user = user;
				$g.loadGame();
			});
		}

		$(page)
			.find('#start-menu button')
			.on('touchend click', function(event) {
				var mode = $(this).data("mode");
				$g.hideAll();
				$('#loading').show();

				if (mode === "normal" || mode === "hard") {
					if (mode === "normal") 	$g.difficulty = 1;
					else 										$g.difficulty = 2;

					if (cards.kik) {
						cards.kik.getUser(function (user) {
				      if ( !user ) return;
				      $g.login(user)
				  	});
					} else {
						$g.login($g.user)
					}

				} else if (mode === "continue") {
					if (cards.kik) {
						cards.kik.getUser(function (user) {
				      if ( !user ) {
				          alert("You need an account to continue");
				          return;
				      }
				      $g.login(user);
			   		});
					} else { 
						alert("You need to be on the Kik Mobile application to utilize the continue feature");
					}
				} else if (mode === "high") {
					API.getHigh(function (err, users) {
						if (err) console.log(err);
						else {
							console.log(users);
							for (var i = 0; i < users.length; i++){
								console.log(users[i]);
								$('#highscores').append( '<li> <div class = "left"> ' + users[i].name + ': </div> <div class = "right">' + users[i]['highscore'] + '</div> </li>' );
							}
							$('#loading').hide();
							$('#high-page').show();
						}
					});
				}

				
			});

			$(page)
				.find('#back')
				.on('touchend click', function(event){
					$g.hideAll();
					$('#highscores').html('');
					$('#loading').show();
					$('#home-page').show();
			});

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
	this.fillStyle = "#fff";
	this.fillRect(0, 0, window.innerWidth, window.innerHeight);

    if (preserveTransform) {
      this.restore();
    }           
};