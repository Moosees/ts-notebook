import { Cell } from '../redux/';
import ActionBar from './action-bar';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellItemProps {
  cell: Cell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  const CellComponent =
    cell.type === 'code' ? (
      <CodeCell cell={cell} />
    ) : (
      <TextEditor cell={cell} />
    );

  return (
    <div>
      <ActionBar id={cell.id} />
      {CellComponent}
    </div>
  );
};

export default CellItem;
