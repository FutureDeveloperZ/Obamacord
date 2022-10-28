const { webFrame, contextBridge, ipcRenderer } = require('electron');

const ObamaNative = require('./ObamaNative');
contextBridge.exposeInMainWorld('ObamaNative', ObamaNative);

const obama = ipcRenderer.sendSync('OBAMA_JS');
webFrame.executeJavaScript(obama);

require(process.env.DISCORD_PRELOAD);

