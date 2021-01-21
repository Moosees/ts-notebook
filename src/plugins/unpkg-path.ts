import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localForage from 'localforage';

const packageCache = localForage.createInstance({ name: 'packageCache' });

export const unpkgPathPlugin = (input: string) => {
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

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js')
          return {
            loader: 'jsx',
            contents: input,
          };
        else {
          const cachedPackage = await packageCache.getItem<esbuild.OnLoadResult>(
            args.path
          );

          if (cachedPackage) return cachedPackage;

          const { data, request } = await axios.get(args.path);

          const newPackage: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname,
          };

          await packageCache.setItem(args.path, newPackage);

          return newPackage;
        }
      });
    },
  };
};
