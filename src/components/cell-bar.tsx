import { useTypedAction } from '../hooks/use-typed-action';
import './cell-bar.css';

interface CellBarProps {
  beforeId: string | null;
}

const CellBar: React.FC<CellBarProps> = ({ beforeId }) => {
  const { insertCellBefore } = useTypedAction();

  return (
    <div>
      <button onClick={() => insertCellBefore(beforeId, 'code')}>Code</button>
      <button onClick={() => insertCellBefore(beforeId, 'text')}>Text</button>
    </div>
  );
};

export default CellBar;
