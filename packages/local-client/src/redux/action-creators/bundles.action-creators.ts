import { Dispatch } from 'redux';
import { bundleCode } from '../../esbuild-helpers';
import { Actions } from '../actions';
import { Types } from '../types';

export const createBundle = (id: string, input: string) => async (
  dispatch: Dispatch<Actions>
) => {
  dispatch({
    type: Types.BUNDLE_START,
    payload: {
      id,
    },
  });

  const result = await bundleCode(input);

  dispatch({
    type: Types.BUNDLE_COMPLETE,
    payload: {
      id,
      result,
    },
  });
};
