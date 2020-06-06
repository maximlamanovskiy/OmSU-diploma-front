import {
  DELETE_EVENT_FETCH,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  CANCEL_EVENT_FETCH,
  CANCEL_EVENT_REQUEST,
  CANCEL_EVENT_SUCCESS,
  CANCEL_EVENT_FAIL,
} from './actionTypes';

export const deleteEventFetch = id => ({
  type: DELETE_EVENT_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/events/${id}`,
  id,
});

export const deleteEventRequest = () => ({
  type: DELETE_EVENT_REQUEST,
});

export const deleteEventSuccess = id => ({
  type: DELETE_EVENT_SUCCESS,
  id,
});

export const deleteEventFail = error => ({
  type: DELETE_EVENT_FAIL,
  error,
});

export const cancelEventFetch = (id, dates) => ({
  type: CANCEL_EVENT_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/events/cancel/${id}`,
  dates,
});

export const cancelEventRequest = () => ({
  type: CANCEL_EVENT_REQUEST,
});

export const cancelEventSuccess = () => ({
  type: CANCEL_EVENT_SUCCESS,
});

export const cancelEventFail = error => ({
  type: CANCEL_EVENT_FAIL,
  error,
});
