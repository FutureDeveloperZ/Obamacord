const { ipcMain } = require('electron');
const { readFileSync } = require('fs');
const { join } = require('path');

ipcMain.on('OBAMA_JS', (e) => {
	e.returnValue = readFileSync(join(__dirname, '../index.js'), 'utf-8');
});