import {
  UPDATE_EVENT_FETCH,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  RESCHEDULE_EVENT_FETCH,
  RESCHEDULE_EVENT_REQUEST,
  RESCHEDULE_EVENT_SUCCESS,
  RESCHEDULE_EVENT_FAIL,
} from './actionTypes';

export const updateEventFetch = (id, body) => ({
  type: UPDATE_EVENT_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/events/${id}`,
  body,
});

export const updateEventRequest = () => ({
  type: UPDATE_EVENT_REQUEST,
});

export const updateEventSuccess = () => ({
  type: UPDATE_EVENT_SUCCESS,
});

export const updateEventFail = error => ({
  type: UPDATE_EVENT_FAIL,
  error,
});

export const rescheduleEventFetch = (id, body) => ({
  type: RESCHEDULE_EVENT_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/events/reschedule/${id}`,
  body,
});

export const rescheduleEventRequest = () => ({
  type: RESCHEDULE_EVENT_REQUEST,
});

export const rescheduleEventSuccess = reschedule => ({
  type: RESCHEDULE_EVENT_SUCCESS,
  reschedule,
});

export const rescheduleEventFail = error => ({
  type: RESCHEDULE_EVENT_FAIL,
  error,
});
