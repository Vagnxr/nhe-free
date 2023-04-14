const util = require('util');

const setTimeoutPromise = util.promisify(setTimeout);

/* Didn't find how to implement delay to middleware
  request and didn't want to lose time doing something better
*/

module.exports = (req, res, next) => {
  setTimeoutPromise(4000).then(() => {
    if (req.method === 'POST' && req.path === '/security/login') {
      if (req.body.username === 'victor' && req.body.password === '123456') {
        res.status(200).json({
          authorized: true,
          token: 'ABCSWRWQEEQEWQEWQEDC ASQWIJEIJOQWJIEQ',
          name: 'Victor Feitosa',
          'indicador-perfil-derrubar-sessao': true,
        });
      } else {
        res.status(401).json({
          message: `[${req.body.username}] NÃO ENCONTRADO`,
          details:
            'Verifique se o código de identificação do usuário informado está correto e se o mesmo se encontra cadastrado',
        });
      }
    }
    if (req.method === 'POST' && req.path === '/configuracoes') {
      if (req.body.canal === 'loja_propria') {
        res.status(450).json({
          message:
            'Os códigos dos pontos de vendas listados a seguir, já encontram-se com a análise de documento ligada. Verifique se as informações inseridas para a configuração estão corretas',
          pdvs: 'TQRWEFS, MDHERAN, JBGEBDJA, SJKJTHJEJ',
        });
      } else {
        res.status(200).json({});
      }
    }
    if (req.method === 'POST' && req.path === '/security/desconectar/validar') {
      res.status(200).json({
        message: 'Tudo inválido',
        loginsUsuarios: 'L011Q, OSNHH, CA4K2',
        valid: false,
      });
    }
    if (req.method === 'POST' && req.path === '/security/desconectar/efetivar') {
      res.status(200).json({
        message: 'Tudo inválido',
        loginsUsuarios: 'L011Q, OSNHH, CA4K2',
        valid: false,
      });
    }

    next();
  });
};
