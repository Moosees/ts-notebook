import Editor, { OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import prettier from 'prettier';
import babel from 'prettier/parser-babel';
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

  const handleFormat = () => {
    const code = editorRef.current?.getValue();
    const formatted =
      code &&
      prettier.format(code, {
        parser: 'babel',
        plugins: [babel],
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
      });

    formatted && editorRef.current.setValue(formatted);
  };

  return (
    <div>
      <button onClick={handleFormat}>Format code</button>
      <Editor
        theme="vs-dark"
        height="40vh"
        width="50vw"
        language="javascript"
        defaultValue={defaultValue}
        options={options}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
