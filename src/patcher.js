const electron = require('electron');
const electronPath = require.resolve('electron');
const { join, dirname } = require('path');

console.log('HI is me Obama');

const discordPath = join(dirname(require.main.filename), '..', 'app.orig.asar');


class BrowserWindow extends electron.BrowserWindow {
	constructor(options) {
		// eslint-disable-next-line constructor-super
		if (!options || !options.webPreferences || !options.webPreferences.preload || !options.title) return super(options);
		const org = options.webPreferences.preload;
		options.webPreferences.preload = join(__dirname, 'preload.js');
		options.webPreferences.nodeIntegration = true;
		options.webPreferences.webSecurity = false;
		process.env.Discord_PRELOAD = org;


		super(options);
	}
}
Object.assign(BrowserWindow, electron.BrowserWindow);

electron.app.setAppPath(discordPath);


const init = () => {
	Object.defineProperty(BrowserWindow, 'name', { value: 'BrowserWindow', configurable: true });
	const electronExp = Object.assign({}, electron, { BrowserWindow });
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


	electron.protocol.registerFileProtocol('obamacord', (request, callback) => {
		let filePath = join(__dirname, '..');
		const reqUrl = new URL(request.url);
		switch (reqUrl.hostname) {
		case 'theme':
			filePath = join(filePath, `${reqUrl.hostname}s`, reqUrl.pathname);
		}
		callback({ path: filePath });
	});

};

require('./Obama/modules/ipc');

electron.app.once('ready', init);
