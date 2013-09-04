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
	});

	try {
		// App.restore();
		App.load('Home');
	} catch (err) {
		App.load('Home');
	}
})(App);
