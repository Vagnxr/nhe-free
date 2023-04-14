import { takeLatest, put, all } from 'redux-saga/effects';
import { isRequestOK } from 'utils/helpers';
import {
  validateSeguroRequest,
  validateSeguroFulfilled,
  validateSeguroRejected,
  saveSeguroRequest,
  saveSeguroFulfilled,
  saveSeguroRejected,
} from 'modules/config/seguro/actions';
import { showLoader, hideLoader } from 'modules/ui/loader/actions';
import { showModal } from 'modules/ui/modal/actions';
import { showCopy } from 'modules/ui/copy/actions';
import { showModalConfirmation } from 'modules/ui/confirmationModal/actions';
import endpoints, { api } from './endpoints';
import { isValidPDV, isValidPDVs } from 'utils/utils.ts';
import moment from 'moment';

function* validateSeguroRequestSaga({
  payload: {
    values: { canal, pontosDeVenda },
  },
}) {
  const upperPontosDeVenda = pontosDeVenda?.toUpperCase();
  // 'pontosDeVenda' here is always assured to be a string
  if (!isValidPDV(upperPontosDeVenda)) {
    return yield put(
      showModal({
        show: true,
        alert: true,
        sucesso: false,
        title: 'ATENÇÃO',
        details: '',
        message:
          'Os códigos dos pontos de vendas devem ser inseridos somente com letras maiscúlas, números e separados por quebra de linha',
      }),
    );
  }
  yield put(showLoader());
  try {
    const { status, data } = yield api.get({
      url: endpoints.validate(),
      params: { canal: canal, pdv: upperPontosDeVenda },
    });
    yield put(hideLoader());

    return yield isRequestOK(status) && data.valid
      ? all([
          put(validateSeguroFulfilled()),
          put(
            showModalConfirmation({
              show: true,
              description: data.message,
              seguro: true,
            }),
          ),
        ])
      : all([
          put(validateSeguroRejected()),
          put(
            showModal({
              show: true,
              message: data.message,
              title: 'ATENÇÃO',
              alert: true,
              details: '',
              sucesso: false,
            }),
          ),
        ]);
  } catch (responseWithError) {
    yield put(hideLoader());
    yield put(
      showModal({
        show: true,
        sucesso: false,
        message: responseWithError?.response?.data?.message,
        details: responseWithError?.response?.data?.details,
        title: 'ATENÇÃO',
        alert: responseWithError?.response?.status <= 499,
      }),
    );
    return yield put(validateSeguroRejected(responseWithError));
  }
}

function* saveSeguroRequestSaga({
  payload: {
    values: { canal, pontosDeVenda, status: seguroMovel },
  },
}) {
  const pontosDeVendas = pontosDeVenda.toUpperCase().split('\n');
  if (!isValidPDVs(pontosDeVendas)) {
    return yield put(
      showModal({
        show: true,
        alert: true,
        sucesso: false,
        title: 'ATENÇÃO',
        details: '',
        message:
          'Os códigos dos pontos de vendas devem ser inseridos somente com letras maiscúlas, números e separados por quebra de linha',
      }),
    );
  }
  yield put(showLoader());
  try {
    const { status, data } = yield api.post({
      url: endpoints.config(),
      data: {
        canal,
        codigosPontoVenda: pontosDeVendas,
        dataInicio: moment().format('YYYY-MM-DD'),
        seguroMovel: seguroMovel === 'LIGADO',
      },
    });
    yield put(hideLoader());

    return yield isRequestOK(status)
      ? data.statusIgnored === 'ALL' || data.statusIgnored === 'PARTIAL'
        ? all([
            put(saveSeguroFulfilled()),
            put(
              showCopy({
                show: true,
                message: data.message,
                pdvs: data.codigosPontoVenda,
              }),
            ),
          ])
        : all([
            put(saveSeguroFulfilled()),
            put(
              showModal({
                show: true,
                message: data.message,
                details: '',
                alert: false,
                sucesso: true,
                title: 'SUCESSO',
              }),
            ),
          ])
      : put(saveSeguroRejected());
  } catch (responseWithError) {
    yield put(hideLoader());
    yield put(
      showModal({
        show: true,
        message: responseWithError?.response?.data?.message,
        details: responseWithError?.response?.data?.details,
        title: 'ATENÇÃO',
        alert: responseWithError?.response?.status <= 499,
      }),
    );
    return yield put(saveSeguroRejected(responseWithError));
  }
}

export default [
  takeLatest(validateSeguroRequest, validateSeguroRequestSaga),
  takeLatest(saveSeguroRequest, saveSeguroRequestSaga),
];
