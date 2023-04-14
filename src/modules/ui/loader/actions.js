import { createAction } from 'redux-actions';
import { SHOW_LOADER, HIDE_LOADER } from './constants';

export const showLoader = createAction(SHOW_LOADER);
export const hideLoader = createAction(HIDE_LOADER);
