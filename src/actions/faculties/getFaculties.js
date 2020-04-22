import {
  GET_FACULTIES_FETCH,
  GET_FACULTIES_REQUEST,
  GET_FACULTIES_SUCCESS,
  GET_FACULTIES_FAIL,
} from './actionTypes';

export const getFacultiesFetch = () => ({
  type: GET_FACULTIES_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/faculties`,
});

export const getFacultiesRequest = () => ({
  type: GET_FACULTIES_REQUEST,
});

export const getFacultiesSuccess = response => ({
  type: GET_FACULTIES_SUCCESS,
  faculties: response.faculties,
});

export const getFacultiesFail = error => ({
  type: GET_FACULTIES_FAIL,
  error,
});
