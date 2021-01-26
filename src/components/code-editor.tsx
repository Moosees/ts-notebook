import Editor, { OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useRef } from 'react';

interface CodeEditorProps {
  defaultValue: string;
  onChange(value: string): void;
}

const options: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  folding: false,
  fontSize: 14,
  lineNumbersMinChars: 3,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  showUnused: false,
  wordWrap: 'on',
};

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultValue, onChange }) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => onChange(editor.getValue()));
    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  return (
    <Editor
      theme="vs-dark"
      height="40vh"
      width="50vw"
      language="javascript"
      defaultValue={defaultValue}
      options={options}
      onMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
