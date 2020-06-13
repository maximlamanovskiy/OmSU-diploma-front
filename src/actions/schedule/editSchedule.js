import {
  EDIT_SCHEDULE_FETCH,
  EDIT_SCHEDULE_REQUEST,
  EDIT_SCHEDULE_SUCCESS,
  EDIT_SCHEDULE_FAIL,
} from './actionTypes';

export const editScheduleFetch = (courseId, semester, year) => ({
  type: EDIT_SCHEDULE_FETCH,
  urlGet: `${process.env.REACT_APP_API_URLS}/schedules/courses/${courseId}`,
  urlPost: `${process.env.REACT_APP_API_URLS}/schedules`,
  courseId,
  semester,
  year,
});

export const editScheduleRequest = () => ({
  type: EDIT_SCHEDULE_REQUEST,
});

export const editScheduleSuccess = schedule => ({
  type: EDIT_SCHEDULE_SUCCESS,
  schedule,
});

export const editScheduleFail = error => ({
  type: EDIT_SCHEDULE_FAIL,
  error,
});
