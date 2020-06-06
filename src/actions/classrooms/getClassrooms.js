import {
  GET_CLASSROOMS_FETCH,
  GET_CLASSROOMS_REQUEST,
  GET_CLASSROOMS_SUCCESS,
  GET_CLASSROOMS_FAIL,
  GET_CLASSROOMS_FOR_RESCHEDULE_FETCH,
  GET_CLASSROOMS_FOR_RESCHEDULE_REQUEST,
  GET_CLASSROOMS_FOR_RESCHEDULE_SUCCESS,
  GET_CLASSROOMS_FOR_RESCHEDULE_FAIL,
} from './actionTypes';

export const getClassroomsFetch = (id, page, count = 16) => ({
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

export const getClassroomsForRescheduleFetch = (id, page, count = 1000) => ({
  type: GET_CLASSROOMS_FOR_RESCHEDULE_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/buildings/${id}/classrooms?page=${page}&size=${count}`,
});

export const getClassroomsForRescheduleRequest = () => ({
  type: GET_CLASSROOMS_FOR_RESCHEDULE_REQUEST,
});

export const getClassroomsForRescheduleSuccess = response => ({
  type: GET_CLASSROOMS_FOR_RESCHEDULE_SUCCESS,
  classrooms: response.classrooms,
});

export const getClassroomsForRescheduleFail = error => ({
  type: GET_CLASSROOMS_FOR_RESCHEDULE_FAIL,
  error,
});
