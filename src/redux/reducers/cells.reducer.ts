import { Actions } from '../actions';
import { Cell } from '../cell';
import { Types } from '../types';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellsReducer = (
  state: CellsState = initialState,
  action: Actions
): CellsState => {
  switch (action.type) {
    case Types.DELETE_CELL:
      return state;

    case Types.INSERT_CELL_BEFORE:
      return state;

    case Types.MOVE_CELL:
      return state;

    case Types.UPDATE_CELL:
      return state;

    default:
      return state;
  }
};

export default cellsReducer;
