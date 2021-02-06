import { useTypedSelector } from '../hooks/use-typed-selector';
import CellItem from './cell-item';

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const cellComponents = cells.map((cell) => (
    <CellItem key={cell.id} cell={cell} />
  ));

  return <div>{cellComponents}</div>;
};

export default CellList;
