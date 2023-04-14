import { handleActions } from 'redux-actions';
import constants from './constants';

const { CANAIS_REQUEST, CANAIS_FULFILLED, CANAIS_REJECTED } = constants;

export const initialState = {
  isFetching: false,
  canaisDisponiveis: [],
};

export default handleActions(
  {
    [CANAIS_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [CANAIS_FULFILLED]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      canaisDisponiveis: payload,
    }),
    [CANAIS_REJECTED]: () => ({
      ...initialState,
    }),
  },
  initialState,
);
