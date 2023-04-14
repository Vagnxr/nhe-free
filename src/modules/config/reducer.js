import { handleActions } from 'redux-actions';
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

export const initialState = {
  isFetching: false,
  canal: '',
  pontosDeVenda: '',
  data: '',
  status: undefined,
  valid: false,
};

export default handleActions(
  {
    [RESET_VALID]: state => ({
      ...state,
      valid: false,
    }),
    [VALIDATE_REQUEST]: (state, { payload: { values } }) => ({
      ...state,
      isFetching: true,
      ...values,
    }),
    [VALIDATE_FULFILLED]: state => ({
      ...state,
      isFetching: false,
    }),
    [VALIDATE_REJECTED]: () => ({
      ...initialState,
    }),
    [SAVE_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [SAVE_FULFILLED]: state => ({
      ...state,
      isFetching: false,
      valid: true,
    }),
    [SAVE_REJECTED]: state => ({
      ...state,
      isFetching: false,
    }),
  },
  initialState,
);
