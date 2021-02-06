import { useEffect, useState } from 'react';
import { bundleCode } from '../esbuild-helpers';
import { useTypedAction } from '../hooks/use-typed-action';
import { Cell } from '../redux';
import './code-cell.css';
import CodeEditor from './code-editor';
import CodePreview from './code-preview';
import Resizable from './resizable';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [previewCode, setPreviewCode] = useState('');
  const [previewMsg, setPreviewMsg] = useState('');

  const { updateCell } = useTypedAction();

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const result = await bundleCode(cell.content);
      setPreviewCode(result.code);
      setPreviewMsg(result.message);
    }, 600);

    return () => clearTimeout(timeout);
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <section className="code-cell-section">
        <Resizable direction="horizontal">
          <CodeEditor
            defaultValue={cell.content}
            onChange={(v) => updateCell(cell.id, v)}
          />
        </Resizable>
        <CodePreview code={previewCode} msg={previewMsg} />
      </section>
    </Resizable>
  );
};

export default CodeCell;
