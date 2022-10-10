const electronPath = require.resolve('electron');
const OBrowserWindow = require('./BrowserWindow');

const electron = require('electron');

console.log('HI is me Obama');

const electronExp = new Proxy(electron, {
	get(target, prop) {
		switch(prop) {
		case 'BrowserWindow':
			return OBrowserWindow;
		default:
			return target[prop];
		}
	},
});

delete require.cache[electronPath].exports;
require.cache[electronPath].exports = electronExp;


electron.app.once('ready', () => {
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
});

