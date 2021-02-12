import { BundleCompleteAction, BundleStartAction } from '../actions';
import { Types } from '../types';

export const bundleStart = (id: string): BundleStartAction => ({
  type: Types.BUNDLE_START,
  payload: {
    id,
  },
});

export const bundleComplete = (
  id: string,
  code: string,
  error: string
): BundleCompleteAction => ({
  type: Types.BUNDLE_COMPLETE,
  payload: {
    id,
    result: { code, error },
  },
});
