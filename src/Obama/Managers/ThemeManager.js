/* eslint-disable no-undef */
const extension = '.css';
const themes = []
async function loadThemes() {
	// const themes = await ipcRenderer.invoke('GET_THEMES');
	return themes;
}

function enableThemes() {
	// const themes = loadThemes();
	console.log(themes);
	themes.forEach((theme) => {
		const themePath = `./themes/${theme}`;
		// const css = fs.readFileSync(themePath, 'utf8');
		// const style = document.createElement('style');
		// style.innerHTML = themes;
		// style.appendChild(document.createTextNode(css));
		// document.head.appendChild(style);
	});
}

console.log(window.ObamaNative);