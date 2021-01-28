import { useState } from 'react';
import { bundleCode } from '../esbuild-helpers';
import './code-cell.css';
import CodeEditor from './code-editor';
import CodePreview from './code-preview';
import Resizable from './resizable';

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
    <Resizable direction="vertical">
      <section className="code-cell-section">
        <CodeEditor defaultValue={defaultCode} onChange={setEditorCode} />
        <CodePreview code={previewCode} />
        {/* <div>
          <button onClick={handleSubmit}>Submit</button>
        </div> */}
      </section>
    </Resizable>
  );
};

export default CodeCell;
