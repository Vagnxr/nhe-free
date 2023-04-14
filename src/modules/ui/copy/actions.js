import { createAction } from 'redux-actions';
import { SHOW_COPY, HIDE_COPY } from './constants';

export const showCopy = createAction(SHOW_COPY);
export const hideCopy = createAction(HIDE_COPY);
