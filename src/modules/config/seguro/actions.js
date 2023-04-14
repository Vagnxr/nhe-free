import { createAction } from 'redux-actions';
import constants from './constants';

const {
  VALIDATE_SEGURO_REQUEST,
  VALIDATE_SEGURO_FULFILLED,
  VALIDATE_SEGURO_REJECTED,
  SAVE_SEGURO_REQUEST,
  SAVE_SEGURO_FULFILLED,
  SAVE_SEGURO_REJECTED,
  RESET_SEGURO_VALID,
} = constants;

export const resetSeguroValid = createAction(RESET_SEGURO_VALID);
export const validateSeguroRequest = createAction(VALIDATE_SEGURO_REQUEST);
export const validateSeguroFulfilled = createAction(VALIDATE_SEGURO_FULFILLED);
export const validateSeguroRejected = createAction(VALIDATE_SEGURO_REJECTED);
export const saveSeguroRequest = createAction(SAVE_SEGURO_REQUEST);
export const saveSeguroFulfilled = createAction(SAVE_SEGURO_FULFILLED);
export const saveSeguroRejected = createAction(SAVE_SEGURO_REJECTED);
