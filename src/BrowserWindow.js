const electron = require('electron');
const { join } = require('path');


class BrowserWindow extends electron.BrowserWindow {
	constructor(options) {
		if(options?.webPreferences?.preload && options.title) {
			const org = options.webPreferences.preload;
			options.webPreferences.preload = join(__dirname, 'preload.js');
			options.webPreferences.sandbox = false;

			process.env.Discord_PRELOAD = org;

			super(options);
		}
		else {
			super(options);
		}
	}
}

module.exports = BrowserWindow;