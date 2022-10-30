/* eslint-disable no-undef */
const obamacord = require('./ObamaClient');


window.obamacord = obamacord;

async function start() {
	console.log('HIIIIIIIIIIII');
	setTimeout(async () => {
		await obamacord.themes.enableThemes();
	}, 10000);

}

start();