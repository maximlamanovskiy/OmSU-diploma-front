import {
  CANCEL_EVENT_FETCH,
  CANCEL_EVENT_REQUEST,
  CANCEL_EVENT_SUCCESS,
  CANCEL_EVENT_FAIL,
} from './actionTypes';

export const cancelEventFetch = (body, date) => ({
  type: CANCEL_EVENT_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/events/cancel`,
  body,
  date,
});

export const cancelEventRequest = () => ({
  type: CANCEL_EVENT_REQUEST,
});

export const cancelEventSuccess = date => ({
  type: CANCEL_EVENT_SUCCESS,
  date,
});

export const cancelEventFail = error => ({
  type: CANCEL_EVENT_FAIL,
  error,
});
