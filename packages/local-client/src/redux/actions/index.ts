import { Cell, CellTypes, MoveDirections } from '../cell';
import { Types } from '../types';

export interface DeleteCellAction {
  type: Types.DELETE_CELL;
  payload: { id: string };
}

export interface FetchCellsStartedAction {
  type: Types.FETCH_CELLS_STARTED;
}
export interface FetchCellsSuccessfulAction {
  type: Types.FETCH_CELLS_SUCCESS;
  payload: { cells: Cell[] };
}
export interface FetchCellsErrorAction {
  type: Types.FETCH_CELLS_ERROR;
  payload: { error: string };
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

export interface SaveCellsStartedAction {
  type: Types.SAVE_CELLS_STARTED;
}
export interface SaveCellsSuccessfulAction {
  type: Types.SAVE_CELLS_SUCCESS;
}
export interface SaveCellsErrorAction {
  type: Types.SAVE_CELLS_ERROR;
  payload: { error: string };
}

export interface UpdateCellAction {
  type: Types.UPDATE_CELL;
  payload: { id: string; update: string };
}

export interface BundleStartAction {
  type: Types.BUNDLE_START;
  payload: { id: string };
}

export interface BundleCompleteAction {
  type: Types.BUNDLE_COMPLETE;
  payload: { id: string; result: { code: string; message: string } };
}

export type Actions =
  | DeleteCellAction
  | FetchCellsStartedAction
  | FetchCellsSuccessfulAction
  | FetchCellsErrorAction
  | InsertCellAfterAction
  | MoveCellAction
  | SaveCellsStartedAction
  | SaveCellsSuccessfulAction
  | SaveCellsErrorAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction;
