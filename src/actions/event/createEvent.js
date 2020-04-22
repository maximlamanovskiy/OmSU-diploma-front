import {
  CREATE_EVENT_FETCH,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
} from './actionTypes';

export const createEventFetch = event => ({
  type: CREATE_EVENT_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/events`,
  event,
});

export const createEventRequest = () => ({
  type: CREATE_EVENT_REQUEST,
});

export const createEventSuccess = response => ({
  type: CREATE_EVENT_SUCCESS,
  event: response.event,
});

export const createEventFail = error => ({
  type: CREATE_EVENT_FAIL,
  error,
});
