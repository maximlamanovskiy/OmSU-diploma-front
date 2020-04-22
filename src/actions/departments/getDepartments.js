import {
  GET_DEPARTMENTS_FETCH,
  GET_DEPARTMENTS_REQUEST,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_FAIL,
} from './actionTypes';

export const getDepartmentsFetch = () => ({
  type: GET_DEPARTMENTS_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/chairs`,
});

export const getDepartmentsRequest = () => ({
  type: GET_DEPARTMENTS_REQUEST,
});

export const getDepartmentsSuccess = response => ({
  type: GET_DEPARTMENTS_SUCCESS,
  departments: response.departments,
});

export const getDepartmentsFail = error => ({
  type: GET_DEPARTMENTS_FAIL,
  error,
});
