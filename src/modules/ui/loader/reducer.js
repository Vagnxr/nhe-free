import { handleActions } from 'redux-actions';
import { SHOW_LOADER, HIDE_LOADER } from './constants';

const initialState = {
  show: false,
};

export default handleActions(
  {
    [SHOW_LOADER]: state => ({
      ...state,
      show: true,
    }),
    [HIDE_LOADER]: state => ({
      ...state,
      show: false,
    }),
  },
  initialState,
);
