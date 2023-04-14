import { createAction } from 'redux-actions';
import constants from './constants';

const {
  UPDATE_PESQUISA,
  PESQUISAR_REQUEST,
  PESQUISAR_FULFILLED,
  PESQUISAR_REJECTED,
  EXPAND_PANNEL,
} = constants;

export const pesquisarRequest = createAction(PESQUISAR_REQUEST);
export const pesquisarFulfilled = createAction(PESQUISAR_FULFILLED);
export const pesquisarRejected = createAction(PESQUISAR_REJECTED);
export const updatePesquisa = createAction(UPDATE_PESQUISA);
export const expandPannel = createAction(EXPAND_PANNEL);
