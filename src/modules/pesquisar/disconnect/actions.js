import { createAction } from 'redux-actions';
import constants from './constants';

const {
  UPDATE_PESQUISA_DISCONNECT,
  PESQUISAR_DISCONNECT_REQUEST,
  PESQUISAR_DISCONNECT_FULFILLED,
  PESQUISAR_DISCONNECT_REJECTED,
} = constants;

export const pesquisarSeguroRequest = createAction(PESQUISAR_DISCONNECT_REQUEST);
export const pesquisarSeguroFulfilled = createAction(PESQUISAR_DISCONNECT_FULFILLED);
export const pesquisarSeguroRejected = createAction(PESQUISAR_DISCONNECT_REJECTED);
export const updatePesquisaDisconnect = createAction(UPDATE_PESQUISA_DISCONNECT);
