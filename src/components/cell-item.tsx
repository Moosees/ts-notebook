import { Cell } from '../redux/';
import ActionBar from './action-bar';
import './cell-item.css';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellItemProps {
  cell: Cell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  const CellComponent =
    cell.type === 'code' ? (
      <>
        <div className="action-bar-bg">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    ) : (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );

  return <div className="cell-item">{CellComponent}</div>;
};

export default CellItem;
