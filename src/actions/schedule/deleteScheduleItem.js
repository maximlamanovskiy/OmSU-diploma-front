import {
  DELETE_SCHEDULE_ITEM_FETCH,
  DELETE_SCHEDULE_ITEM_REQUEST,
  DELETE_SCHEDULE_ITEM_SUCCESS,
  DELETE_SCHEDULE_ITEM_FAIL,
} from './actionTypes';

export const deleteScheduleItemFetch = id => ({
  type: DELETE_SCHEDULE_ITEM_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/schedules/items/${id}`,
  id,
});

export const deleteScheduleItemsRequest = () => ({
  type: DELETE_SCHEDULE_ITEM_REQUEST,
});

export const deleteScheduleItemsSuccess = id => ({
  type: DELETE_SCHEDULE_ITEM_SUCCESS,
  id,
});

export const deleteScheduleItemsFail = error => ({
  type: DELETE_SCHEDULE_ITEM_FAIL,
  error,
});
