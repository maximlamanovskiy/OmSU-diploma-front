import { UPDATE_EVENT, CLEAR_EVENT, CHANGE_IS_FREE } from './actionTypes';

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  event,
});

export const clearEvent = () => ({
  type: CLEAR_EVENT,
});

export const changeIsFree = isFree => ({
  type: CHANGE_IS_FREE,
  isFree,
});
