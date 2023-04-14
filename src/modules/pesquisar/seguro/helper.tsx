interface PesquisaForm {
  pdv: string;
  canal: string;
  seguroMovel: string;
}

interface ItemPDV {
  pdv: string;
  canal: string;
  seguroMovel: boolean;
  dataConfiguracao: string;
  operador: string;
  message: string;
}

type RequestParams = { pdv: string } | { canal: string; seguroMovel: boolean };

enum MensagemErro {
  SEM_CANAL_OU_PDV = 'Preencha o código do ponto de venda ou canal para realizar a pesquisa',
  SEM_ANALISE_DOCUMENTO = 'Na pesquisa por canal, selecione também se deseja consultar os PDVs ligados ou desligados',
}

export const isPesquisaPorPDV = (pdv: string): boolean => pdv.length > 0;

export const isPesquisaValida = ({ pdv, canal, seguroMovel }: PesquisaForm): boolean =>
  pdv.length > 0 || (canal !== 'SELECIONE' && seguroMovel.length > 0);

export const getErrorMessage = ({ pdv, canal }: PesquisaForm): MensagemErro =>
  pdv.length === 0 && canal === 'SELECIONE'
    ? MensagemErro.SEM_CANAL_OU_PDV
    : MensagemErro.SEM_ANALISE_DOCUMENTO;

export const filtroRequest = ({ pdv, canal, seguroMovel }: PesquisaForm): RequestParams =>
  isPesquisaPorPDV(pdv) ? { pdv } : { canal, seguroMovel: seguroMovel === 'LIGADO' };

export const setMessagePDVSearch = (
  pdvs: ItemPDV[],
  isPDVSearch: boolean,
  message: string,
): ItemPDV[] => {
  if (isPDVSearch) {
    const pdvsWithMessage = pdvs.map(pdv => ({
      ...pdv,
      message,
      status: message ? 'INVALIDO' : 'VALIDO',
    }));
    return pdvsWithMessage;
  }
  return pdvs;
};
