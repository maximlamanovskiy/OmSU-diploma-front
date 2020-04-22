import {
  DELETE_EVENT_FETCH,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
} from './actionTypes';

export const deleteEventFetch = id => ({
  type: DELETE_EVENT_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/events/${id}`,
});

export const deleteEventRequest = () => ({
  type: DELETE_EVENT_REQUEST,
});

export const deleteEventSuccess = () => ({
  type: DELETE_EVENT_SUCCESS,
});

export const deleteEventFail = error => ({
  type: DELETE_EVENT_FAIL,
  error,
});
