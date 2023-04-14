import { handleActions } from 'redux-actions';
import constants from './constants';

const { CANAIS_SEGURO_REQUEST, CANAIS_SEGURO_FULFILLED, CANAIS_SEGURO_REJECTED } = constants;

export const initialState = {
  isFetching: false,
  canaisSeguroDisponiveis: [],
};

export default handleActions(
  {
    [CANAIS_SEGURO_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [CANAIS_SEGURO_FULFILLED]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      canaisSeguroDisponiveis: payload,
    }),
    [CANAIS_SEGURO_REJECTED]: () => ({
      ...initialState,
    }),
  },
  initialState,
);
