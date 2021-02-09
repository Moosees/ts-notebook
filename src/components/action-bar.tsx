import { useTypedAction } from '../hooks/use-typed-action';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell } = useTypedAction();

  return (
    <div>
      <button onClick={() => moveCell(id, 'up')}>Up</button>
      <button onClick={() => moveCell(id, 'down')}>Down</button>
      <button onClick={() => deleteCell(id)}>Delete</button>
    </div>
  );
};

export default ActionBar;