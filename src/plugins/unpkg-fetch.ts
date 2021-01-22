import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localForage from 'localforage';

const packageCache = localForage.createInstance({ name: 'packageCache' });

export const unpkgFetchPlugin = (input: string) => {
  return {
    name: 'unpkg-fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // load entry point
      build.onLoad({ filter: /(^index\.js$)/ }, () => ({
        loader: 'jsx',
        contents: input,
      }));
      // load cached package if found
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedPackage = await packageCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedPackage) return cachedPackage;
      });
      // load css
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const parsedCss = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
            const style = document.createElement('style');
            style.innerText = '${parsedCss}';
            document.head.appendChild(style);
          `;

        const newPackage: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await packageCache.setItem(args.path, newPackage);

        return newPackage;
      });
      // load jsx
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const newPackage: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await packageCache.setItem(args.path, newPackage);

        return newPackage;
      });
    },
  };
};
