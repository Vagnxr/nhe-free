import { handleActions } from 'redux-actions';
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

export const initialState = {
  isFetching: false,
  loginsUsuarios: '',
  valid: false,
};

export default handleActions(
  {
    [RESET_DISCONNECT_VALID]: state => ({
      ...state,
      valid: false,
    }),
    [VALIDATE_DISCONNECT_REQUEST]: (state, { payload: { values } }) => ({
      ...state,
      isFetching: true,
      ...values,
    }),
    [VALIDATE_DISCONNECT_FULFILLED]: state => ({
      ...state,
      isFetching: false,
    }),
    [VALIDATE_DISCONNECT_REJECTED]: () => ({
      ...initialState,
    }),
    [SAVE_DISCONNECT_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [SAVE_DISCONNECT_FULFILLED]: state => ({
      ...state,
      isFetching: false,
      valid: true,
    }),
    [SAVE_DISCONNECT_REJECTED]: state => ({
      ...state,
      isFetching: false,
    }),
  },
  initialState,
);
