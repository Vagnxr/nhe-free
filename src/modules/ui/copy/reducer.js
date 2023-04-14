import { handleActions } from 'redux-actions';
import { SHOW_COPY, HIDE_COPY } from './constants';

const initialState = {
  show: false,
  message: '',
  pdvs: '',
};

export default handleActions(
  {
    [SHOW_COPY]: (state, { payload }) => ({
      ...state,
      show: true,
      ...payload,
    }),
    [HIDE_COPY]: state => ({
      ...state,
      show: false,
    }),
  },
  initialState,
);
