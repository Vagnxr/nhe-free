import { takeLatest, put, all } from 'redux-saga/effects';
import { isRequestOK } from 'utils/helpers';
import {
  validateRequest,
  validateFulfilled,
  validateRejected,
  saveRequest,
  saveFulfilled,
  saveRejected,
} from 'modules/config/actions';
import { showLoader, hideLoader } from 'modules/ui/loader/actions';
import { showModal } from 'modules/ui/modal/actions';
import { showCopy } from 'modules/ui/copy/actions';
import { showModalConfirmation } from 'modules/ui/confirmationModal/actions';
import endpoints, { api } from './endpoints';
import { isValidPDV, isValidPDVs } from 'utils/utils.ts';

function* validateRequestSaga({
  payload: {
    values: { canal, pontosDeVenda },
  },
}) {
  // 'pontosDeVenda' here is always assured to be a string
  if (!isValidPDV(pontosDeVenda)) {
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
      params: { canal: canal, pdv: pontosDeVenda },
    });
    yield put(hideLoader());

    return yield isRequestOK(status) && data.valid
      ? all([
          put(validateFulfilled()),
          put(
            showModalConfirmation({
              show: true,
              description: data.message,
            }),
          ),
        ])
      : all([
          put(validateRejected()),
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
        message:
          responseWithError &&
          responseWithError.response &&
          responseWithError.response.data &&
          responseWithError.response.data.message,
        details:
          responseWithError &&
          responseWithError.response &&
          responseWithError.response.data &&
          responseWithError.response.data.details,
        title: 'ATENÇÃO',
        alert:
          responseWithError &&
          responseWithError.response &&
          responseWithError.response.status <= 499,
      }),
    );
    return yield put(validateRejected(responseWithError));
  }
}

function* saveRequestSaga({
  payload: {
    values: { canal, pontosDeVenda, data: dataInicio, status: analiseDocumento },
  },
}) {
  const pontosDeVendas = pontosDeVenda.split('\n');
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
        dataInicio: dataInicio.format('YYYY-MM-DD'),
        analiseDocumento: analiseDocumento === 'LIGADO',
      },
    });
    yield put(hideLoader());

    return yield isRequestOK(status)
      ? data.statusIgnored === 'ALL' || data.statusIgnored === 'PARTIAL'
        ? all([
            put(saveFulfilled()),
            put(
              showCopy({
                show: true,
                message: data.message,
                pdvs: data.codigosPontoVenda,
              }),
            ),
          ])
        : all([
            put(saveFulfilled()),
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
      : put(saveRejected());
  } catch (responseWithError) {
    yield put(hideLoader());
    yield put(
      showModal({
        show: true,
        message:
          responseWithError &&
          responseWithError.response &&
          responseWithError.response.data &&
          responseWithError.response.data.message,
        details:
          responseWithError &&
          responseWithError.response &&
          responseWithError.response.data &&
          responseWithError.response.data.details,
        title: 'ATENÇÃO',
        alert:
          responseWithError &&
          responseWithError.response &&
          responseWithError.response.status <= 499,
      }),
    );
    return yield put(saveRejected(responseWithError));
  }
}

export default [
  takeLatest(validateRequest, validateRequestSaga),
  takeLatest(saveRequest, saveRequestSaga),
];
