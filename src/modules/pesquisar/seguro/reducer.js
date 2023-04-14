import { handleActions } from 'redux-actions';
import constants from './constants';

const {
  UPDATE_PESQUISA,
  PESQUISAR_SEGURO_REQUEST,
  PESQUISAR_SEGURO_FULFILLED,
  PESQUISAR_SEGURO_REJECTED,
} = constants;

export const initialState = {
  isFetching: false,
  pdv: '',
  canal: 'SELECIONE',
  seguroMovel: '',
  impedidoBuscaCanal: false,
  pdvs: [],
};

export default handleActions(
  {
    [UPDATE_PESQUISA]: (state, { payload: { field, value } }) => ({
      ...state,
      [field]: value,
    }),
    [PESQUISAR_SEGURO_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [PESQUISAR_SEGURO_FULFILLED]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      pdvs: payload,
    }),
    [PESQUISAR_SEGURO_REJECTED]: state => ({
      ...state,
      pdvs: [],
      isFetching: false,
    }),
  },
  initialState,
);
