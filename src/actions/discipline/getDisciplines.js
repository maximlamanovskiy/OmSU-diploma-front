import {
  GET_DISCIPLINES_FETCH,
  GET_DISCIPLINES_REQUEST,
  GET_DISCIPLINES_SUCCESS,
  GET_DISCIPLINES_FAIL,
} from './actionTypes';

export const getDisciplinesFetch = () => ({
  type: GET_DISCIPLINES_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/disciplines`,
});

export const getDisciplinesRequest = () => ({
  type: GET_DISCIPLINES_REQUEST,
});

export const getDisciplinesSuccess = response => ({
  type: GET_DISCIPLINES_SUCCESS,
  disciplines: response.disciplines,
});

export const getDisciplinesFail = error => ({
  type: GET_DISCIPLINES_FAIL,
  error,
});
