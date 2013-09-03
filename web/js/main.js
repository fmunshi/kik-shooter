(function (App) {
	App.populator('Home', function (page) {
		console.log('log');
	});

	App.populator('game', function (page) {
		require.setModuleRoot("js/");
		require.run("app");
    	console.log('log');
	});

	try {
		App.restore();
		// App.load('Home');
	} catch (err) {
		App.load('Home');
	}
})(App);
