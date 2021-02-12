import produce from 'immer';
import { Actions } from '../actions';
import { Types } from '../types';

interface BundlesState {
  [key: string]: {
    code: string;
    error: string;
    isWorking: boolean;
  };
}

const bundlesReducer = produce(
  (state: BundlesState = {}, action: Actions): BundlesState => {
    switch (action.type) {
      case Types.BUNDLE_START:
        state[action.payload.id] = {
          code: '',
          error: '',
          isWorking: true,
        };
        return state;

      case Types.BUNDLE_COMPLETE:
        state[action.payload.id] = {
          ...action.payload.result,
          isWorking: false,
        };
        return state;

      default:
        return state;
    }
  }
);

export default bundlesReducer;
