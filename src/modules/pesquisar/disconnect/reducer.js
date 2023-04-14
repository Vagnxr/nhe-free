import { handleActions } from 'redux-actions';
import constants from './constants';

const {
  UPDATE_PESQUISA_DISCONNECT,
  PESQUISAR_DISCONNECT_REQUEST,
  PESQUISAR_DISCONNECT_FULFILLED,
  PESQUISAR_DISCONNECT_REJECTED,
} = constants;

export const initialState = {
  isFetching: false,
  loginUsuario: '',
  dataInicial: null,
  dataFinal: null,
  impedidoBusca: '',
  loginsUsuarios: [],
};

export default handleActions(
  {
    [UPDATE_PESQUISA_DISCONNECT]: (state, { payload: { field, value } }) => ({
      ...state,
      [field]: value,
    }),
    [PESQUISAR_DISCONNECT_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [PESQUISAR_DISCONNECT_FULFILLED]: (state, { payload }) => ({
      ...state,
      isFetching: false,
      loginsUsuarios: payload,
    }),
    [PESQUISAR_DISCONNECT_REJECTED]: state => ({
      ...state,
      loginsUsuarios: [],
      isFetching: false,
    }),
  },
  initialState,
);
