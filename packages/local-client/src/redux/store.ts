import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistMiddleware } from './middleware/persistMiddleware';
import reducers from './reducers';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);
