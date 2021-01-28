import 'bulmaswatch/slate/bulmaswatch.min.css';
import { useState } from 'react';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import { bundleCode } from './esbuild-helpers/code-bundler';

const dummyCode = `import React from 'react';
  import ReactDOM from 'react-dom';

  const App = () => <div>test</div>;

  ReactDOM.render(<App/>, document.querySelector("#root"))
`;

const App = () => {
  const [editorCode, setEditorCode] = useState(dummyCode);
  const [previewCode, setPreviewCode] = useState('');

  const handleSubmit = async () => {
    const bundledCode = await bundleCode(editorCode);
    setPreviewCode(bundledCode);
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
