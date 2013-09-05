(function (App) {
	
	try {
		cards.browser.setOrientationLock('portrait');
	}
	catch (err) {
		console.log(err);
	}

	App.populator('Home', function (page) {
	
	});

	App.populator('game', function (page) {
		require.setModuleRoot("js/");
		require.run("app");

		document.addEventListener("gameEnd",function(){
			App.load('Home');
		}, false);

		// var gameEnd = document.createEvent("gameEnd");
		// gameEnd.initEvent("gameEnd",true,true);
		// document.dispatchEvent(gameEnd);

	});

	try {
		App.restore();
	} catch (err) {
		App.load('Home');
	}
})(App);
