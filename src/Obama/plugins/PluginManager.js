const fs = require('fs');


function loadPlugins() {
	const plugins = [];
	const pluginFiles = fs.readdirSync(__dirname + '/plugins');
	pluginFiles.forEach(function(pluginFile) {
		if (pluginFile.endsWith('.js')) {
			const plugin = require('./plugins/' + pluginFile);
			plugins.push(plugin);
		}
	});
	plugins.forEach(StartThePlugin);
}

function StartThePlugin(plugin) {
	if (plugin.start) {
		plugin.start().then(console.log(`Started ${plugin.name}`));
	}
}

module.exports = {
	loadPlugins,
};