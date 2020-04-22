import {
  GET_CLASSROOM_FETCH,
  GET_CLASSROOM_REQUEST,
  GET_CLASSROOM_SUCCESS,
  GET_CLASSROOM_FAIL,
} from './actionTypes';

export const getClassroomFetch = id => ({
  type: GET_CLASSROOM_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/classrooms/${id}`,
  id,
});

export const getClassroomRequest = () => ({
  type: GET_CLASSROOM_REQUEST,
});

export const getClassroomSuccess = response => ({
  type: GET_CLASSROOM_SUCCESS,
  classroom: response.classroom,
});

export const getClassroomFail = error => ({
  type: GET_CLASSROOM_FAIL,
  error,
});
