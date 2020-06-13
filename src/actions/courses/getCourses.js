import {
  GET_COURSES_FETCH,
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAIL,
} from './actioType';

export const getCoursesFetch = facultyId => ({
  type: GET_COURSES_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/faculties/${facultyId}/courses`,
});

export const getCoursesRequest = () => ({
  type: GET_COURSES_REQUEST,
});

export const getCoursesSuccess = response => ({
  type: GET_COURSES_SUCCESS,
  courses: response.courses,
});

export const getCoursesFail = error => ({
  type: GET_COURSES_FAIL,
  error,
});
