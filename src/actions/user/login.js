import {
  AUTHORIZE_FETCH,
  AUTHORIZE_REQUEST,
  AUTHORIZE_SUCCESS,
  AUTHORIZE_FAIL,
} from './actionTypes';

export const loginFetch = (email, password) => ({
  type: AUTHORIZE_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/signin`,
  body: { email, password },
});

export const loginRequest = request => ({
  type: AUTHORIZE_REQUEST,
  email: request.email,
  password: request.password,
});

export const loginSuccess = () => ({
  type: AUTHORIZE_SUCCESS,
});

export const loginFail = error => ({
  type: AUTHORIZE_FAIL,
  error,
});
