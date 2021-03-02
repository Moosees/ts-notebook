import { Dispatch } from 'redux';
import { saveCells } from '../action-creators';
import { Actions } from '../actions';
import { RootState } from '../reducers';
import { Types } from '../types';

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Actions>;
  getState: () => RootState;
}) => {
  let timeout: any;
  return (next: (action: Actions) => void) => (action: Actions) => {
    next(action);
    if (
      [
        Types.MOVE_CELL,
        Types.UPDATE_CELL,
        Types.INSERT_CELL_AFTER,
        Types.DELETE_CELL,
      ].includes(action.type)
    ) {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        saveCells()(dispatch, getState);
      }, 500);
    }
  };
};
