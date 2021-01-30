import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const bundledCode = await bundleCode(editorCode);
      setPreviewCode(bundledCode);
    }, 600);

    return () => clearTimeout(timeout);
  }, [editorCode]);

  return (
    <Resizable direction="vertical">
      <section className="code-cell-section">
        <Resizable direction="horizontal">
          <CodeEditor defaultValue={defaultCode} onChange={setEditorCode} />
        </Resizable>
        <CodePreview code={previewCode} />
      </section>
    </Resizable>
  );
};

export default CodeCell;
