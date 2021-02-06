import { Cell } from '../redux/';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellItemProps {
  cell: Cell;
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  const CellComponent = cell.type === 'code' ? <CodeCell /> : <TextEditor />;

  return <div>{CellComponent}</div>;
};

export default CellItem;
