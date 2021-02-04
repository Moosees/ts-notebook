import {
  DeleteCellAction,
  InsertCellBeforeAction,
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

export const InsertCellBefore = (
  beforeId: string,
  type: CellTypes
): InsertCellBeforeAction => ({
  type: Types.INSERT_CELL_BEFORE,
  payload: {
    beforeId,
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
