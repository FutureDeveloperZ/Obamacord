const { ipcRenderer } = require('electron');

const ObamaNative = {
	themes : {
		themeList   : async () => ipcRenderer.invoke('THEMES_LIST'),
		enableThemes: async function() {
			const themes = await ObamaNative.themes.themeList();
			const pass = [];
			pass.push(themes);
			return pass;
		},
	},

};

module.exports = ObamaNative;