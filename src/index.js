const { mkdir, readdir, writeFile } = require('fs').promises;
const { rmdir } = require('fs');
const { join, sep } = require('path');

async function getDiscordDirectory() {
	const appData = process.env.LOCALAPPDATA;
	const discordDirectory = join(appData, 'discord');
	const discordVersions = await readdir(discordDirectory);
	const latestVersion = discordVersions.filter(path => path.startsWith('app-')).reverse()[0];
	const latestDiscordDirectory = join(discordDirectory, latestVersion, 'resources', 'app');
	return latestDiscordDirectory;
}


async function injectPatcher() {
	const discordDirectory = await getDiscordDirectory();
	await mkdir(discordDirectory);
	await Promise.all([
		writeFile(join(discordDirectory, 'index.js'), `require(\`${__dirname.replace(RegExp(sep.repeat(2), 'g'), '/')}/patcher.js\`); require("../app.asar");`),
	]);
	writeFile(
		join(discordDirectory, 'package.json'),
		JSON.stringify({ main: 'index.js', name: 'discord' }),
	);

	return true;
}
injectPatcher();

async function uninjectPatcher() {
	const discordDirectory = await getDiscordDirectory();
	await rmdir(discordDirectory);

	return true;
}