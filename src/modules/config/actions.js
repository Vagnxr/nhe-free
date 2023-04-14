import { createAction } from 'redux-actions';
import constants from './constants';

const {
  VALIDATE_REQUEST,
  VALIDATE_FULFILLED,
  VALIDATE_REJECTED,
  SAVE_REQUEST,
  SAVE_FULFILLED,
  SAVE_REJECTED,
  RESET_VALID,
} = constants;

export const resetValid = createAction(RESET_VALID);
export const validateRequest = createAction(VALIDATE_REQUEST);
export const validateFulfilled = createAction(VALIDATE_FULFILLED);
export const validateRejected = createAction(VALIDATE_REJECTED);
export const saveRequest = createAction(SAVE_REQUEST);
export const saveFulfilled = createAction(SAVE_FULFILLED);
export const saveRejected = createAction(SAVE_REJECTED);
