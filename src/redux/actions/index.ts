import { CellTypes, MoveDirections } from '../cell';
import { Types } from '../types';

export interface DeleteCellAction {
  type: Types.DELETE_CELL;
  payload: { id: string };
}

export interface InsertCellAfterAction {
  type: Types.INSERT_CELL_AFTER;
  payload: { afterId: string | null; type: CellTypes };
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
  | InsertCellAfterAction
  | MoveCellAction
  | UpdateCellAction;
