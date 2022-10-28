const electron = require('electron');
const { join } = require('path');


class BrowserWindow extends electron.BrowserWindow {
	constructor(options) {
		if (!options || !options.webPreferences || !options.webPreferences.preload || !options.title) return super(options);
		const org = options.webPreferences.preload;
		options.webPreferences.preload = join(__dirname, 'preload.js');
		options.webPreferences.nodeIntegration = true;
		options.webPreferences.webSecurity = false;
		process.env.Discord_PRELOAD = org;


		super(options);

	}
}


module.exports = BrowserWindow;