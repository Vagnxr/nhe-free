/* eslint-disable import/prefer-default-export */
import iconCancelado from 'static/icons/icon_cancelado.svg';
import iconCheck from 'static/icons/icon_check.svg';
import iconCheckCinza from 'static/icons/icon_check_cinza.svg';
import iconAgendado from 'static/icons/icon_historico.svg';

import moment from 'moment';

export const escolherIcone = (status: string) => {
  if (status === 'CANCELADO' || status === 'DIVERGENTE') {
    return iconCancelado;
  }
  if (status === 'AGENDADO') {
    return iconAgendado;
  }
  return status === 'NAO_VIGENTE' ? iconCheckCinza : iconCheck;
};

export const escolherMensagem = (status: string) => {
  if (status === 'CANCELADO') {
    return 'Período Cancelado';
  }
  if (status === 'DIVERGENTE') {
    return 'Inválido';
  }
  if (status === 'VIGENTE') {
    return 'Período Vigente';
  }
  return status === 'AGENDADO' ? 'Agendado' : 'Período Não Vigente';
};

export const formatDate = (dateString: string) => moment(dateString).format('DD-MM-YYYY');

export const formatHour = (dateString: string) => moment(dateString).format('hh:mm');
