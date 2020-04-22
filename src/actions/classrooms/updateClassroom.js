import {
  UPDATE_CLASSROOM_FETCH,
  UPDATE_CLASSROOM_REQUEST,
  UPDATE_CLASSROOM_SUCCESS,
  UPDATE_CLASSROOM_FAIL,
} from './actionTypes';

export const updateClassroomFetch = (id, classroom) => ({
  type: UPDATE_CLASSROOM_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/classrooms/${id}`,
  classroom,
});

export const updateClassroomRequest = () => ({
  type: UPDATE_CLASSROOM_REQUEST,
});

export const updateClassroomSuccess = response => ({
  type: UPDATE_CLASSROOM_SUCCESS,
  classroom: response.classroom,
});

export const updateClassroomFail = error => ({
  type: UPDATE_CLASSROOM_FAIL,
  error,
});
