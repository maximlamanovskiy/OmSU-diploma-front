import {
  GET_EVENT_FETCH,
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAIL,
} from './actionTypes';

export const getEventFetch = id => ({
  type: GET_EVENT_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/events/${id}`,
  id,
});

export const getEventRequest = () => ({
  type: GET_EVENT_REQUEST,
});

export const getEventSuccess = response => ({
  type: GET_EVENT_SUCCESS,
  event: response.event,
});

export const getEventFail = error => ({
  type: GET_EVENT_FAIL,
  error,
});
