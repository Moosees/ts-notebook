import produce from 'immer';
import { Actions } from '../actions';
import { Cell } from '../cell';
import { Types } from '../types';

interface CellsState {
  data: {
    [key: string]: Cell;
  };
  error: string | null;
  loading: boolean;
  order: string[];
  saving: boolean;
}

const initialState: CellsState = {
  data: {},
  error: null,
  loading: false,
  order: [],
  saving: false,
};

const cellsReducer = produce(
  (state: CellsState = initialState, action: Actions): CellsState => {
    switch (action.type) {
      case Types.DELETE_CELL:
        state.order = state.order.filter((id) => id !== action.payload.id);
        delete state.data[action.payload.id];
        return state;

      case Types.FETCH_CELLS_STARTED:
        state.loading = true;
        state.error = null;
        return state;

      case Types.FETCH_CELLS_SUCCESS:
        state.loading = false;
        state.order = action.payload.cells.map((cell) => cell.id);
        state.data = action.payload.cells.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState['data']);
        return state;

      case Types.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload.error;
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

      case Types.SAVE_CELLS_STARTED:
        state.saving = true;
        return state;

      case Types.SAVE_CELLS_SUCCESS:
        state.saving = false;
        return state;

      case Types.SAVE_CELLS_ERROR:
        state.saving = false;
        state.error = action.payload.error;
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
