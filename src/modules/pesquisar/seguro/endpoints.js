import Apis from 'apis';

export const api = Apis({ baseURL: process.env.REACT_APP_FRAUD_URL });

export default {
  pesquisarPorPDV: () => '/configuracoes/seguro/search/pdv',
  pesquisarPorCanal: () => '/configuracoes/seguro/search/canal',
};
