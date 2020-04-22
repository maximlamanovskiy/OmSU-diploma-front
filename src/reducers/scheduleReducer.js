import * as types from 'src/actions/schedule/actionTypes';

const initialState = {
  schedule: null,
  isLoading: false,
  wasGetRequest: false,
  error: null,
  type: '',
  lesson: {
    discipline: '',
    groups: [],
  },
};

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
          discipline: '',
          groups: [],
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

    default: {
      return state;
    }
  }
};
