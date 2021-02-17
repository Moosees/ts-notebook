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

const showFnPre = `
  import _React from 'react';
  import _ReactDOM from 'react-dom';
  let show = () => {};
`;

const showFn = `
  show = (value) => {
    const rootEl = document.querySelector('#root');
    if (typeof value !== 'object') {
      return rootEl.innerHTML = value || '';
    }
    if (value.$$typeof && value.props) {
      return _ReactDOM.render(value, rootEl);
    }
    return rootEl.innerHTML = JSON.stringify(value);
  }
`;

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { createBundle, updateCell } = useTypedAction();
  const { cumulativeCode, cellCode } = useTypedSelector(
    ({ bundles, cells: { data, order } }) => {
      const cellIndex = order.indexOf(cell.id);
      const cumulativeOrder = order.filter(
        (id, i) => i < cellIndex && data[id].type === 'code'
      );
      const cumulativeCode = cumulativeOrder.map((id) =>
        bundles[id] && bundles[id].message ? '' : data[id].content
      );
      const cellCode = data[cell.id].content;

      return {
        cumulativeCode,
        cellCode,
      };
    }
  );

  useEffect(() => {
    const timeout = setTimeout(async () => {
      createBundle(
        cell.id,
        [showFnPre, ...cumulativeCode, showFn, cellCode].join('\n')
      );
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellCode, cell.id, createBundle]);

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
