import { UPDATE_SCHEDULE_TYPE } from './actionTypes';

export const updateScheduleType = scheduleType => ({
  type: UPDATE_SCHEDULE_TYPE,
  scheduleType,
});
