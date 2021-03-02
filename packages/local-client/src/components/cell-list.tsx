import { Fragment, useEffect } from 'react';
import { useTypedAction } from '../hooks/use-typed-action';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellItem from './cell-item';
import './cell-list.css';
import NewCellBar from './new-cell-bar';

const CellList = () => {
  const { fetchCells } = useTypedAction();
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  const cellComponents = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellItem cell={cell} />
      <NewCellBar afterId={cell.id} />
    </Fragment>
  ));

  return (
    <div className={`cell-list ${cells.length ? '' : 'empty-list'}`}>
      <NewCellBar afterId={null} />
      {cellComponents}
    </div>
  );
};

export default CellList;
