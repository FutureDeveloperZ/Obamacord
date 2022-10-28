const esbuild = require('esbuild');
const path = require('path');

const options = esbuild.BuildOptions = {
	absWorkingDir: path.join(__dirname, '..'),
	bundle: true,
	minify: false,
};

Promise.all([
	esbuild.build({
		...options,
		entryPoints: ['src/Obama/index.js'],
		platform: 'node',
		target: 'node14',
		outfile: 'dist/index.js',
		external: ['electron'],
	}),
	esbuild.build({
		...options,
		entryPoints: ['src/patcher.js'],
		platform: 'node',
		target: 'node14',
		outfile: 'dist/patcher.js',
		external: ['electron'],
	}),
	esbuild.build({
		...options,
		entryPoints: ['src/preload.js'],
		platform: 'node',
		target: 'node14',
		outfile: 'dist/preload.js',
		external: ['electron'],
	}),
]);