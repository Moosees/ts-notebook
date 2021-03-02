import axios from 'axios';
import { Dispatch } from 'react';
import {
  Actions,
  DeleteCellAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from '../actions';
import { Cell, CellTypes, MoveDirections } from '../cell';
import { RootState } from '../reducers';
import { Types } from '../types';

export const deleteCell = (id: string): DeleteCellAction => ({
  type: Types.DELETE_CELL,
  payload: {
    id,
  },
});

export const fetchCells = () => async (dispatch: Dispatch<Actions>) => {
  dispatch({ type: Types.FETCH_CELLS_STARTED });

  try {
    const {
      data,
    }: { data: { message: string; cells: Cell[] } } = await axios.get('/cells');
    if (data.message === 'ok')
      dispatch({
        type: Types.FETCH_CELLS_SUCCESS,
        payload: { cells: data.cells },
      });
  } catch (error) {
    dispatch({
      type: Types.FETCH_CELLS_ERROR,
      payload: { error: error.message },
    });
  }
};

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

export const saveCells = () => async (
  dispatch: Dispatch<Actions>,
  getState: () => RootState
) => {
  dispatch({ type: Types.SAVE_CELLS_STARTED });

  const {
    cells: { order, data },
  } = getState();

  const cells = order.map((id) => data[id]);

  try {
    await axios.post('/cells', { cells });

    dispatch({ type: Types.SAVE_CELLS_SUCCESS });
  } catch (error) {
    dispatch({
      type: Types.SAVE_CELLS_ERROR,
      payload: { error: error.message },
    });
  }
};

export const updateCell = (id: string, update: string): UpdateCellAction => ({
  type: Types.UPDATE_CELL,
  payload: {
    id,
    update,
  },
});
