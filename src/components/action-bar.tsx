import { useTypedAction } from '../hooks/use-typed-action';
import './action-bar.css';
import ButtonIcon from './button-icon';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell } = useTypedAction();

  return (
    <div className="action-bar">
      <ButtonIcon icon="fa-arrow-up" onClick={() => moveCell(id, 'up')} />
      <ButtonIcon icon="fa-arrow-down" onClick={() => moveCell(id, 'down')} />
      <ButtonIcon icon="fa-times" onClick={() => deleteCell(id)} />
    </div>
  );
};

export default ActionBar;
