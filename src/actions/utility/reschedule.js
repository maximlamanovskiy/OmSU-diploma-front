import { UPDATE_RESCHEDULE, CLEAR_RESCHEDULE } from './actionTypes';

export const updateReschedule = reschedule => ({
  type: UPDATE_RESCHEDULE,
  reschedule,
});

export const clearReschedule = () => ({
  type: CLEAR_RESCHEDULE,
});
