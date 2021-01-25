import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef } from 'react';
import CodeEditor from './components/code-editor';
import { unpkgFetchPlugin } from './plugins/unpkg-fetch';
import { unpkgPathPlugin } from './plugins/unpkg-path';

const iframeScrDoc = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (e) => {
            try {
              eval(e.data);
            } catch (error) {
              const errorHTML = '<div><h4 style="color: red;">Runtime Error!</h4>'+error+'</div>';
              document.querySelector('#root').innerHTML = errorHTML;
              console.error(error);
            }
          }, false)
        </script>
      </body>
    </html>
  `;

const App = () => {
  const esbuildRef = useRef<any>();
  const iframeRef = useRef<any>();

  const startService = async () => {
    esbuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.33/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleSubmit = async () => {
    if (!esbuildRef.current || !iframeRef.current) return;
    try {
      iframeRef.current.srcdoc = iframeScrDoc;

      const result = await esbuildRef.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), unpkgFetchPlugin('')],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        },
      });

      iframeRef.current.contentWindow.postMessage(
        result.outputFiles[0].text,
        '*'
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CodeEditor />
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <iframe
        ref={iframeRef}
        title="code"
        sandbox="allow-scripts"
        srcDoc={iframeScrDoc}
        height={200}
        width={400}
      />
    </div>
  );
};

export default App;
