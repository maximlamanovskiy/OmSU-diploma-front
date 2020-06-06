import {
  GET_CLASSROOM_WITH_EVENTS_FETCH,
  GET_CLASSROOM_WITH_EVENTS_REQUEST,
  GET_CLASSROOM_WITH_EVENTS_SUCCESS,
  GET_CLASSROOM_WITH_EVENTS_FAIL,
  GET_CLASSROOM_FOR_RESCHEDULE_FETCH,
  GET_CLASSROOM_FOR_RESCHEDULE_REQUEST,
  GET_CLASSROOM_FOR_RESCHEDULE_SUCCESS,
  GET_CLASSROOM_FOR_RESCHEDULE_FAIL,
  GET_CLASSROOM_FOR_CLASSROOMS_FETCH,
  GET_CLASSROOM_FOR_CLASSROOMS_REQUEST,
  GET_CLASSROOM_FOR_CLASSROOMS_SUCCESS,
  GET_CLASSROOM_FOR_CLASSROOMS_FAIL,
} from './actionTypes';

export const getClassroomWithEventsFetch = (id, dateFrom, dateTo, date) => ({
  type: GET_CLASSROOM_WITH_EVENTS_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/classrooms/${id}/events-by-date?dateFrom=${dateFrom}&dateTo=${dateTo}`,
  id,
  dateFrom,
  dateTo,
  date,
});

export const getClassroomWithEventsRequest = () => ({
  type: GET_CLASSROOM_WITH_EVENTS_REQUEST,
});

export const getClassroomWithEventsSuccess = response => ({
  type: GET_CLASSROOM_WITH_EVENTS_SUCCESS,
  classroom: response.classroom,
  events: response.events,
});

export const getClassroomWithEventsFail = error => ({
  type: GET_CLASSROOM_WITH_EVENTS_FAIL,
  error,
});

export const getClassroomForRescheduleFetch = (id, date) => ({
  type: GET_CLASSROOM_FOR_RESCHEDULE_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/classrooms/${id}/events-by-date?dateFrom=${date}&dateTo=${date}`,
  id,
  date,
});

export const getClassroomForRescheduleRequest = () => ({
  type: GET_CLASSROOM_FOR_RESCHEDULE_REQUEST,
});

export const getClassroomForRescheduleSuccess = response => ({
  type: GET_CLASSROOM_FOR_RESCHEDULE_SUCCESS,
  events: response.events,
});

export const getClassroomForRescheduleFail = error => ({
  type: GET_CLASSROOM_FOR_RESCHEDULE_FAIL,
  error,
});

export const getClassroomForClassroomsFetch = (id, date) => ({
  type: GET_CLASSROOM_FOR_CLASSROOMS_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/classrooms/${id}/events-by-date?dateFrom=${date}&dateTo=${date}`,
  id,
  date,
});

export const getClassroomForClassroomsRequest = () => ({
  type: GET_CLASSROOM_FOR_CLASSROOMS_REQUEST,
});

export const getClassroomForClassroomsSuccess = response => ({
  type: GET_CLASSROOM_FOR_CLASSROOMS_SUCCESS,
  events: response.events,
});

export const getClassroomForClassroomsFail = error => ({
  type: GET_CLASSROOM_FOR_CLASSROOMS_FAIL,
  error,
});
