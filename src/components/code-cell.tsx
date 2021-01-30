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
  const [previewMsg, setPreviewMsg] = useState('');

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const result = await bundleCode(editorCode);
      setPreviewCode(result.code);
      setPreviewMsg(result.message);
    }, 600);

    return () => clearTimeout(timeout);
  }, [editorCode]);

  return (
    <Resizable direction="vertical">
      <section className="code-cell-section">
        <Resizable direction="horizontal">
          <CodeEditor defaultValue={defaultCode} onChange={setEditorCode} />
        </Resizable>
        <CodePreview code={previewCode} msg={previewMsg} />
      </section>
    </Resizable>
  );
};

export default CodeCell;
