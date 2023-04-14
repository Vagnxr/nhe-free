import axios, { CancelToken } from 'axios';
import { CANCEL } from 'redux-saga';
import { store } from 'store';

export const TOKEN_TYPE = 'Token';

const axiosErrorsInterceptor = (req = {}) => {
  if (!req.response) {
    return Promise.reject(new Error({ ...req, response: {} }));
  }
  return Promise.reject(req);
};

const request = params => {
  const { login } = store.getState();
  const source = CancelToken.source();
  axios.interceptors.response.use(response => response, axiosErrorsInterceptor);
  const axiosWithCancel = axios({
    ...params,
    headers: {
      Authorization: login && login.token && `${TOKEN_TYPE} ${login.token}`,
    },
    cancelToken: source.token,
  });
  axiosWithCancel[CANCEL] = () => source.cancel();
  return axiosWithCancel;
};

export default ({ baseURL }) => ({
  get: props =>
    request({
      baseURL,
      ...props,
      method: 'GET',
    }),
  post: props =>
    request({
      baseURL,
      ...props,
      method: 'POST',
    }),
  put: props =>
    request({
      baseURL,
      ...props,
      method: 'PUT',
    }),
  patch: props =>
    request({
      baseURL,
      ...props,
      method: 'PATCH',
    }),
  delete: props =>
    request({
      baseURL,
      ...props,
      method: 'DELETE',
    }),
});
