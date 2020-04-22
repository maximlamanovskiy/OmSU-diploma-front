import { REGISTER_FETCH, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from './actionTypes';

export const registerFetch = (email, password) => ({
  type: REGISTER_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/register`,
  body: { email, password },
});

export const registerRequest = body => ({
  type: REGISTER_REQUEST,
  email: body.email,
  password: body.password,
  studentId: body.studentId,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFail = error => ({
  type: REGISTER_FAIL,
  error,
});
