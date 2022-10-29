const { ipcRenderer } = require('electron');

module.exports = {
	themes:{
		themeList   : async function() {
			ipcRenderer.invoke('THEMES_LIST');
		},
		enableThemes: async function() {
			const themes = await this.themeList();
			const pass = [];
			pass.push(themes);
			return pass;
		},
	},

};

