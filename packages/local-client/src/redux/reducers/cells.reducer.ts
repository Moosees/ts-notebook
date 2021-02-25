import produce from 'immer';
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

const cellsReducer = produce(
  (state: CellsState = initialState, action: Actions): CellsState => {
    switch (action.type) {
      case Types.DELETE_CELL:
        state.order = state.order.filter((id) => id !== action.payload.id);
        delete state.data[action.payload.id];
        return state;

      case Types.INSERT_CELL_AFTER:
        const newCell: Cell = {
          id: generateId(),
          type: action.payload.type,
          content: '',
        };

        state.data[newCell.id] = newCell;

        if (!action.payload.afterId) state.order = [newCell.id, ...state.order];
        else {
          const index = state.order.findIndex(
            (id) => id === action.payload.afterId
          );
          state.order.splice(index + 1, 0, newCell.id);
        }
        return state;

      case Types.MOVE_CELL:
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex =
          action.payload.direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= state.order.length) return state;

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;

      case Types.UPDATE_CELL:
        state.data[action.payload.id].content = action.payload.update;
        return state;

      default:
        return state;
    }
  }
);

const generateId = () => Math.random().toString(36).substr(2, 5);

export default cellsReducer;
