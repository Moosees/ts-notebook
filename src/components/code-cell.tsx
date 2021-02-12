import { useEffect } from 'react';
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
  const { createBundle, updateCell } = useTypedAction();

  useEffect(() => {
    const timeout = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cell.content, cell.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell">
        <Resizable direction="horizontal">
          <CodeEditor
            defaultValue={cell.content}
            onChange={(v) => updateCell(cell.id, v)}
          />
        </Resizable>
        <CodePreview id={cell.id} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
