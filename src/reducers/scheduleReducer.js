import * as types from 'src/actions/schedule/actionTypes';

const defaultLessen = {
  discipline: '',
  lecturer: {},
  groups: [],
  eventPeriod: {
    classroom: {},
  },
};

const initialState = {
  schedule: null,
  isLoading: false,
  wasGetRequest: false,
  error: null,
  type: '',
  lesson: {
    ...defaultLessen,
  },
  editingSchedule: null,
  scheduleItem: null,
};

function updateSchedules(schedules, scheduleItem) {
  const result = { ...schedules };
  scheduleItem.groups.forEach(group => result[group.name].schedule.push(scheduleItem));
  return result;
}

function deleteSchedules(schedules, id) {
  const result = { ...schedules };
  const keys = Object.keys(schedules);
  keys.forEach(group => {
    result[group].schedule = result[group].schedule.filter(item => item.id !== id);
  });
  return result;
}

function updateScheduleItem(schedules, id, scheduleItem) {
  return updateSchedules(deleteSchedules(schedules, id), scheduleItem);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SCHEDULE_REQUEST: {
      return {
        ...state,
        schedule: null,
        isLoading: true,
        wasGetRequest: true,
        error: null,
      };
    }
    case types.GET_SCHEDULE_SUCCESS: {
      return {
        ...state,
        schedule: { ...action.schedule },
        isLoading: false,
      };
    }
    case types.GET_SCHEDULE_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case types.CLEAR_SCHEDULE: {
      return {
        ...state,
        schedule: null,
        error: null,
        isLoading: false,
        wasGetRequest: false,
      };
    }
    case types.GET_LESSON_REQUEST: {
      return {
        ...state,
        lesson: {
          ...defaultLessen,
        },
        error: null,
        isLoading: true,
      };
    }
    case types.GET_LESSON_SUCCESS: {
      return {
        ...state,
        lesson: { ...action.lesson },
        isLoading: false,
      };
    }
    case types.GET_LESSON_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case types.UPDATE_SCHEDULE_TYPE: {
      return {
        ...state,
        type: action.scheduleType,
      };
    }
    case types.EDIT_SCHEDULE_REQUEST: {
      return {
        ...state,
        editingSchedule: null,
        isLoading: true,
        error: null,
      };
    }
    case types.EDIT_SCHEDULE_SUCCESS: {
      return {
        ...state,
        editingSchedule: action.schedule,
        isLoading: false,
      };
    }
    case types.EDIT_SCHEDULE_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case types.CREATE_SCHEDULE_ITEM_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.CREATE_SCHEDULE_ITEM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        editingSchedule: {
          ...state.editingSchedule,
          schedules: updateSchedules(state.editingSchedule.schedules, action.scheduleItem),
        },
      };
    }
    case types.CREATE_SCHEDULE_ITEM_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case types.EDIT_SCHEDULE_ITEM_REQUEST: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }
    case types.EDIT_SCHEDULE_ITEM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        editingSchedule: {
          ...state.editingSchedule,
          schedules: updateScheduleItem(
            state.editingSchedule.schedules,
            action.id,
            action.scheduleItem
          ),
        },
      };
    }
    case types.EDIT_SCHEDULE_ITEM_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case types.DELETE_SCHEDULE_ITEM_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.DELETE_SCHEDULE_ITEM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        editingSchedule: {
          ...state.editingSchedule,
          schedules: deleteSchedules(state.editingSchedule.schedules, action.id),
        },
      };
    }
    case types.DELETE_SCHEDULE_ITEM_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case types.SELECT_SCHEDULE_ITEM: {
      return {
        ...state,
        scheduleItem: action.scheduleItem,
      };
    }
    case types.CLEAR_SCHEDULE_ITEM: {
      return {
        ...state,
        scheduleItem: null,
      };
    }
    default: {
      return state;
    }
  }
};
