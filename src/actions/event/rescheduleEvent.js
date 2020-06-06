import {
  RESCHEDULE_EVENT_FETCH,
  RESCHEDULE_EVENT_REQUEST,
  RESCHEDULE_EVENT_SUCCESS,
  RESCHEDULE_EVENT_FAIL,
} from './actionTypes';

export const rescheduleEventFetch = body => ({
  type: RESCHEDULE_EVENT_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/events/reschedule`,
  body,
});

export const rescheduleEventRequest = () => ({
  type: RESCHEDULE_EVENT_REQUEST,
});

export const rescheduleEventSuccess = () => ({
  type: RESCHEDULE_EVENT_SUCCESS,
});

export const rescheduleEventFail = error => ({
  type: RESCHEDULE_EVENT_FAIL,
  error,
});
