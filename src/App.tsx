import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';
import { unpkgFetchPlugin } from './plugins/unpkg-fetch';
import { unpkgPathPlugin } from './plugins/unpkg-path';

const dummyText = `import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>test</div>;

ReactDOM.render(<App/>, document.querySelector("#root"))
`;

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
  const [input, setInput] = useState(dummyText);
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
    if (!esbuildRef.current || !iframeRef.current || !input) return;
    try {
      iframeRef.current.srcdoc = iframeScrDoc;

      const result = await esbuildRef.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), unpkgFetchPlugin(input)],
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
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={14}
        cols={48}
      ></textarea>
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
