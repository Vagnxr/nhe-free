import { handleActions } from 'redux-actions';
import constants from './constants';

const {
  PESQUISAR_PDV_REQUEST,
  PESQUISAR_PDV_FULFILLED,
  PESQUISAR_PDV_REJECTED,
  LIMPAR_HISTORICO,
} = constants;

export const initialState = {
  isFetching: false,
  historico: [],
};

export default handleActions(
  {
    [PESQUISAR_PDV_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [PESQUISAR_PDV_FULFILLED]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      historico: payload,
    }),
    [PESQUISAR_PDV_REJECTED]: () => ({
      ...initialState,
    }),
    [LIMPAR_HISTORICO]: state => ({
      ...state,
      historico: [],
    }),
  },
  initialState,
);
