import reducer, { initialState } from './reducer';
import types from './constants';

describe('historico reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle PESQUISAR_PDV_REQUEST', () => {
    expect(reducer(initialState, { type: types.PESQUISAR_PDV_REQUEST })).toEqual({
      isFetching: true,
      historico: [],
    });
  });

  it('should handle PESQUISAR_PDV_FULFILLED', () => {
    expect(
      reducer(initialState, {
        type: types.PESQUISAR_PDV_FULFILLED,
        payload: [
          {
            status: 'agendado',
            canal: 'AGENTE AUTORIZADO',
            dataInicio: '01/09/2019',
            analiseDocumento: true,
            dataConfiguracao: '25/07/2019 - 15:32',
            operador: 'MARCIO GONCALVES',
            codigoOperador: '67890',
            historico: false,
            mensagem: '',
          },
          {
            status: 'cancelado',
            canal: 'AGENTE AUTORIZADO',
            dataInicio: '01/09/2019',
            analiseDocumento: false,
            dataConfiguracao: '24/06/2019 - 08:47',
            operador: 'MARCIO GONCALVES',
            codigoOperador: '67890',
            historico: false,
            mensagem:
              'Configuração cancelada devido a existência de outra configuração mais recente para a mesma data de início.',
          },
        ],
      }),
    ).toEqual({
      isFetching: false,
      historico: [
        {
          status: 'agendado',
          canal: 'AGENTE AUTORIZADO',
          dataInicio: '01/09/2019',
          analiseDocumento: true,
          dataConfiguracao: '25/07/2019 - 15:32',
          operador: 'MARCIO GONCALVES',
          codigoOperador: '67890',
          historico: false,
          mensagem: '',
        },
        {
          status: 'cancelado',
          canal: 'AGENTE AUTORIZADO',
          dataInicio: '01/09/2019',
          analiseDocumento: false,
          dataConfiguracao: '24/06/2019 - 08:47',
          operador: 'MARCIO GONCALVES',
          codigoOperador: '67890',
          historico: false,
          mensagem:
            'Configuração cancelada devido a existência de outra configuração mais recente para a mesma data de início.',
        },
      ],
    });
  });

  it('should handle PESQUISAR_PDV_REJECTED', () => {
    expect(
      reducer(initialState, {
        type: types.PESQUISAR_PDV_REJECTED,
        payload: {},
      }),
    ).toEqual({
      isFetching: false,
      historico: [],
    });
  });
});
