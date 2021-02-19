import { useTypedSelector } from './use-typed-selector';

const showFnPre = `
  import _React from 'react';
  import _ReactDOM from 'react-dom';
  let show = () => {};
`;

const showFn = `
  show = (value) => {
    const rootEl = document.querySelector('#root');
    if (typeof value !== 'object') {
      return rootEl.innerHTML = value || '';
    }
    if (value.$$typeof && value.props) {
      return _ReactDOM.render(value, rootEl);
    }
    return rootEl.innerHTML = JSON.stringify(value);
  }
`;

export const useCumulativeCode = (cellId: string) => {
  const { beforeCellCode, cellCode } = useTypedSelector(
    ({ bundles, cells: { data, order } }) => {
      const cellIndex = order.indexOf(cellId);
      const cumulativeOrder = order.filter(
        (id, i) => i < cellIndex && data[id].type === 'code'
      );
      const beforeCellCode = cumulativeOrder.map((id) =>
        bundles[id] && bundles[id].message ? '' : data[id].content
      );
      const cellCode = data[cellId].content;

      return {
        beforeCellCode,
        cellCode,
      };
    }
  );

  return [showFnPre, ...beforeCellCode, showFn, cellCode].join('\n');
};
