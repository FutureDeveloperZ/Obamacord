const { ipcRenderer } = require('electron');

module.exports = {
	ipc: {
		openDevTools: function() {
			return ipcRenderer.send('CLOSE_DEVTOOLS');
		},
	},
};

