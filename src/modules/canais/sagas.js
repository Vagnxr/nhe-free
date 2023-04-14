import { takeLatest, put } from 'redux-saga/effects';
import { isRequestOK } from 'utils/helpers';
import { canaisRequest, canaisFulfilled, canaisRejected } from 'modules/canais/actions';
import { showModal } from 'modules/ui/modal/actions';
import endpoints, { api } from './endpoints';

function* canaisRequestSaga() {
  try {
    const { status, data } = yield api.get({
      url: endpoints.canais(),
    });

    return yield isRequestOK(status) ? put(canaisFulfilled(data)) : put(canaisRejected());
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
    return yield put(canaisRejected(responseWithError));
  }
}

export default [takeLatest(canaisRequest, canaisRequestSaga)];
