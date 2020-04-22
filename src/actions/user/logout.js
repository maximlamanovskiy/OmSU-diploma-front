import { LOGOUT_FETCH, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL } from './actionTypes';

export const logoutFetch = () => ({
  type: LOGOUT_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/signout`,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFail = error => ({
  type: LOGOUT_FAIL,
  error,
});
