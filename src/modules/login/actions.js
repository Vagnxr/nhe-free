import { createAction } from 'redux-actions';
import constants from './constants';

const { LOGIN_REQUEST, LOGIN_FULFILLED, LOGIN_REJECTED, CLEAR_STORE } = constants;

export const loginRequest = createAction(LOGIN_REQUEST);
export const loginFulfilled = createAction(LOGIN_FULFILLED);
export const loginRejected = createAction(LOGIN_REJECTED);
export const clearStore = createAction(CLEAR_STORE);
