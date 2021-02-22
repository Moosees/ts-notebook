import { useTypedAction } from '../hooks/use-typed-action';
import ButtonIconLabel from './button-icon-label';
import './new-cell-bar.css';

interface CellBarProps {
  afterId: string | null;
}

const NewCellBar: React.FC<CellBarProps> = ({ afterId }) => {
  const { insertCellAfter } = useTypedAction();

  return (
    <div className="new-cell-bar">
      <div className="divider-line" />
      <div className="new-cell-bar-buttons">
        <ButtonIconLabel
          onClick={() => insertCellAfter(afterId, 'code')}
          label="Code"
          icon="fa-plus"
        />
        <ButtonIconLabel
          onClick={() => insertCellAfter(afterId, 'text')}
          label="Text"
          icon="fa-plus"
        />
      </div>
    </div>
  );
};

export default NewCellBar;
