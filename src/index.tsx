import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CellList from './components/cell-list';
import { store } from './redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CellList />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
