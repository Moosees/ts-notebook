import { useState } from 'react';
import { bundleCode } from '../esbuild-helpers';
import CodeEditor from './code-editor';
import CodePreview from './code-preview';

const defaultCode = `import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>test</div>;

ReactDOM.render(<App/>, document.querySelector("#root"));
`;

const CodeCell = () => {
  const [editorCode, setEditorCode] = useState(defaultCode);
  const [previewCode, setPreviewCode] = useState('');

  const handleSubmit = async () => {
    const bundledCode = await bundleCode(editorCode);
    setPreviewCode(bundledCode);
  };

  return (
    <div>
      <CodeEditor defaultValue={defaultCode} onChange={setEditorCode} />
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <CodePreview code={previewCode} />
    </div>
  );
};

export default CodeCell;
