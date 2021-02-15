import { useEffect } from 'react';
import { useTypedAction } from '../hooks/use-typed-action';
import { useTypedSelector } from '../hooks/use-typed-selector';
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
  const cumulativeCode = useTypedSelector(({ cells: { data, order } }) => {
    const cellIndex = order.indexOf(cell.id);
    const cumulativeOrder = order.filter(
      (cell, i) => i <= cellIndex && data[cell].type === 'code'
    );

    return cumulativeOrder.map((id) => data[id].content).join('\n');
  });

  useEffect(() => {
    const timeout = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cumulativeCode, cell.id, createBundle]);

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
