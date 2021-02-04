import { CellTypes, MoveDirections } from '../cell';
import { Types } from '../types';

export interface DeleteCellAction {
  type: Types.DELETE_CELL;
  payload: { id: string };
}

export interface InsertCellBeforeAction {
  type: Types.INSERT_CELL_BEFORE;
  payload: { id: string; type: CellTypes };
}

export interface MoveCellAction {
  type: Types.MOVE_CELL;
  payload: {
    id: string;
    direction: MoveDirections;
  };
}

export interface UpdateCellAction {
  type: Types.UPDATE_CELL;
  payload: { id: string; update: string };
}

export type Actions =
  | DeleteCellAction
  | InsertCellBeforeAction
  | MoveCellAction
  | UpdateCellAction;
