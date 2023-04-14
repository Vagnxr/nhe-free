interface PesquisaForm {
  pdv: string;
  canal: string;
  analiseDocumento: string;
}

type RequestParams = { pdv: string } | { canal: string; analiseDocumento: boolean };

enum MensagemErro {
  SEM_CANAL_OU_PDV = 'Preencha o código do ponto de venda ou canal para realizar a pesquisa',
  SEM_ANALISE_DOCUMENTO = 'Na pesquisa por canal, selecione também se deseja consultar os PDVs ligados ou desligados',
}

export const isPesquisaPorPDV = (pdv: string): boolean => pdv.length > 0;

export const isPesquisaValida = ({ pdv, canal, analiseDocumento }: PesquisaForm): boolean =>
  pdv.length > 0 || (canal !== 'SELECIONE' && analiseDocumento.length > 0);

export const getErrorMessage = ({ pdv, canal }: PesquisaForm): MensagemErro =>
  pdv.length === 0 && canal === 'SELECIONE'
    ? MensagemErro.SEM_CANAL_OU_PDV
    : MensagemErro.SEM_ANALISE_DOCUMENTO;

export const filtroRequest = ({ pdv, canal, analiseDocumento }: PesquisaForm): RequestParams =>
  isPesquisaPorPDV(pdv) ? { pdv } : { canal, analiseDocumento: analiseDocumento === 'LIGADO' };
