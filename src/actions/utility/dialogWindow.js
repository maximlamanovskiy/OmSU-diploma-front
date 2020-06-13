import {
  OPEN_EVENT_DIALOG_WINDOW,
  OPEN_SCHEDULE_DIALOG_WINDOW,
  OPEN_RESCHEDULE_DIALOG_WINDOW,
  OPEN_SCHEDULE_ITEM_DIALOG,
  CLOSE_DIALOG_WINDOW,
} from './actionTypes';

export const openEventDialogWindow = () => ({
  type: OPEN_EVENT_DIALOG_WINDOW,
});

export const openScheduleDialogWindow = () => ({
  type: OPEN_SCHEDULE_DIALOG_WINDOW,
});

export const openRescheduleDialogWindow = () => ({
  type: OPEN_RESCHEDULE_DIALOG_WINDOW,
});

export const openScheduleItemDialogWindow = () => ({
  type: OPEN_SCHEDULE_ITEM_DIALOG,
});

export const closeDialogWindow = () => ({
  type: CLOSE_DIALOG_WINDOW,
});
