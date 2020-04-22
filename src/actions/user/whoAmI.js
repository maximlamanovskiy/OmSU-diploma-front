import {
  CHECK_AUTH_FETCH,
  CHECK_USER_FETCH,
  WHO_AM_I_REQUEST,
  WHO_AM_I_SUCCESS,
  WHO_AM_I_FAIL,
} from './actionTypes';

export const checkAuthFetch = () => ({
  type: CHECK_AUTH_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/whoiam`,
});

export const checkUserFetch = () => ({
  type: CHECK_USER_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/whoiam`,
});

export const whoAmIRequest = () => ({
  type: WHO_AM_I_REQUEST,
});

export const whoAmISuccess = () => ({
  type: WHO_AM_I_SUCCESS,
});

export const whoAmIFail = error => ({
  type: WHO_AM_I_FAIL,
  error,
});
