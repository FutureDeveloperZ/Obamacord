const { stat, rm, rename } = require('fs/promises');
const { join } = require('path');
const { getDiscordDirectory } = require('./components');


async function uninjectPatcher() {
	const discordDirectory = await getDiscordDirectory();
	if(!(await stat(discordDirectory)).isDirectory()) {
		console.log('Theres nothing to uninject');
		return false;
	}
	try {
		await rm(discordDirectory, { recursive: true });
		await rename(join(discordDirectory, '..', 'app.orig.asar'), discordDirectory);

		console.log('Uninjected');
		return true;

	}
	catch (e) {
		console.log('Failed to uninject');
		console.log('Try Closing Discord down first');
		return false;
	}


}

uninjectPatcher();