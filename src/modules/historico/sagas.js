import { takeLatest, put } from 'redux-saga/effects';
import { isRequestOK } from 'utils/helpers';
import {
  pesquisarPdvRequest,
  pesquisarPdvFulfilled,
  pesquisarPdvRejected,
} from 'modules/historico/actions';
import { showModal } from 'modules/ui/modal/actions';
import endpoints, { api } from './endpoints';

function* pesquisarPdvRequestSaga({ payload: { pdv } }) {
  try {
    const { status, data } = yield api.get({
      url: endpoints.historico(),
      params: { pdv },
    });

    return yield isRequestOK(status)
      ? put(pesquisarPdvFulfilled(data))
      : put(pesquisarPdvRejected());
  } catch (responseWithError) {
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
    return yield put(pesquisarPdvRejected(responseWithError));
  }
}

export default [takeLatest(pesquisarPdvRequest, pesquisarPdvRequestSaga)];
