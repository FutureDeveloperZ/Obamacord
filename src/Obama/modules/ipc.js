const { IpcMain } = require('electron');

const openDevTools = e => e.sender.openDevTools();


const registerIpcEvents = () => {
	IpcMain.on('OPEN_DEVTOOLS', openDevTools);
};

module.exports = {
	registerIpcEvents,
};