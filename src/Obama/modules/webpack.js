/* eslint-disable no-undef */
// Thank u very much to Replugged
// https://github.com/replugged-org/replugged/blob/rewrite/src/renderer/modules/webpack.ts

let inst;
let ready = false;
let signalReady;

// eslint-disable-next-line no-unused-vars
const waitFor = new Promise(function(resolve) {
	return (signalReady = function() {
		ready = true;
		resolve();
	});
});

function startWebpack(webpackChunk) {
	if (inst !== undefined) {throw 'Womp Womp Womp';}
	inst = webpackChunk.push([[ Symbol('Obamacord') ], {}, function(r) { return r; }]);
	webpackChunk.pop();
	signalReady();
}

let webpackChunk;
Object.defineProperty(window, 'webpackChunkdiscord_app', {
	get: function() { return webpackChunk; },
	set: function(v) {
		if(!ready && v?.push !== Array.prototype.push) { startWebpack(v); }
		webpackChunk = v;
	},
	configurable: true,
});

function rawModule() { return inst ? Object.values(inst.c) : []; }

module.exports = {
	webpackChunk,
	rawModule,
};