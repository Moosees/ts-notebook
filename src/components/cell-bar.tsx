import { useTypedAction } from '../hooks/use-typed-action';
import ButtonIconLabel from './button-icon-label';
import './cell-bar.css';

interface CellBarProps {
  beforeId: string | null;
}

const CellBar: React.FC<CellBarProps> = ({ beforeId }) => {
  const { insertCellBefore } = useTypedAction();

  return (
    <div className="cell-bar">
      <div className="divider-line" />
      <div className="cell-bar-buttons">
        <ButtonIconLabel
          onClick={() => insertCellBefore(beforeId, 'code')}
          label="Code"
          icon="fa-plus"
        />
        <ButtonIconLabel
          onClick={() => insertCellBefore(beforeId, 'text')}
          label="Text"
          icon="fa-plus"
        />
      </div>
    </div>
  );
};

export default CellBar;
