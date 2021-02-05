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
  order: ['123'],
  data: { 123: { id: '123', type: 'code', content: '' } },
};

const cellsReducer = produce(
  (state: CellsState = initialState, action: Actions): CellsState => {
    switch (action.type) {
      case Types.DELETE_CELL:
        state.order = state.order.filter((id) => id !== action.payload.id);
        delete state.data[action.payload.id];
        return state;

      case Types.INSERT_CELL_BEFORE:
        const newCell: Cell = {
          id: generateId(),
          type: action.payload.type,
          content: '',
        };

        state.data[newCell.id] = newCell;

        if (!action.payload.beforeId) state.order.push(newCell.id);
        else {
          const index = state.order.findIndex(
            (id) => id === action.payload.beforeId
          );
          state.order.splice(index, 0, newCell.id);
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
