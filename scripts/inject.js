const { mkdir, writeFile, stat, rename } = require('fs').promises;
const { join, sep } = require('path');
const { getDiscordDirectory } = require('./components');

async function injectPatcher() {
	const discordDirectory = await getDiscordDirectory();
	if((await stat(discordDirectory)).isDirectory()) {
		console.log('Patcher already injected');
		return false;
	}
	try {
		await rename(discordDirectory, join(discordDirectory, '..', 'app.orig.asar'));
		await mkdir(discordDirectory);
		await Promise.all([
			writeFile(join(discordDirectory, 'index.js'), `require(\`${__dirname.replace(RegExp(sep.repeat(2), 'g'), '/')}/../dist/patcher.js\`); require("../app.orig.asar");`),
		]);
		writeFile(
			join(discordDirectory, 'package.json'),
			JSON.stringify({ main: 'index.js', name: 'discord' }),
		);
		console.log('Injected');
		return true;
	}
	catch (e) {
		console.log('Failed to inject');
		console.log('Try Closing Discord down first');
		return false;
	}

}
injectPatcher();