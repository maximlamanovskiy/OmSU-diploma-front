import {
  EDIT_SCHEDULE_ITEM_FETCH,
  EDIT_SCHEDULE_ITEM_REQUEST,
  EDIT_SCHEDULE_ITEM_SUCCESS,
  EDIT_SCHEDULE_ITEM_FAIL,
} from './actionTypes';

export const editScheduleItemFetch = (id, scheduleItem) => ({
  type: EDIT_SCHEDULE_ITEM_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/schedules/items/${id}`,
  id,
  scheduleItem,
});

export const editScheduleItemRequest = () => ({
  type: EDIT_SCHEDULE_ITEM_REQUEST,
});

export const editScheduleItemSuccess = (id, scheduleItem) => ({
  type: EDIT_SCHEDULE_ITEM_SUCCESS,
  id,
  scheduleItem,
});

export const editScheduleItemFail = error => ({
  type: EDIT_SCHEDULE_ITEM_FAIL,
  error,
});
