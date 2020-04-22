import {
  GET_LESSON_FETCH,
  GET_LESSON_REQUEST,
  GET_LESSON_SUCCESS,
  GET_LESSON_FAIL,
} from './actionTypes';

export const getLessonFetch = id => ({
  type: GET_LESSON_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/lessons/${id}`,
  id,
});

export const getLessonRequest = () => ({
  type: GET_LESSON_REQUEST,
});

export const getLessonSuccess = response => ({
  type: GET_LESSON_SUCCESS,
  lesson: response.lesson,
});

export const getLessonFail = error => ({
  type: GET_LESSON_FAIL,
  error,
});
