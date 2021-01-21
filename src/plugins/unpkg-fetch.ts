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

          const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
          const parsedCss =
            fileType === 'css'
              ? data
                  .replace(/\n/g, '')
                  .replace(/"/g, '\\"')
                  .replace(/'/g, "\\'")
              : '';
          const contents =
            fileType === 'css'
              ? `
            const style = document.createElement('style');
            style.innerText = '${parsedCss}';
            document.head.appendChild(style);
          `
              : data;

          const newPackage: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents,
            resolveDir: new URL('./', request.responseURL).pathname,
          };

          await packageCache.setItem(args.path, newPackage);

          return newPackage;
        }
      });
    },
  };
};
