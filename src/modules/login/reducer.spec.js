import reducer, { initialState } from './reducer';
import types from './constants';

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_REQUEST', () => {
    expect(reducer(initialState, { type: types.LOGIN_REQUEST })).toEqual({
      isFetching: true,
      authorized: false,
      token: '',
      username: '',
    });
  });

  it('should handle LOGIN_FULFILLED', () => {
    expect(
      reducer(initialState, {
        type: types.LOGIN_FULFILLED,
        payload: {
          authorized: true,
          username: 'Fernando Pessoa',
          token: 'QWEWQEWQEWQEQWEQDASASDA',
        },
      }),
    ).toEqual({
      isFetching: false,
      authorized: true,
      token: 'QWEWQEWQEWQEQWEQDASASDA',
      username: 'Fernando Pessoa',
    });
  });

  it('should handle LOGIN_REJECTED', () => {
    expect(
      reducer(initialState, {
        type: types.LOGIN_REJECTED,
        payload: {},
      }),
    ).toEqual({
      isFetching: false,
      authorized: false,
      token: '',
      username: '',
    });
  });
});
