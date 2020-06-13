import * as types from 'src/actions/utility/actionTypes';

const initialState = {
  date: new Date().toISOString().split('T')[0],
  isEventDialogOpen: false,
  isScheduleDialogOpen: false,
  isRescheduleDialogOpen: false,
  isScheduleItemDialogOpen: false,
  isScheduleEditorOpen: false,
  header: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DATE: {
      return {
        ...state,
        date: action.date,
      };
    }
    case types.OPEN_EVENT_DIALOG_WINDOW: {
      return {
        ...state,
        isEventDialogOpen: true,
      };
    }
    case types.OPEN_SCHEDULE_DIALOG_WINDOW: {
      return {
        ...state,
        isScheduleDialogOpen: true,
      };
    }
    case types.OPEN_RESCHEDULE_DIALOG_WINDOW: {
      return {
        ...state,
        isRescheduleDialogOpen: true,
      };
    }
    case types.OPEN_SCHEDULE_ITEM_DIALOG: {
      return {
        ...state,
        isScheduleItemDialogOpen: true,
      };
    }
    case types.CLOSE_DIALOG_WINDOW: {
      return {
        ...state,
        isEventDialogOpen: false,
        isScheduleDialogOpen: false,
        isRescheduleDialogOpen: false,
        isScheduleItemDialogOpen: false,
      };
    }
    case types.SET_SCHEDULE_EDITOR_OPEN: {
      return {
        ...state,
        isScheduleEditorOpen: action.isOpen,
      };
    }
    default: {
      return state;
    }
  }
};
