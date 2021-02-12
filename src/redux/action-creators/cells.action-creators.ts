import {
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from '../actions';
import { CellTypes, MoveDirections } from '../cell';
import { Types } from '../types';

export const deleteCell = (id: string): DeleteCellAction => ({
  type: Types.DELETE_CELL,
  payload: {
    id,
  },
});

export const insertCellAfter = (
  afterId: string | null,
  type: CellTypes
): InsertCellAfterAction => ({
  type: Types.INSERT_CELL_AFTER,
  payload: {
    afterId,
    type,
  },
});

export const moveCell = (
  id: string,
  direction: MoveDirections
): MoveCellAction => ({
  type: Types.MOVE_CELL,
  payload: {
    id,
    direction,
  },
});

export const updateCell = (id: string, update: string): UpdateCellAction => ({
  type: Types.UPDATE_CELL,
  payload: {
    id,
    update,
  },
});
