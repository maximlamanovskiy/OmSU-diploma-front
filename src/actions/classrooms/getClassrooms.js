import {
  GET_CLASSROOMS_FETCH,
  GET_CLASSROOMS_REQUEST,
  GET_CLASSROOMS_SUCCESS,
  GET_CLASSROOMS_FAIL,
} from './actionTypes';

export const getClassroomsFetch = (id, page, count = 25) => ({
  type: GET_CLASSROOMS_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/buildings/${id}/classrooms?page=${page}&size=${count}`,
});

export const getClassroomsRequest = () => ({
  type: GET_CLASSROOMS_REQUEST,
});

export const getClassroomsSuccess = response => ({
  type: GET_CLASSROOMS_SUCCESS,
  classrooms: response.classrooms,
  meta: response.meta,
});

export const getClassroomsFail = error => ({
  type: GET_CLASSROOMS_FAIL,
  error,
});
