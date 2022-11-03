const { readdir } = require('fs').promises;
const { join } = require('path');

async function getDiscordDirectory() {
	const appData = process.env.LOCALAPPDATA;
	const discordDirectory = join(appData, 'discord');
	const discordVersions = await readdir(discordDirectory);
	const latestVersion = discordVersions.filter(path => path.startsWith('app-')).reverse()[0];
	const latestDiscordDirectory = join(discordDirectory, latestVersion, 'resources', 'app.asar');
	return latestDiscordDirectory;
}

module.exports = {
	getDiscordDirectory,
};