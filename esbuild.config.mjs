import * as esbuild from "esbuild";

await Promise
	.resolve()
	.then(_ => esbuild.build({
		entryPoints: ["src/index.ts"],
		outfile: "lib/index-web.js",
		platform: "browser",
		format: "esm",
		target: ["esnext"],
		bundle: true,
		minify: true,
		treeShaking: true,
		sourcemap: "linked",
	}))
	.then(_ => esbuild.build({
		entryPoints: ["src/index.ts"],
		outfile: "lib/index-node.js",
		platform: "node",
		format: "esm",
		target: ["esnext"],
		bundle: true,
		minify: false,
		treeShaking: true,
		sourcemap: "linked",
		packages: "external",
	}));
