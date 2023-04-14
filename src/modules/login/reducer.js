import { handleActions } from 'redux-actions';
import constants from './constants';

const { LOGIN_REQUEST, LOGIN_FULFILLED, LOGIN_REJECTED } = constants;

export const initialState = {
  isFetching: false,
  authorized: false,
  token: '',
  username: '',
};

export default handleActions(
  {
    [LOGIN_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [LOGIN_FULFILLED]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      ...payload,
    }),
    [LOGIN_REJECTED]: () => ({
      ...initialState,
    }),
  },
  initialState,
);
