const { rmSync, existsSync } = require('fs');
const { getDiscordDirectory } = require('./components');


async function uninjectPatcher() {
	const discordDirectory = await getDiscordDirectory();
	if(!existsSync(discordDirectory)) {
		console.log('Theres nothing to uninject');
		return false;
	}
	rmSync(discordDirectory, { recursive: true });
	console.log('Uninjected');
	return true;

}

uninjectPatcher();