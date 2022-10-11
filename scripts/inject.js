const { mkdir, writeFile } = require('fs').promises;
const { existsSync } = require('fs');
const { join, sep } = require('path');
const { getDiscordDirectory } = require('./components');

async function injectPatcher() {
	const discordDirectory = await getDiscordDirectory();
	if(existsSync(discordDirectory)) {
		console.log('Patcher already injected');
		return false;
	}

	await mkdir(discordDirectory);
	await Promise.all([
		writeFile(join(discordDirectory, 'index.js'), `require(\`${__dirname.replace(RegExp(sep.repeat(2), 'g'), '/')}/../src/patcher.js\`); require("../app.asar");`),
	]);
	writeFile(
		join(discordDirectory, 'package.json'),
		JSON.stringify({ main: 'index.js', name: 'discord' }),
	);

	console.log('Injected');
	return true;
}
injectPatcher();