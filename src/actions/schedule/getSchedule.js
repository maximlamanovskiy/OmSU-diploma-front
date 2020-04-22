import {
  GET_SCHEDULE_FETCH,
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_FAIL,
} from './actionTypes';

export const getScheduleFetch = filter => ({
  type: GET_SCHEDULE_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/schedule/${filter.type}/${filter.id}?semester=${filter.semester}&studyYear=${filter.year}`,
  filter,
});

export const getScheduleRequest = () => ({
  type: GET_SCHEDULE_REQUEST,
});

export const getScheduleSuccess = response => ({
  type: GET_SCHEDULE_SUCCESS,
  schedule: response.schedule,
});

export const getScheduleFail = error => ({
  type: GET_SCHEDULE_FAIL,
  error,
});
