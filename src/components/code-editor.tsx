import Editor, { OnMount } from '@monaco-editor/react';
import j from 'jscodeshift';
import { editor } from 'monaco-editor';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
import prettier from 'prettier';
import babel from 'prettier/parser-babel';
import { useRef } from 'react';
import './code-editor.css';

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

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => onChange(editor.getValue()));
    editor.getModel()?.updateOptions({ tabSize: 2 });

    const monacoJSXHighlighter = new MonacoJSXHighlighter(monaco, j, editor);
    monacoJSXHighlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
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
    <div className="editor-container">
      <button
        className="button button-format is-info is-small"
        onClick={handleFormat}
      >
        Format code
      </button>
      <Editor
        theme="vs-dark"
        language="javascript"
        defaultValue={defaultValue}
        options={options}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
