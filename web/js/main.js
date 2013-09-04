(function (App) {

	App.populator('Home', function (page) {
		// cards.browser.setOrientationLock('portrait');
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
