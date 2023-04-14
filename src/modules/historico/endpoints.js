import Apis from 'apis';

export const api = Apis({ baseURL: process.env.REACT_APP_FRAUD_URL });

export default {
  historico: () => '/configuracoes/history',
};
