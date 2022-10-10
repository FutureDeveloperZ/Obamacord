const { webFrame, contextBridge } = require('electron');
const { readFileSync } = require('fs');
const { join } = require('path');
const ObamaNative = require('./ObamaNative');

contextBridge.exposeInMainWorld('ObamaNative', ObamaNative);

webFrame.executeJavaScript(readFileSync(join(__dirname, 'Obama/index.js'), 'utf-8'));