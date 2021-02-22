import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // resolve input entry point
      build.onResolve({ filter: /(^index\.js$)/ }, () => ({
        path: 'index.js',
        namespace: 'a',
      }));
      // resolve relative imports
      build.onResolve({ filter: /^\.+\// }, (args: any) => ({
        path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
        namespace: 'a',
      }));
      // resolve main package import
      build.onResolve({ filter: /.*/ }, (args: any) => ({
        path: `https://unpkg.com/${args.path}`,
        namespace: 'a',
      }));
    },
  };
};
