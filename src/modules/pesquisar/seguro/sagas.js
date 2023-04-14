/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import { takeLatest, put, select, all } from 'redux-saga/effects';
import { isRequestOK } from 'utils/helpers';
import { isValidPDV } from 'utils/utils.ts';
import {
  pesquisarSeguroRequest,
  pesquisarSeguroFulfilled,
  pesquisarSeguroRejected,
} from 'modules/pesquisar/seguro/actions';
import { showModal } from 'modules/ui/modal/actions';
import { showLoader, hideLoader } from 'modules/ui/loader/actions';

import endpoints, { api } from './endpoints';
import {
  isPesquisaValida,
  getErrorMessage,
  filtroRequest,
  isPesquisaPorPDV,
  setMessagePDVSearch,
} from './helper.tsx';

function* pesquisarSeguroRequestSaga() {
  const { pdv, canal, seguroMovel } = yield select(store => store.pesquisarSeguro);
  if (!isPesquisaValida({ pdv, canal, seguroMovel })) {
    return yield put(
      showModal({
        show: true,
        message: getErrorMessage({ pdv, canal }),
        details: '',
        title: 'ATENÇÃO',
        alert: true,
        sucesso: false,
      }),
    );
  }
  if (!isValidPDV(pdv)) {
    return yield put(
      showModal({
        show: true,
        message:
          'O código do ponto de venda deve ser inserido somente com letras maiúsculas e números.',
        details: '',
        title: 'ATENÇÃO',
        alert: true,
        sucesso: false,
      }),
    );
  }
  yield put(showLoader());
  try {
    const { status, data } = yield api.get({
      url: endpoints[isPesquisaPorPDV(pdv) ? 'pesquisarPorPDV' : 'pesquisarPorCanal'](),
      params: filtroRequest({ pdv, canal, seguroMovel }),
    });
    yield put(hideLoader());

    return yield isRequestOK(status) && data?.pdvs.length > 0
      ? data.message
        ? all([
            put(
              pesquisarSeguroFulfilled(
                setMessagePDVSearch(data.pdvs, isPesquisaPorPDV(pdv), data.message),
              ),
            ),
            put(
              showModal({
                show: true,
                message: data.message,
                details: '',
                title: 'ATENÇÃO',
                alert: true,
                sucesso: false,
              }),
            ),
          ])
        : put(
            pesquisarSeguroFulfilled(
              setMessagePDVSearch(data.pdvs, isPesquisaPorPDV(pdv), data.message),
            ),
          )
      : all([
          put(pesquisarSeguroRejected()),
          put(
            showModal({
              show: true,
              message: data.message || 'Nenhum resultado encontrado',
              details: '',
              title: 'ATENÇÃO',
              alert: true,
              sucesso: false,
            }),
          ),
        ]);
  } catch (responseWithError) {
    yield put(hideLoader());
    yield put(
      showModal({
        show: true,
        message: responseWithError?.response?.data?.message,
        details: responseWithError?.response?.data?.details,
        title: 'ATENÇÃO',
        alert: responseWithError?.response?.status <= 499,
        sucesso: false,
      }),
    );
    return yield put(pesquisarSeguroRejected(responseWithError));
  }
}

export default [takeLatest(pesquisarSeguroRequest, pesquisarSeguroRequestSaga)];
