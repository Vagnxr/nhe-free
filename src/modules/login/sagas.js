import { takeLatest, put } from 'redux-saga/effects';
import { isRequestOK } from 'utils/helpers';
import { loginRequest, loginFulfilled, loginRejected } from 'modules/login/actions';
import { showLoader, hideLoader } from 'modules/ui/loader/actions';
import { showModal } from 'modules/ui/modal/actions';
import endpoints, { api } from './endpoints';

function* loginRequestSaga({ payload: { username, password } }) {
  yield put(showLoader());
  try {
    const { status, data } = yield api.post({
      url: endpoints.login(),
      data: { username, password },
    });
    yield put(hideLoader());

    return yield isRequestOK(status) ? put(loginFulfilled(data)) : put(loginRejected());
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
    return yield put(loginRejected(responseWithError));
  }
}

export default [takeLatest(loginRequest, loginRequestSaga)];
