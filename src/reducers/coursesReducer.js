import * as types from 'src/actions/courses/actioType';

const initialState = {
  courses: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COURSES_REQUEST: {
      return {
        ...state,
        courses: [],
        isLoading: true,
        error: null,
      };
    }
    case types.GET_COURSES_SUCCESS: {
      return {
        ...state,
        courses: action.courses,
        isLoading: false,
      };
    }
    case types.GET_COURSES_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case types.CLEAR_COURSES: {
      return {
        ...state,
        courses: [],
      };
    }
    default: {
      return state;
    }
  }
};
