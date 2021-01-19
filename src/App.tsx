import { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleSubmit = async () => {
    if (!ref.current || !input) return;
    try {
      const result = await ref.current.transform(input, {
        loader: 'jsx',
        target: 'es2015',
      });
      setCode(result.code);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
