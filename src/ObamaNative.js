const { ipcRenderer } = require('electron');

exports.default = {
	ipc: {
		on: function(event, listener) {
			ipcRenderer.on(event, listener);
		},
		once: function(event, listener) {
			ipcRenderer.once(event, listener);
		},
		send: function(event, ...args) {
			ipcRenderer.send(event, ...args);
		},
		sendSync: function(event, ...args) {
			ipcRenderer.sendSync(event, ...args);
		},
		off: function(event, listener) {
			ipcRenderer.off(event, listener);
		},
		invoke: function(event, ...args) {
			ipcRenderer.invoke(event, ...args);
		},
	},
};
