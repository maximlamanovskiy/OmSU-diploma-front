import {
  GET_LECTURERS_FETCH,
  GET_LECTURERS_REQUEST,
  GET_LECTURERS_SUCCESS,
  GET_LECTURERS_FAIL,
} from './actionTypes';

export const getLecturersFetch = () => ({
  type: GET_LECTURERS_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/lecturers`,
});

export const getLecturersRequest = () => ({
  type: GET_LECTURERS_REQUEST,
});

export const getLecturersSuccess = response => ({
  type: GET_LECTURERS_SUCCESS,
  lecturers: response.lecturers,
});

export const getLecturersFail = error => ({
  type: GET_LECTURERS_FAIL,
  error,
});
