import reducer, { initialState } from './reducer';
import types from './constants';

describe('canais reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CANAIS_SEGURO_REQUEST', () => {
    expect(reducer(initialState, { type: types.CANAIS_SEGURO_REQUEST })).toEqual({
      isFetching: true,
      canaisSeguroDisponiveis: [],
    });
  });

  it('should handle CANAIS_SEGURO_FULFILLED', () => {
    expect(
      reducer(initialState, {
        type: types.CANAIS_SEGURO_FULFILLED,
        payload: [{ canalId: 'agente_autorizado', canal: 'Agente Autorizado' }],
      }),
    ).toEqual({
      isFetching: false,
      canaisSeguroDisponiveis: [{ canalId: 'agente_autorizado', canal: 'Agente Autorizado' }],
    });
  });

  it('should handle CANAIS_SEGURO_REJECTED', () => {
    expect(
      reducer(initialState, {
        type: types.CANAIS_SEGURO_REJECTED,
        payload: {},
      }),
    ).toEqual({
      isFetching: false,
      canaisSeguroDisponiveis: [],
    });
  });
});
