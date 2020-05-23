import {
  GET_CLASSROOM_WITH_EVENTS_FETCH,
  GET_CLASSROOM_WITH_EVENTS_REQUEST,
  GET_CLASSROOM_WITH_EVENTS_SUCCESS,
  GET_CLASSROOM_WITH_EVENTS_FAIL,
} from './actionTypes';

export const getClassroomWithEventsFetch = (id, date) => ({
  type: GET_CLASSROOM_WITH_EVENTS_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/classrooms/${id}/events?date=${date}`,
  id,
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
