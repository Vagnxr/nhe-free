/* eslint-disable import/prefer-default-export */
import iconCancelado from 'static/icons/icon_cancelado.svg';
import iconCheck from 'static/icons/icon_check.svg';

export const escolherIcone = (status: string) => {
  if (status === 'INVALIDO') {
    return iconCancelado;
  }
  return iconCheck;
};

const addZero = (number: number):string => number?.toString()?.padStart(2, '0');

export const formatDate = (date: number[]) =>
  `${addZero(date[2])}/${addZero(date[1])}/${date[0]} - ${addZero(date[3])}:${addZero(date[4])}`;

export const canalText = (canal: string) => {
  const id = canal.toUpperCase();
  switch (id) {
    case 'AGENTE_AUTORIZADO':
      return 'Agente Autorizado';
    case 'LOJA_PROPRIA':
      return 'Loja Própria';
    case 'VAREJO_NACIONAL':
      return 'Varejo';
    default:
      return id;
  }
};
