import { takeLatest, put } from 'redux-saga/effects';
import { isRequestOK } from 'utils/helpers';
import {
  canaisSeguroRequest,
  canaisSeguroFulfilled,
  canaisSeguroRejected,
} from 'modules/canais/seguro/actions';
import { showModal } from 'modules/ui/modal/actions';
import endpoints, { api } from './endpoints';

function* canaisSeguroRequestSaga() {
  try {
    const { status, data } = yield api.get({
      url: endpoints.canaisSeguro(),
    });

    return yield isRequestOK(status)
      ? put(canaisSeguroFulfilled(data))
      : put(canaisSeguroRejected());
  } catch (responseWithError) {
    yield put(
      showModal({
        show: true,
        message: responseWithError?.response?.data.message,
        details: responseWithError?.response?.data?.details,
        title: 'ATENÇÃO',
        alert: responseWithError?.response?.status <= 499,
      }),
    );
    return yield put(canaisSeguroRejected(responseWithError));
  }
}

export default [takeLatest(canaisSeguroRequest, canaisSeguroRequestSaga)];
