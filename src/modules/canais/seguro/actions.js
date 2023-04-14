import { createAction } from 'redux-actions';
import constants from './constants';

const { CANAIS_SEGURO_REQUEST, CANAIS_SEGURO_FULFILLED, CANAIS_SEGURO_REJECTED } = constants;

export const canaisSeguroRequest = createAction(CANAIS_SEGURO_REQUEST);
export const canaisSeguroFulfilled = createAction(CANAIS_SEGURO_FULFILLED);
export const canaisSeguroRejected = createAction(CANAIS_SEGURO_REJECTED);
