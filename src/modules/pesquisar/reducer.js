import { handleActions } from 'redux-actions';
import constants from './constants';

const {
  UPDATE_PESQUISA,
  EXPAND_PANNEL,
  PESQUISAR_REQUEST,
  PESQUISAR_FULFILLED,
  PESQUISAR_REJECTED,
} = constants;

const getIndex = (array, item, field) => array.findIndex(el => el[field] === item[field]);

const closePannels = pdvs => pdvs.map(pdv => ({ ...pdv, expanded: false }));

export const initialState = {
  isFetching: false,
  pdv: '',
  canal: 'SELECIONE',
  analiseDocumento: '',
  impedidoBuscaCanal: false,
  pdvs: [],
};

export default handleActions(
  {
    [UPDATE_PESQUISA]: (state, { payload: { field, value } }) => ({
      ...state,
      [field]: value,
    }),
    [EXPAND_PANNEL]: (state, { payload: { pdv } }) => ({
      ...state,
      pdvs: [
        ...closePannels(state.pdvs).slice(0, getIndex(state.pdvs, pdv, 'pdv')),
        { ...pdv, expanded: !pdv.expanded },
        ...closePannels(state.pdvs).slice(getIndex(state.pdvs, pdv, 'pdv') + 1, state.pdvs.length),
      ],
    }),
    [PESQUISAR_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [PESQUISAR_FULFILLED]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      pdvs: payload,
    }),
    [PESQUISAR_REJECTED]: state => ({
      ...state,
      pdvs: [],
      isFetching: false,
    }),
  },
  initialState,
);
