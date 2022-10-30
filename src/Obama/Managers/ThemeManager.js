/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const themes = new Map();


async function enableThemes() {
	for (const theme of await window.ObamaNative.themes.themeList()) {
		const e = document.createElement('link');
		e.rel = 'stylesheet';
		e.href = `obamacord://theme/${theme.name}/${theme.manifest.theme}`;
		themes.set(theme.name, e);
		document.head.appendChild(e);
	}
}

module.exports = {
	enableThemes,
};