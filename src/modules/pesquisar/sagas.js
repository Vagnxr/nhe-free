/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import { takeLatest, put, select, all } from 'redux-saga/effects';
import { isRequestOK } from 'utils/helpers';
import { isValidPDV } from 'utils/utils.ts';
import { pesquisarRequest, pesquisarFulfilled, pesquisarRejected } from 'modules/pesquisar/actions';
import { pesquisarPdvRequest, limparHistorico } from 'modules/historico/actions';
import { showModal } from 'modules/ui/modal/actions';
import { showLoader, hideLoader } from 'modules/ui/loader/actions';

import endpoints, { api } from './endpoints';
import { isPesquisaValida, getErrorMessage, filtroRequest, isPesquisaPorPDV } from './helper.tsx';

function* pesquisarRequestSaga() {
  const { pdv, canal, analiseDocumento } = yield select(store => store.pesquisar);
  if (!isPesquisaValida({ pdv, canal, analiseDocumento })) {
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
  yield put(limparHistorico());
  try {
    const { status, data } = yield api.get({
      url: endpoints[isPesquisaPorPDV(pdv) ? 'pesquisarPorPDV' : 'pesquisarPorCanal'](),
      params: filtroRequest({ pdv, canal, analiseDocumento }),
    });
    yield put(hideLoader());
    if (isRequestOK(status) && data && data.pdvs.length === 1) {
      // Se a resposta tiver apenas um PDV, devemos buscar o histórico deste pdv
      yield put(pesquisarPdvRequest({ pdv: data.pdvs[0].pdv }));
    }

    // O componente de PDV deve vir expandido caso só tenha um PDV na resposta
    return yield isRequestOK(status) && data && data.pdvs.length > 0
      ? data.message
        ? all([
            put(
              pesquisarFulfilled(
                data.pdvs.map(pdv => ({ ...pdv, expanded: data.pdvs.length === 1 })),
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
            pesquisarFulfilled(
              data.pdvs.map(pdv => ({ ...pdv, expanded: data.pdvs.length === 1 })),
            ),
          )
      : all([
          put(pesquisarRejected()),
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
        sucesso: false,
      }),
    );
    return yield put(pesquisarRejected(responseWithError));
  }
}

export default [takeLatest(pesquisarRequest, pesquisarRequestSaga)];
