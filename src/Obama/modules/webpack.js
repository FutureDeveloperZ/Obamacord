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

// get all Modules
function allModules(filter) {
	return rawModule().map(m => {
		const isMatch = filter ? filter : function() { return true; };
		if (typeof isMatch !== 'function') {throw 'Womp Womp Womp';}
		if (isMatch(m.exports)) {
			return m.exports;
		}
		else if (m.exports.default && isMatch(m.exports.default)) {
			return m.exports.default;
		}
		else {
			for (const key in m.exports) {
				if (isMatch(m.exports[key])) {
					return m.exports[key];
				}
			}
		}
		return;
	}).filter(m => m);

}


// get specific Module
function getModule(filter) {
	return allModules(filter)[0] || null;
}

// Filters
function byDisplayName(name) {
	return function(module) {
		return module.displayName === name;
	};
}

function byCode(code) {
	return function(module) {
		return module.toString().includes(code);
	};
}

function byProps(props) {
	return function(module) {
		for (const prop in props) {
			if (module[prop] !== props[prop]) {
				return false;
			}
		}
		return true;
	};
}

function byPrototypes(prototypes) {
	return function(module) {
		for (const prototype in prototypes) {
			if (module.prototype[prototype] !== prototypes[prototype]) {
				return false;
			}
		}
		return true;
	};
}



module.exports = {
	webpackChunk,
	rawModule,
	allModules,
	getModule,
};