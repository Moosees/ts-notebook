import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bulmaswatch/slate/bulmaswatch.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CellList from './components/cell-list';
import { store } from './redux';

ReactDOM.render(
  <Provider store={store}>
    <CellList />
  </Provider>,
  document.getElementById('root')
);
