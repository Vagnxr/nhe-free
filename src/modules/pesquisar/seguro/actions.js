import { createAction } from 'redux-actions';
import constants from './constants';

const {
  UPDATE_PESQUISA,
  PESQUISAR_SEGURO_REQUEST,
  PESQUISAR_SEGURO_FULFILLED,
  PESQUISAR_SEGURO_REJECTED,
} = constants;

export const pesquisarSeguroRequest = createAction(PESQUISAR_SEGURO_REQUEST);
export const pesquisarSeguroFulfilled = createAction(PESQUISAR_SEGURO_FULFILLED);
export const pesquisarSeguroRejected = createAction(PESQUISAR_SEGURO_REJECTED);
export const updatePesquisa = createAction(UPDATE_PESQUISA);
