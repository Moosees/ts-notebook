import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localForage from 'localforage';

const packageCache = localForage.createInstance({ name: 'packageCache' });

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js')
          return { path: args.path, namespace: 'a' };

        if (args.path.includes('./') && args.resolveDir)
          return {
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
              .href,
            namespace: 'a',
          };

        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: 'a',
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js')
          return {
            loader: 'jsx',
            contents: `
              import React, {useState} from 'react@16.0.0';
              import ReactDOM from 'react-dom@16.0.0';
              console.log(React, ReactDOM, useState);
            `,
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
