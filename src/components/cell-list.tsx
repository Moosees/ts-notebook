import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellItem from './cell-item';
import NewCellBar from './new-cell-bar';

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const cellComponents = cells.map((cell) => (
    <Fragment key={cell.id}>
      <NewCellBar beforeId={cell.id} />
      <CellItem cell={cell} />
    </Fragment>
  ));

  return (
    <div className={cells.length ? '' : 'empty-list'}>
      {cellComponents}
      <NewCellBar beforeId={null} />
    </div>
  );
};

export default CellList;
