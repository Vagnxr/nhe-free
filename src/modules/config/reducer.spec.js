import reducer, { initialState } from './reducer';
import types from './constants';

describe('config reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle VALIDATE_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: types.VALIDATE_REQUEST,
        payload: {
          values: {
            canal: 'loja_propria',
            pontosDeVenda: 'XTO6',
            data: '23/06/68',
            status: 'LIGADO',
          },
        },
      }),
    ).toEqual({
      isFetching: true,
      canal: 'loja_propria',
      pontosDeVenda: 'XTO6',
      data: '23/06/68',
      status: 'LIGADO',
      valid: false,
    });
  });

  it('should handle VALIDATE_FULFILLED', () => {
    expect(
      reducer(initialState, {
        type: types.VALIDATE_FULFILLED,
        payload: {},
      }),
    ).toEqual({
      isFetching: false,
      canal: '',
      pontosDeVenda: '',
      data: '',
      status: undefined,
      valid: false,
    });
  });

  it('should handle VALIDATE_REJECTED', () => {
    expect(
      reducer(initialState, {
        type: types.VALIDATE_REJECTED,
        payload: {},
      }),
    ).toEqual({
      isFetching: false,
      canal: '',
      pontosDeVenda: '',
      data: '',
      status: undefined,
      valid: false,
    });
  });

  it('should handle SAVE_REQUEST', () => {
    expect(
      reducer(
        {
          isFetching: false,
          canal: 'loja_propria',
          pontosDeVenda: 'XTO6',
          data: '23/06/68',
          status: 'LIGADO',
        },
        {
          type: types.SAVE_REQUEST,
          payload: {
            values: {
              canal: 'loja_propria',
              pontosDeVenda: 'XTO6',
              data: '23/06/68',
              status: 'LIGADO',
            },
          },
        },
      ),
    ).toEqual({
      isFetching: true,
      canal: 'loja_propria',
      pontosDeVenda: 'XTO6',
      data: '23/06/68',
      status: 'LIGADO',
    });
  });

  it('should handle SAVE_FULFILLED', () => {
    expect(
      reducer(
        {
          isFetching: true,
          canal: 'loja_propria',
          pontosDeVenda: 'XTO6',
          data: '23/06/68',
          status: 'LIGADO',
          valid: false,
        },
        {
          type: types.SAVE_FULFILLED,
          payload: {},
        },
      ),
    ).toEqual({
      isFetching: false,
      canal: 'loja_propria',
      pontosDeVenda: 'XTO6',
      data: '23/06/68',
      status: 'LIGADO',
      valid: true,
    });
  });

  it('should handle SAVE_REJECTED', () => {
    expect(
      reducer(
        {
          isFetching: true,
          canal: 'loja_propria',
          pontosDeVenda: 'XTO6',
          data: '23/06/68',
          status: 'LIGADO',
          valid: false,
        },
        {
          type: types.SAVE_REJECTED,
          payload: {},
        },
      ),
    ).toEqual({
      isFetching: false,
      canal: 'loja_propria',
      pontosDeVenda: 'XTO6',
      data: '23/06/68',
      status: 'LIGADO',
      valid: false,
    });
  });
});
