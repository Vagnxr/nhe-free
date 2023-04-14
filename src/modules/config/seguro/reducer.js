import { handleActions } from 'redux-actions';
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

export const initialState = {
  isFetching: false,
  canal: '',
  pontosDeVenda: '',
  status: undefined,
  valid: false,
};

export default handleActions(
  {
    [RESET_SEGURO_VALID]: state => ({
      ...state,
      valid: false,
    }),
    [VALIDATE_SEGURO_REQUEST]: (state, { payload: { values } }) => ({
      ...state,
      isFetching: true,
      ...values,
    }),
    [VALIDATE_SEGURO_FULFILLED]: state => ({
      ...state,
      isFetching: false,
    }),
    [VALIDATE_SEGURO_REJECTED]: () => ({
      ...initialState,
    }),
    [SAVE_SEGURO_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [SAVE_SEGURO_FULFILLED]: state => ({
      ...state,
      isFetching: false,
      valid: true,
    }),
    [SAVE_SEGURO_REJECTED]: state => ({
      ...state,
      isFetching: false,
    }),
  },
  initialState,
);
