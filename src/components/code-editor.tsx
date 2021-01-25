import Editor, { EditorProps } from '@monaco-editor/react';

const dummyCode = `import React from 'react';
  import ReactDOM from 'react-dom';

  const App = () => <div>test</div>;

  ReactDOM.render(<App/>, document.querySelector("#root"))
`;

const options: EditorProps['options'] = {
  automaticLayout: true,
  folding: false,
  fontSize: 14,
  lineNumbersMinChars: 3,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  showUnused: false,
  wordWrap: 'on',
};

const CodeEditor = () => {
  return (
    <Editor
      theme="vs-dark"
      height="40vh"
      width="50vw"
      language="javascript"
      defaultValue={dummyCode}
      options={options}
    />
  );
};

export default CodeEditor;
