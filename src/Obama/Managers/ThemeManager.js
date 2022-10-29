/* eslint-disable no-unused-vars */
const themes = new Map();
async function loadThemes() {
	for (const theme of await window.ObamaNative.themes.enableThemes()) {
		themes.set(theme.name, theme);
	}
}

async function enableThemes() {
	const loadedThemes = themes;
}

module.exports = {
	enableThemes,
};