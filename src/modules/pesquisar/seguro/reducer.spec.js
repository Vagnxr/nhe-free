import reducer, { initialState } from './reducer';
import types from './constants';

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle EXPAND_PANNEL with only one pdv', () => {
    expect(
      reducer(initialState, {
        type: types.EXPAND_PANNEL,
        payload: {
          pdv: {
            pdv: 'X61K',
            expanded: false,
            analiseDocumento: false,
          },
        },
      }),
    ).toEqual({
      isFetching: false,
      pdv: '',
      canal: 'SELECIONE',
      analiseDocumento: '',
      impedidoBuscaCanal: false,
      pdvs: [{ pdv: 'X61K', expanded: true, analiseDocumento: false }],
    });
  });

  it('should handle EXPAND_PANNEL with multiples pdvs', () => {
    expect(
      reducer(
        {
          isFetching: false,
          pdv: '',
          canal: 'SELECIONE',
          analiseDocumento: '',
          impedidoBuscaCanal: false,
          pdvs: [
            { pdv: 'X61K', expanded: false, analiseDocumento: false },
            { pdv: 'X62K', expanded: false, analiseDocumento: false },
            { pdv: 'X63K', expanded: false, analiseDocumento: false },
          ],
        },
        {
          type: types.EXPAND_PANNEL,
          payload: {
            pdv: {
              pdv: 'X61K',
              expanded: false,
              analiseDocumento: false,
            },
          },
        },
      ),
    ).toEqual({
      isFetching: false,
      pdv: '',
      canal: 'SELECIONE',
      analiseDocumento: '',
      impedidoBuscaCanal: false,
      pdvs: [
        { pdv: 'X61K', expanded: true, analiseDocumento: false },
        { pdv: 'X62K', expanded: false, analiseDocumento: false },
        { pdv: 'X63K', expanded: false, analiseDocumento: false },
      ],
    });
  });

  it('should handle EXPAND_PANNEL when changing last pdv', () => {
    expect(
      reducer(
        {
          isFetching: false,
          pdv: '',
          canal: 'SELECIONE',
          analiseDocumento: '',
          impedidoBuscaCanal: false,
          pdvs: [
            { pdv: 'X61K', expanded: false, analiseDocumento: false },
            { pdv: 'X62K', expanded: false, analiseDocumento: false },
            { pdv: 'X63K', expanded: false, analiseDocumento: false },
          ],
        },
        {
          type: types.EXPAND_PANNEL,
          payload: {
            pdv: {
              pdv: 'X63K',
              expanded: false,
              analiseDocumento: false,
            },
          },
        },
      ),
    ).toEqual({
      isFetching: false,
      pdv: '',
      canal: 'SELECIONE',
      analiseDocumento: '',
      impedidoBuscaCanal: false,
      pdvs: [
        { pdv: 'X61K', expanded: false, analiseDocumento: false },
        { pdv: 'X62K', expanded: false, analiseDocumento: false },
        { pdv: 'X63K', expanded: true, analiseDocumento: false },
      ],
    });
  });

  it('should handle EXPAND_PANNEL when there is one open pannel', () => {
    expect(
      reducer(
        {
          isFetching: false,
          pdv: '',
          canal: 'SELECIONE',
          analiseDocumento: '',
          impedidoBuscaCanal: false,
          pdvs: [
            { pdv: 'X61K', expanded: false, analiseDocumento: false },
            { pdv: 'X62K', expanded: true, analiseDocumento: false },
            { pdv: 'X63K', expanded: false, analiseDocumento: false },
          ],
        },
        {
          type: types.EXPAND_PANNEL,
          payload: {
            pdv: {
              pdv: 'X61K',
              expanded: false,
              analiseDocumento: false,
            },
          },
        },
      ),
    ).toEqual({
      isFetching: false,
      pdv: '',
      canal: 'SELECIONE',
      analiseDocumento: '',
      impedidoBuscaCanal: false,
      pdvs: [
        { pdv: 'X61K', expanded: true, analiseDocumento: false },
        { pdv: 'X62K', expanded: false, analiseDocumento: false },
        { pdv: 'X63K', expanded: false, analiseDocumento: false },
      ],
    });
  });
});
