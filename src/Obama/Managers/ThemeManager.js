const fs = require('fs');

function loadThemes(themeManifest) {
	const themes = [];
	const themeFiles = fs.readdirSync(__dirname + '/themes');
	themeFiles.forEach(function(themeFile) {
		if (themeFile.endsWith('.json')) {
			const theme = require('./themes/' + themeFile);
			themes.push(theme);
		}
	});

}
