const util = require('util');

const setTimeoutPromise = util.promisify(setTimeout);

const successResponse = [
  { pdv: 'X60K', analiseDocumento: true },
  { pdv: 'X61K', analiseDocumento: true },
  { pdv: 'K801C', analiseDocumento: false },
];

/* Didn't find how to implement delay to middleware
  request and didn't want to lose time doing something better
*/

module.exports = (req, res, next) => {
  setTimeoutPromise(2000)
    .then(() => {
      if (req.method === 'GET' && req.path === '/configuracoes/search/pdv') {
        if (req.params.pdv === 'X60K' || req.params.canal === 'loja_propria') {
          res.status(200).json([]);
        } else {
          res.status(200).json({ pdvs: successResponse });
        }
      }
      if (req.method === 'GET' && req.path === '/configuracoes/history') {
        res.status(200).json([
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
          {
            status: 'agendado',
            canal: 'AGENTE AUTORIZADO',
            dataInicio: '22/08/2019',
            analiseDocumento: false,
            dataConfiguracao: '04/06/2019 - 09:44',
            operador: 'MARCIO GONCALVES',
            codigoOperador: '67890',
            historico: false,
            mensagem: '',
          },
          {
            status: 'vigente',
            canal: 'AGENTE AUTORIZADO',
            dataInicio: '01/08/2019',
            analiseDocumento: true,
            dataConfiguracao: '01/06/2019 - 10:23',
            operador: 'MARCIO GONCALVES',
            codigoOperador: '67890',
            historico: false,
            mensagem: '',
          },
          {
            status: 'VIGENTE',
            canal: 'AGENTE AUTORIZADO',
            dataInicio: '23/07/2019',
            analiseDocumento: false,
            dataConfiguracao: '20/06/2019 - 10:02',
            operador: 'MARCIO GONCALVES',
            codigoOperador: '67890',
            historico: true,
            mensagem: '',
          },
          {
            status: 'DIVERGENTE',
            canal: 'AGENTE AUTORIZADO',
            dataInicio: '23/06/2019',
            analiseDocumento: true,
            dataConfiguracao: '19/06/2019 - 10:03',
            operador: 'MARCIO GONCALVES',
            codigoOperador: '67890',
            historico: false,
            mensagem: 'O H601 -LOJA DE MANAUS pertence ao canal LOJA PRÓPRIA',
          },
        ]);
      }
      next();
    })
    .catch(() => {});
};
