import { Types } from '../types';

interface DeleteCellAction {
  type: Types.DELETE_CELL;
  payload: { id: string };
}

interface InsertCellBeforeAction {
  type: Types.INSERT_CELL_BEFORE;
  payload: { id: string; type: 'code' | 'text' };
}

interface MoveCellAction {
  type: Types.MOVE_CELL;
  payload: {
    id: string;
    direction: 'up' | 'down';
  };
}

interface UpdateCellAction {
  type: Types.UPDATE_CELL;
  payload: { id: string; update: string };
}

export type Actions =
  | DeleteCellAction
  | InsertCellBeforeAction
  | MoveCellAction
  | UpdateCellAction;
