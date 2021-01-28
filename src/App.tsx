import 'bulmaswatch/slate/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useEffect, useRef, useState } from 'react';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import { unpkgFetchPlugin } from './plugins/unpkg-fetch';
import { unpkgPathPlugin } from './plugins/unpkg-path';

const dummyCode = `import React from 'react';
  import ReactDOM from 'react-dom';

  const App = () => <div>test</div>;

  ReactDOM.render(<App/>, document.querySelector("#root"))
`;

const App = () => {
  const esbuildRef = useRef<any>();
  const [editorCode, setEditorCode] = useState(dummyCode);
  const [previewCode, setPreviewCode] = useState('');

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
    if (!esbuildRef.current) return;
    try {
      const result = await esbuildRef.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), unpkgFetchPlugin(editorCode)],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window',
        },
      });

      setPreviewCode(result.outputFiles[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CodeEditor defaultValue={dummyCode} onChange={setEditorCode} />
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <Preview code={previewCode} />
    </div>
  );
};

export default App;
