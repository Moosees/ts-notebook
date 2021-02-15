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
  const { cumulativeCode, cumulativeIndex } = useTypedSelector(
    ({ bundles, cells: { data, order } }) => {
      const cellIndex = order.indexOf(cell.id);
      const cumulativeOrder = order.filter(
        (id, i) => i <= cellIndex && data[id].type === 'code'
      );
      const cumulativeIndex = cumulativeOrder.length - 1;
      const cumulativeCode = cumulativeOrder.map((id) =>
        id !== cell.id && bundles[id] && bundles[id].message
          ? ''
          : data[id].content
      );

      return {
        cumulativeCode,
        cumulativeIndex,
      };
    }
  );

  useEffect(() => {
    const timeout = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode[cumulativeIndex], cell.id, createBundle]);

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
