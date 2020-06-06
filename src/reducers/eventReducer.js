import * as types from 'src/actions/event/actionTypes';
import { intervalsValue } from 'src/utils/date';

const defaultEvent = {
  required: false,
  lecturerId: -1,
  timeBlockId: -1,
  dateTo: '',
  dateFrom: '',
  interval: intervalsValue[0],
  comment: '',
  timeIndex: -1,
};

const emptyFullEvent = {
  comment: '',
  lecturer: {
    lastName: '',
    firstName: '',
    patronymic: '',
  },
  periods: [],
  dates: [],
};

const initialState = {
  isFree: true,
  isLoading: false,
  timeIndex: -1,
  event: { ...defaultEvent },
  fullEvent: { ...emptyFullEvent },
  error: null,
  selectedEvent: -1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_EVENT: {
      return {
        ...state,
        event: { ...state.event, ...action.event },
      };
    }

    case types.CLEAR_EVENT: {
      return {
        ...state,
        event: {
          ...defaultEvent,
        },
        isFree: true,
      };
    }

    case types.CHANGE_IS_FREE: {
      return {
        ...state,
        isFree: action.isFree,
      };
    }

    case types.CREATE_EVENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case types.CREATE_EVENT_SUCCESS: {
      return {
        ...state,
        event: {
          ...state.event,
          id: action.event.id,
        },
        timeIndex: -1,
        isLoading: false,
      };
    }

    case types.CREATE_EVENT_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }

    case types.DELETE_EVENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case types.DELETE_EVENT_SUCCESS: {
      return {
        ...state,
        timeIndex: -1,
        isLoading: false,
      };
    }

    case types.DELETE_EVENT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    case types.SELECT_TIME: {
      return {
        ...state,
        timeIndex: action.timeIndex,
      };
    }

    case types.GET_EVENT_REQUEST: {
      return {
        ...state,
        fullEvent: emptyFullEvent,
        isLoading: true,
        error: null,
      };
    }

    case types.GET_EVENT_SUCCESS: {
      return {
        ...state,
        fullEvent: action.event,
        isLoading: false,
      };
    }

    case types.GET_EVENT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    case types.GET_PERIODS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case types.GET_PERIODS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        fullEvent: {
          ...state.fullEvent,
          periods: action.periods,
        },
      };
    }

    case types.GET_PERIODS_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    case types.CANCEL_EVENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case types.CANCEL_EVENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        fullEvent: {
          ...state.fullEvent,
          dates: state.fullEvent.dates.filter(date => date !== action.date.period),
        },
      };
    }

    case types.CANCEL_EVENT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    case types.SELECT_EVENT: {
      return {
        ...state,
        selectedEvent: action.eventId,
      };
    }

    default: {
      return state;
    }
  }
};
