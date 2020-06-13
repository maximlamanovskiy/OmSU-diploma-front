import { SELECT_SCHEDULE_ITEM, CLEAR_SCHEDULE_ITEM } from './actionTypes';

export const selectScheduleItem = scheduleItem => ({
  type: SELECT_SCHEDULE_ITEM,
  scheduleItem,
});

export const clearScheduleItem = () => ({
  type: CLEAR_SCHEDULE_ITEM,
});
