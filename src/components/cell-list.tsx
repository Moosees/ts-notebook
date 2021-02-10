import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellBar from './cell-bar';
import CellItem from './cell-item';

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const cellComponents = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellBar beforeId={cell.id} />
      <CellItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {cellComponents}
      <CellBar beforeId={null} />
    </div>
  );
};

export default CellList;
