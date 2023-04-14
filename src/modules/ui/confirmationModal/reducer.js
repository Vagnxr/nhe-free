import { handleActions } from 'redux-actions';
import { SHOW_MODAL_CONFIRMATION, HIDE_MODAL_CONFIRMATION } from './constants';

const initialState = {
  open: false,
  title: '',
  description: '',
};

export default handleActions(
  {
    [SHOW_MODAL_CONFIRMATION]: (state, { payload }) => ({
      ...state,
      open: true,
      ...payload,
    }),
    [HIDE_MODAL_CONFIRMATION]: state => ({
      ...state,
      open: false,
    }),
  },
  initialState,
);
