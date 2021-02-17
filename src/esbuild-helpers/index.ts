import * as esbuild from 'esbuild-wasm';
import { unpkgFetchPlugin } from './plugins/unpkg-fetch';
import { unpkgPathPlugin } from './plugins/unpkg-path';

let service: esbuild.Service;

export const bundleCode = async (editorCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.33/esbuild.wasm',
    });
  }

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), unpkgFetchPlugin(editorCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    });

    return { code: result.outputFiles[0].text, message: '' };
  } catch (error) {
    return { code: '', message: error.message };
  }
};
