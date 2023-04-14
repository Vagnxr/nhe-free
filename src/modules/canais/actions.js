import { createAction } from 'redux-actions';
import constants from './constants';

const { CANAIS_REQUEST, CANAIS_FULFILLED, CANAIS_REJECTED } = constants;

export const canaisRequest = createAction(CANAIS_REQUEST);
export const canaisFulfilled = createAction(CANAIS_FULFILLED);
export const canaisRejected = createAction(CANAIS_REJECTED);
