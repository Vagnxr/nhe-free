import { takeLatest, put, all } from 'redux-saga/effects';
import { isRequestOK } from 'utils/helpers';
import {
  validateDisconnectRequest,
  validateDisconnectFulfilled,
  validateDisconnectRejected,
  saveDisconnectRequest,
  saveDisconnectFulfilled,
  saveDisconnectRejected,
} from 'modules/config/disconnect/actions';
import { showLoader, hideLoader } from 'modules/ui/loader/actions';
import { showModal } from 'modules/ui/modal/actions';
import { showCopy } from 'modules/ui/copy/actions';
import { showModalConfirmation } from 'modules/ui/confirmationModal/actions';
import endpoints, { api } from './endpoints';
import { isValidPDVs } from 'utils/utils.ts';

function* validateDisconnectRequestSaga({
  payload: {
    values: { loginsUsuarios },
  },
}) {
  const upperLoginsUsuarios = loginsUsuarios?.toUpperCase()?.split('\n');
  // 'loginsUsuarios' here is always assured to be a string
  if (!isValidPDVs(upperLoginsUsuarios)) {
    return yield put(
      showModal({
        show: true,
        alert: true,
        sucesso: false,
        title: 'ATENÇÃO',
        details: '',
        message:
          'Os logins de usuários devem ser inseridos somente com letras maiúsculas, números e separados por quebra de linha',
      }),
    );
  }
  yield put(showLoader());
  try {
    const { status, data } = yield api.post({
      url: endpoints.validate(),
      data: { loginsUsuarios: upperLoginsUsuarios },
    });
    yield put(hideLoader());

    return yield isRequestOK(status) && data.valid
      ? all([
          put(validateDisconnectFulfilled()),
          put(
            showModalConfirmation({
              show: true,
              description: data.message,
              onConfirm: () => saveDisconnectRequest({ values: { loginsUsuarios } }),
              dataConfirm: { values: { loginsUsuarios } },
            }),
          ),
        ])
      : all([
          put(validateDisconnectRejected()),
          put(
            showCopy({
              show: true,
              message: data.message,
              pdvs: data.loginsUsuarios,
            }),
          ),
        ]);
    // popup com lista TO DO
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
    return yield put(validateDisconnectRejected(responseWithError));
  }
}

function* saveDisconnectRequestSaga({
  payload: {
    values: { loginsUsuarios },
  },
}) {
  const upperLoginsUsuarios = loginsUsuarios?.toUpperCase()?.split('\n');
  if (!isValidPDVs(upperLoginsUsuarios)) {
    return yield put(
      showModal({
        show: true,
        alert: true,
        sucesso: false,
        title: 'ATENÇÃO',
        details: '',
        message:
          'Os logins de usuários devem ser inseridos somente com letras maiúsculas, números e separados por quebra de linha',
      }),
    );
  }
  yield put(showLoader());
  try {
    const { status, data } = yield api.post({
      url: endpoints.config(),
      data: {
        loginsUsuarios: upperLoginsUsuarios,
      },
    });
    yield put(hideLoader());

    return yield isRequestOK(status)
      ? data.statusIgnored === 'ALL' || data.statusIgnored === 'PARTIAL'
        ? all([
            put(saveDisconnectFulfilled()),
            put(
              showCopy({
                show: true,
                message: data.message,
                pdvs: data.loginsUsuarios,
              }),
            ),
          ])
        : all([
            put(saveDisconnectFulfilled()),
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
      : put(saveDisconnectRejected());
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
    return yield put(saveDisconnectRejected(responseWithError));
  }
}

export default [
  takeLatest(validateDisconnectRequest, validateDisconnectRequestSaga),
  takeLatest(saveDisconnectRequest, saveDisconnectRequestSaga),
];
