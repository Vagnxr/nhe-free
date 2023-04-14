import { handleActions } from 'redux-actions';
import { SHOW_MODAL, HIDE_MODAL } from './constants';

const initialState = {
  show: false,
  message: '',
  details: '',
  title: '',
  alert: false,
  sucesso: false,
};

export default handleActions(
  {
    [SHOW_MODAL]: (state, { payload }) => ({
      ...state,
      show: true,
      ...payload,
    }),
    [HIDE_MODAL]: state => ({
      ...state,
      show: false,
    }),
  },
  initialState,
);
