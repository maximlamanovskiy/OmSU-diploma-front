import * as types from 'src/actions/lecturers/actionTypes';

const initialState = {
  lecturers: [],
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LECTURERS_REQUEST: {
      return {
        ...state,
        lecturers: [],
        error: null,
        isLoading: true,
      };
    }

    case types.GET_LECTURERS_SUCCESS: {
      return {
        ...state,
        lecturers: action.lecturers,
        isLoading: false,
      };
    }

    case types.GET_LECTURERS_FAIL: {
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
