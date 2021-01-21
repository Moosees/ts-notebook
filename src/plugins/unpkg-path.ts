import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js')
          return { path: args.path, namespace: 'a' };

        if (args.resolveDir)
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
        console.log('onLoad', args);

        if (args.path === 'index.js')
          return {
            loader: 'jsx',
            contents: `
              import message from 'nested-test-pkg';
              console.log(message);
            `,
          };
        else {
          const { data, request } = await axios.get(args.path);
          console.log('request', request);

          return {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname,
          };
        }
      });
    },
  };
};
