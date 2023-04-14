import { createAction } from 'redux-actions';
import { SHOW_MODAL_CONFIRMATION, HIDE_MODAL_CONFIRMATION } from './constants';

export const showModalConfirmation = createAction(SHOW_MODAL_CONFIRMATION);
export const hideModalConfirmation = createAction(HIDE_MODAL_CONFIRMATION);
