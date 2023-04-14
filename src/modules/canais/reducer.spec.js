import reducer, { initialState } from './reducer';
import types from './constants';

describe('canais reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CANAIS_REQUEST', () => {
    expect(reducer(initialState, { type: types.CANAIS_REQUEST })).toEqual({
      isFetching: true,
      canaisDisponiveis: [],
    });
  });

  it('should handle CANAIS_FULFILLED', () => {
    expect(
      reducer(initialState, {
        type: types.CANAIS_FULFILLED,
        payload: [
          { canalId: 'agente_autorizado', canal: 'Agente Autorizado' },
          { canalId: 'loja_propria', canal: 'Loja Propria' },
          { canalId: 'varejo', canal: 'Varejo' },
        ],
      }),
    ).toEqual({
      isFetching: false,
      canaisDisponiveis: [
        { canalId: 'agente_autorizado', canal: 'Agente Autorizado' },
        { canalId: 'loja_propria', canal: 'Loja Propria' },
        { canalId: 'varejo', canal: 'Varejo' },
      ],
    });
  });

  it('should handle CANAIS_REJECTED', () => {
    expect(
      reducer(initialState, {
        type: types.CANAIS_REJECTED,
        payload: {},
      }),
    ).toEqual({
      isFetching: false,
      canaisDisponiveis: [],
    });
  });
});
