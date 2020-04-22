import * as types from 'src/actions/classrooms/actionTypes';
import * as eventTypes from 'src/actions/event/actionTypes';

const initialState = {
  isLoading: false,
  hasNext: false,
  hasPrev: false,
  wasGetRequest: false,
  classrooms: [],
  classroom: {},
  events: [],
  selectedClassroomId: -1,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CLASSROOMS_REQUEST: {
      return {
        ...state,
        classrooms: [],
        isLoading: true,
        hasNext: false,
        hasPrev: false,
        wasGetRequest: false,
        error: null,
        selectedClassroomId: -1,
      };
    }

    case types.GET_CLASSROOMS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        wasGetRequest: true,
        hasNext: !!action.meta.next,
        hasPrev: !!action.meta.prev,
        classrooms: action.classrooms,
        error: null,
      };
    }

    case types.GET_CLASSROOMS_FAIL: {
      return {
        ...state,
        isLoading: false,
        hasNext: false,
        hasPrev: false,
        classrooms: [],
        error: action.error,
      };
    }

    case types.GET_CLASSROOM_FETCH: {
      return {
        ...state,
        selectedClassroomId: action.id,
      };
    }

    case types.GET_CLASSROOM_REQUEST: {
      return {
        ...state,
        isLoading: true,
        classroom: {},
        error: null,
      };
    }

    case types.GET_CLASSROOM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        classroom: action.classroom,
      };
    }

    case types.GET_CLASSROOM_FAIL: {
      return {
        ...state,
        isLoading: false,
        selectedClassroomId: -1,
        error: action.error,
      };
    }

    case types.UPDATE_CLASSROOM_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case types.UPDATE_CLASSROOM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        classroom: { ...action.classroom },
      };
    }

    case types.UPDATE_CLASSROOM_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    case types.DELETE_CLASSROOM_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case types.DELETE_CLASSROOM_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case types.DELETE_CLASSROOM_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    case types.CLEAR_CLASSROOMS: {
      return {
        ...state,
        classrooms: [],
      };
    }

    case types.CLEAR_CLASSROOM: {
      return {
        ...state,
        classroom: {},
        events: [],
      };
    }

    case types.GET_CLASSROOM_WITH_EVENTS_FETCH: {
      return {
        ...state,
        selectedClassroomId: action.id,
      };
    }

    case types.GET_CLASSROOM_WITH_EVENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        classroom: {},
        events: [],
        error: null,
      };
    }

    case types.GET_CLASSROOM_WITH_EVENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        classroom: action.classroom,
        events: action.events,
      };
    }

    case types.GET_CLASSROOM_WITH_EVENTS_FAIL: {
      return {
        ...state,
        isLoading: false,
        selectedClassroomId: -1,
        error: action.error,
      };
    }

    case eventTypes.CREATE_EVENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }

    case eventTypes.CREATE_EVENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        events: [...state.events, action.event],
      };
    }

    case eventTypes.CREATE_EVENT_FAIL: {
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
