import {
  GET_PERIODS_FAIL,
  GET_PERIODS_FETCH,
  GET_PERIODS_REQUEST,
  GET_PERIODS_SUCCESS,
} from './actionTypes';

export const getPeriodsFetch = id => ({
  type: GET_PERIODS_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/events/${id}`,
  id,
});

export const getPeriodsRequest = () => ({
  type: GET_PERIODS_REQUEST,
});

export const getPeriodsSuccess = response => ({
  type: GET_PERIODS_SUCCESS,
  periods: response.periods,
});

export const getPeriodsFail = error => ({
  type: GET_PERIODS_FAIL,
  error,
});
