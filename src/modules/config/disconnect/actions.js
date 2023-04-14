import { createAction } from 'redux-actions';
import constants from './constants';

const {
  VALIDATE_DISCONNECT_REQUEST,
  VALIDATE_DISCONNECT_FULFILLED,
  VALIDATE_DISCONNECT_REJECTED,
  SAVE_DISCONNECT_REQUEST,
  SAVE_DISCONNECT_FULFILLED,
  SAVE_DISCONNECT_REJECTED,
  RESET_DISCONNECT_VALID,
} = constants;

export const resetDisconnectValid = createAction(RESET_DISCONNECT_VALID);
export const validateDisconnectRequest = createAction(VALIDATE_DISCONNECT_REQUEST);
export const validateDisconnectFulfilled = createAction(VALIDATE_DISCONNECT_FULFILLED);
export const validateDisconnectRejected = createAction(VALIDATE_DISCONNECT_REJECTED);
export const saveDisconnectRequest = createAction(SAVE_DISCONNECT_REQUEST);
export const saveDisconnectFulfilled = createAction(SAVE_DISCONNECT_FULFILLED);
export const saveDisconnectRejected = createAction(SAVE_DISCONNECT_REJECTED);
