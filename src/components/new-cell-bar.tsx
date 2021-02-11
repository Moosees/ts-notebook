import { useTypedAction } from '../hooks/use-typed-action';
import ButtonIconLabel from './button-icon-label';
import './new-cell-bar.css';

interface CellBarProps {
  beforeId: string | null;
}

const NewCellBar: React.FC<CellBarProps> = ({ beforeId }) => {
  const { insertCellBefore } = useTypedAction();

  return (
    <div className="new-cell-bar">
      <div className="divider-line" />
      <div className="new-cell-bar-buttons">
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

export default NewCellBar;
