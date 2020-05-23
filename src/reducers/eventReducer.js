import * as types from 'src/actions/event/actionTypes';

const initialState = {
  event: {
    required: false,
    lecturerId: -1,
    timeBlockId: -1,
    dateTo: '',
    dateFrom: '',
    interval: 'NONE',
    comment: '',
  },
  isFree: true,
  hasError: false,
  timeIndex: -1,
  fullEvent: null,
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_EVENT: {
      return {
        ...state,
        event: { ...state.event, ...action.event },
        hasError: true,
      };
    }

    case types.CLEAR_EVENT: {
      return {
        ...state,
        event: {
          required: false,
          lecturerId: -1,
          timeBlockId: -1,
          dateTo: '',
          dateFrom: '',
          interval: 'NONE',
          comment: '',
        },
        hasError: true,
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
        hasError: false,
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
      };
    }

    case types.DELETE_EVENT_REQUEST: {
      return {
        ...state,
        hasError: false,
      };
    }

    case types.DELETE_EVENT_SUCCESS: {
      return {
        ...state,
        timeIndex: -1,
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
        fullEvent: null,
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

    default: {
      return state;
    }
  }
};
