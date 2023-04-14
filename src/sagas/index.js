import { all } from 'redux-saga/effects';
import { sagas } from 'modules';

export default function* rootSaga() {
  yield all([].concat.apply([], Object.values(sagas)));
}
