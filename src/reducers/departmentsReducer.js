import * as types from 'src/actions/departments/actionTypes';

const initialState = {
  departments: [],
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DEPARTMENTS_REQUEST: {
      return {
        ...state,
        departments: [],
        error: null,
        isLoading: true,
      };
    }

    case types.GET_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        departments: action.departments,
        isLoading: false,
      };
    }

    case types.GET_DEPARTMENTS_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};
