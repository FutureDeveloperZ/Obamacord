const { ipcMain } = require('electron');
const { readFileSync, readdirSync } = require('fs');
const { join } = require('path');

const themeDir = join(__dirname, './themes');

ipcMain.on('OBAMA_JS', (e) => {
	e.returnValue = readFileSync(join(__dirname, 'index.js'), 'utf-8');
});

ipcMain.handle('THEMES_LIST', async () => {
	const themes = [];
	const files = await readdirSync(themeDir);
	files.forEach((file) => {
		if (file.endsWith('.css')) {
			themes.push(file);
		}
	});
	return themes;
});

