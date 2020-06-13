import { SET_SCHEDULE_EDITOR_OPEN } from './actionTypes';

export const setScheduleEditorOpen = isOpen => ({
  type: SET_SCHEDULE_EDITOR_OPEN,
  isOpen,
});
