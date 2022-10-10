const { webFrame } = require('electron');
const { readFileSync } = require('fs');
const { join } = require('path');


webFrame.executeJavaScript(readFileSync(join(__dirname, 'Obama/index.js'), 'utf-8'));