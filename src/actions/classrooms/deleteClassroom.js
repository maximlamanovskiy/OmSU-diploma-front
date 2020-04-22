import {
  DELETE_CLASSROOM_FETCH,
  DELETE_CLASSROOM_REQUEST,
  DELETE_CLASSROOM_SUCCESS,
  DELETE_CLASSROOM_FAIL,
} from './actionTypes';

export const deleteClassroomFetch = id => ({
  type: DELETE_CLASSROOM_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/classrooms/${id}`,
});

export const deleteClassroomRequest = () => ({
  type: DELETE_CLASSROOM_REQUEST,
});

export const deleteClassroomSuccess = () => ({
  type: DELETE_CLASSROOM_SUCCESS,
});

export const deleteClassroomFail = error => ({
  type: DELETE_CLASSROOM_FAIL,
  error,
});
