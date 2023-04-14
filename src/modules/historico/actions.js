import { createAction } from 'redux-actions';
import constants from './constants';

const {
  PESQUISAR_PDV_REQUEST,
  PESQUISAR_PDV_FULFILLED,
  PESQUISAR_PDV_REJECTED,
  LIMPAR_HISTORICO,
} = constants;

export const pesquisarPdvRequest = createAction(PESQUISAR_PDV_REQUEST);
export const pesquisarPdvFulfilled = createAction(PESQUISAR_PDV_FULFILLED);
export const pesquisarPdvRejected = createAction(PESQUISAR_PDV_REJECTED);
export const limparHistorico = createAction(LIMPAR_HISTORICO);
