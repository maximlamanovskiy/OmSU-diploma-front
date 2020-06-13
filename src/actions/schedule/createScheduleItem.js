import {
  CREATE_SCHEDULE_ITEM_FETCH,
  CREATE_SCHEDULE_ITEM_REQUEST,
  CREATE_SCHEDULE_ITEM_SUCCESS,
  CREATE_SCHEDULE_ITEM_FAIL,
} from './actionTypes';

export const createScheduleItemFetch = (scheduleId, scheduleItem) => ({
  type: CREATE_SCHEDULE_ITEM_FETCH,
  url: `${process.env.REACT_APP_API_URLS}/schedules/${scheduleId}/items`,
  scheduleItem,
});

export const createScheduleItemRequest = () => ({
  type: CREATE_SCHEDULE_ITEM_REQUEST,
});

export const createScheduleItemSuccess = response => ({
  type: CREATE_SCHEDULE_ITEM_SUCCESS,
  scheduleItem: response.scheduleItem,
});

export const createScheduleItemFail = error => ({
  type: CREATE_SCHEDULE_ITEM_FAIL,
  error,
});
