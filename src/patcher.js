const electron = require('electron');
const { join } = require('path');

console.log('HI is me Obama');

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

const init = () => {
	Object.assign(BrowserWindow, electron.BrowserWindow);
	const electronExp = Object.assign({}, electron, { BrowserWindow });
	const electronPath = require.resolve('electron');
	delete require.cache[electronPath].exports;
	require.cache[electronPath].exports = electronExp;

	electron.session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
		Object.keys(details.responseHeaders).forEach((header) => {
			switch (header) {
			case 'content-security-policy-report-only':
			case 'content-security-policy':
				delete details.responseHeaders[header];
				break;
			}
		});
		callback({ cancel: false, responseHeaders: details.responseHeaders });
	});
};


electron.app.once('ready', init);
