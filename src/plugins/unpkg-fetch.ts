import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localForage from 'localforage';

const packageCache = localForage.createInstance({ name: 'packageCache' });

export const unpkgFetchPlugin = (input: string) => {
  return {
    name: 'unpkg-fetch-plugin',
    setup(build: esbuild.PluginBuild) {
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
