/* eslint-disable no-unused-vars */
const { ipcMain } = require('electron');
const { readFileSync } = require('fs');
const { readdir, readFile } = require('fs/promises');
const { join, resolve, extname } = require('path');

const themeDir = resolve(__dirname, '../themes/');

async function getThemes(name) {
	// if (typeof name === !'string') throw console.log('Name must be a string');
	const theManifest = JSON.parse(
		await readFile(join(themeDir, name, 'manifest.json'), {
			encoding: 'utf8',
		}));

	return {
		name: theManifest.name,
		manifest: theManifest,
	};
}

ipcMain.on('OBAMA_JS', (e) => {
	e.returnValue = readFileSync(join(__dirname, 'index.js'), 'utf-8');
});

ipcMain.handle('THEMES_LIST', async () => {
	const themes = (await readdir(themeDir, { withFileTypes: true }));
	const pass = [];

	for (const theme of themes) {
		pass.push(await getThemes(theme.name));
	}
	return pass;
});

